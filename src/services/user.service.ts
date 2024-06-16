import bcrypt from 'bcrypt'
import { Request } from 'express'
import jwt, { Secret } from 'jsonwebtoken'
import { Op } from 'sequelize'
import { v4 as uuidv4 } from 'uuid'

import { Role } from '~/constants/type'
import { User, UserAttributes } from '~/models/user.model'
import { encrypt } from '~/utils/crypto.util'
import { sendEmail } from '~/utils/sendEmail.util'

async function getAllUsers(req: Request) {
  const { page_index = 1, page_size = 10, keyword } = req.query
  const users: UserAttributes[] = await User.findAll({
    where: {
      ...(keyword && {
        [Op.or]: [{ email: { [Op.like]: `%${keyword}%` } }, { name: { [Op.like]: `%${keyword}%` } }]
      })
    },
    limit: Number(page_size),
    offset: (Number(page_index) - 1) * Number(page_size)
  })
  return users
} // Get all users

async function getUserById(userId: string) {
  const user = await User.findOne({ where: { id: userId } })
  return user
} // Find user by id

async function getUser(fields: { username?: string; email?: string; id?: string }) {
  try {
    const user = await User.findOne({
      where: {
        [Op.or]: [{ id: fields.id || '' }, { username: fields.username || '' }, { email: fields.email || '' }]
      }
    })
    return user
  } catch (err) {
    return null
  }
} // Find user by 'Object user'

async function getUserByUsername(username: string) {
  const user = await User.findOne({ where: { username } })
  return user
} // Find user by username

async function getCurrentUser(req: Request) {
  const token = req.headers['authorization']
  if (!token) {
    throw new Error('No token provided')
  }

  const decodedToken: any = jwt.verify(token, process.env.SECRET as Secret)
  const username = decodedToken.username

  const user = await getUserByUsername(username)
  if (!user) {
    throw new Error('User not found')
  }

  return user
} // Get current user

async function deleteUser(id: string) {
  const result = await User.destroy({
    where: { id }
  })
  return result
} // Delete user

async function sendRegisterEmail(username: string, email: string, password: string | Buffer, callback: () => void) {
  const hashPassword = await bcrypt.hash(password, 10)
  const data = {
    email,
    username,
    password: hashPassword,
    iat: Date.now()
  }
  const encrypted = encrypt(data)

  const confirmLink = `${process.env.SERVER_URL}/users/confirm_register?code=${encrypted}`
  const emailHeader = 'Confirm register account at My Bookstore'
  const emailBody = `
    <div style="max-width: 600px; margin: 20px auto; padding: 20px; border: 2px solid #007bff; border-radius: 8px; background-color: #fff; font-family: 'Arial', sans-serif;">
        <h2 style="color: #007bff;">My Bookstore App</h2>
        <p style="margin-bottom: 20px;">Click the link below to register your account at My Bookstore:</p>
    <a href="${confirmLink}" style="display: inline-block; padding: 10px 20px; text-decoration: none; background-color: #007bff; color: #fff; border-radius: 5px;" target="_blank">Link active your account</a>
    </div>
    `

  sendEmail(data.email, emailHeader, emailBody, callback)
} // Send mail confirm user

async function register(data: {
  username: string
  password: string
  name: string
  phone: string
  email: string
  role: Role
}) {
  const findUser = await getUserByUsername(data.username)
  if (!findUser) {
    const user = await User.create({
      id: uuidv4(),
      email: data.email,
      username: data.username,
      password: data.password,
      name: data.name,
      phone: data.phone,
      role: data.role
    })
    return user
  } else {
    return null
  }
} // Register user - Create user
// Comment

export default {
  getAllUsers,
  getUserById,
  getUser,
  deleteUser,
  sendRegisterEmail,
  getCurrentUser,
  register
}

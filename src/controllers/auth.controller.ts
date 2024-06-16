import bcrypt from 'bcrypt'
import { Request, Response } from 'express'
import jwt, { Secret, sign, VerifyErrors } from 'jsonwebtoken'

import responseStatus from '~/constants/responseStatus'
import UserService from '~/services/user.service'

import { UserAttributes } from '../models/user.model'
import { Account, ApiLoginResponse } from './../constants/type'

const expiresIn = '1h'
let refreshTokens: string[] = []

const register = async (req: Request, res: Response) => {
  try {
    const { email, username, password, firstName, lastName, phone, role } = req.body
    if (!email || !username || !password || !firstName || !lastName || !phone || !role) {
      return res.json(responseStatus.MissingFieldResponse('Missing required fields'))
    }

    const salt = await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash(password, salt)
    const newUser: UserAttributes = {
      id: '',
      username,
      password: hashed,
      firstName,
      lastName,
      phone,
      email,
      role
    }

    const users = await UserService.register(newUser)
    const registerResponse = {
      account: users
    }
    res.json(responseStatus.DataResponse('', registerResponse))
  } catch (error) {
    console.log(error)
    res.json(responseStatus.InternalErrorResponse())
  }
}

// Generate access token
const generateAccessToken = (user: Account) => {
  return sign(
    {
      username: user.username,
      role: user.role
    },
    process.env.SECRET as string,
    {
      expiresIn: expiresIn
    }
  )
}

// Generate refresh token
const generateRefreshToken = (user: Account) => {
  return sign(
    {
      username: user.username,
      role: user.role
    },
    process.env.SECRET as Secret,
    {
      expiresIn: '30d'
    }
  )
}

const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body
    if (!username || !password) {
      return res.json(responseStatus.MissingFieldResponse('Missing required fields'))
    }

    const user = await UserService.getUser(req.body)
    if (!user) {
      return res.json(
        responseStatus.NotFoundResponse('Authentication failed. Please check your credentials and try again.')
      )
    }

    const validPassword = await bcrypt.compare(password, user?.password)
    if (!validPassword) {
      return res.json(
        responseStatus.NotFoundResponse('Authentication failed. Please check your credentials and try again.')
      )
    }

    if (user && validPassword) {
      const accessToken = generateAccessToken(user)
      const refreshToken = generateRefreshToken(user)
      refreshTokens.push(refreshToken)
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: false,
        path: '/',
        sameSite: 'strict'
      })
      const response: ApiLoginResponse = {
        token: accessToken,
        refreshToken: refreshToken,
        expiresAt: new Date(new Date().setHours(new Date().getHours() + parseInt(expiresIn.substring(0, 1)))),
        account: {
          id: user.id,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
          role: user.role
        } as Account
      }
      res.json(responseStatus.DataResponse('Login successfully!', response))
    }
  } catch (error) {
    console.log(error)
    res.json(responseStatus.InternalErrorResponse())
  }
}

const getRefreshToken = async (req: Request, res: Response) => {
  const refreshToken = req.body.refreshToken
  if (!refreshToken) return res.json(responseStatus.ErrorResponse(401, 'Authentication'))
  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).send({ message: 'Invalid refresh token' })
  }
  jwt.verify(refreshToken, process.env.SECRET as Secret, (err: VerifyErrors | null, user: any) => {
    if (err) {
      return res.status(401).send({ message: 'Invalid token' })
    }
    refreshTokens.filter((token) => token !== refreshToken)
    const newAccessToken = generateAccessToken(user)
    const newRefreshToken = generateRefreshToken(user)
    refreshTokens.push(newRefreshToken)
    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: false,
      path: '/',
      sameSite: 'strict'
    })

    return res.json(
      responseStatus.DataResponse('', {
        token: newAccessToken,
        expiresAt: new Date(new Date().setHours(new Date().getHours() + parseInt(expiresIn.substring(0, 1))))
      })
    )
  })
}

const logout = async (req: Request, res: Response) => {
  res.clearCookie('refreshToken')
  refreshTokens = refreshTokens.filter((token) => token !== req.cookies.refreshToken)
  return res.json(responseStatus.DataResponse('Logged out!', ''))
}

export default {
  register,
  login,
  getRefreshToken,
  logout
}

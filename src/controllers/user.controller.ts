import { Request, Response } from 'express'

import responseStatus from '~/constants/responseStatus'
import UserService from '~/services/user.service'

async function getUsers(req: Request, res: Response) {
  try {
    const users = await UserService.getAllUsers(req)
    res.json(responseStatus.DataResponse('Get users list successfully!', users))
  } catch (error) {
    console.log(error)
    res.json(responseStatus.InternalErrorResponse())
  }
} // Get all users

async function getUserByUsername(req: Request, res: Response) {
  try {
    const username = req.params.username
    const user = await UserService.getUserByUsername(username)
    res.json(responseStatus.DataResponse('Get user by username successfully!', user))
  } catch (error) {
    console.log(error)
    res.json(responseStatus.InternalErrorResponse())
  }
} // Get user by username

export default {
  getUsers,
  getUserByUsername
}

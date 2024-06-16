import { Pagination } from './type'

const Response = (statusCode: number, message: string, data: any) => {
  return { statusCode, message, data }
}

const MessageResponse = (message: string) => {
  return Response(200, message, '')
}

function DataResponse(message: string, data: any, pagination?: Pagination) {
  return {
    statusCode: 200,
    message,
    data: data,
    pagination: pagination
  }
}

const CreateSuccessResponse = (message = 'Ok', data: any) => {
  return Response(201, message, data)
}

const MissingFieldResponse = (message = 'Missing field') => {
  return ErrorResponse(400, message)
}

const UnauthorizedResponse = (message = 'Unauthorized') => {
  return ErrorResponse(401, message)
}

const NotFoundResponse = (message = 'Not found') => {
  return ErrorResponse(404, message)
}

const InternalErrorResponse = (message = 'Internal server error') => {
  return Response(500, message, '')
}

const ErrorResponse = (errorCode: number, errorMessage: string) => {
  return Response(errorCode, errorMessage, '')
}

export default {
  MessageResponse,
  DataResponse,
  CreateSuccessResponse,
  MissingFieldResponse,
  UnauthorizedResponse,
  NotFoundResponse,
  InternalErrorResponse,
  ErrorResponse
}

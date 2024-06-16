"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Response = (statusCode, message, data) => {
    return { statusCode, message, data };
};
const MessageResponse = (message) => {
    return Response(200, message, '');
};
function DataResponse(message, data, pagination) {
    return {
        statusCode: 200,
        message,
        data: data,
        pagination: pagination
    };
}
const CreateSuccessResponse = (message = 'Ok', data) => {
    return Response(201, message, data);
};
const MissingFieldResponse = (message = 'Missing field') => {
    return ErrorResponse(400, message);
};
const UnauthorizedResponse = (message = 'Unauthorized') => {
    return ErrorResponse(401, message);
};
const NotFoundResponse = (message = 'Not found') => {
    return ErrorResponse(404, message);
};
const InternalErrorResponse = (message = 'Internal server error') => {
    return Response(500, message, '');
};
const ErrorResponse = (errorCode, errorMessage) => {
    return Response(errorCode, errorMessage, '');
};
exports.default = {
    MessageResponse,
    DataResponse,
    CreateSuccessResponse,
    MissingFieldResponse,
    UnauthorizedResponse,
    NotFoundResponse,
    InternalErrorResponse,
    ErrorResponse
};

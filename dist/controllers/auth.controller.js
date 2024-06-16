"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const responseStatus_1 = __importDefault(require("../constants/responseStatus"));
const user_service_1 = __importDefault(require("../services/user.service"));
const expiresIn = '1h';
let refreshTokens = [];
const register = async (req, res) => {
    try {
        const { email, username, password, firstName, lastName, phone, role } = req.body;
        if (!email || !username || !password || !firstName || !lastName || !phone || !role) {
            return res.json(responseStatus_1.default.MissingFieldResponse('Missing required fields'));
        }
        const salt = await bcrypt_1.default.genSalt(10);
        const hashed = await bcrypt_1.default.hash(password, salt);
        const newUser = {
            id: '',
            username,
            password: hashed,
            firstName,
            lastName,
            phone,
            email,
            role
        };
        const users = await user_service_1.default.register(newUser);
        const registerResponse = {
            account: users
        };
        res.json(responseStatus_1.default.DataResponse('', registerResponse));
    }
    catch (error) {
        console.log(error);
        res.json(responseStatus_1.default.InternalErrorResponse());
    }
};
// Generate access token
const generateAccessToken = (user) => {
    return (0, jsonwebtoken_1.sign)({
        username: user.username,
        role: user.role
    }, process.env.SECRET, {
        expiresIn: expiresIn
    });
};
// Generate refresh token
const generateRefreshToken = (user) => {
    return (0, jsonwebtoken_1.sign)({
        username: user.username,
        role: user.role
    }, process.env.SECRET, {
        expiresIn: '30d'
    });
};
const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.json(responseStatus_1.default.MissingFieldResponse('Missing required fields'));
        }
        const user = await user_service_1.default.getUser(req.body);
        if (!user) {
            return res.json(responseStatus_1.default.NotFoundResponse('Authentication failed. Please check your credentials and try again.'));
        }
        const validPassword = await bcrypt_1.default.compare(password, user?.password);
        if (!validPassword) {
            return res.json(responseStatus_1.default.NotFoundResponse('Authentication failed. Please check your credentials and try again.'));
        }
        if (user && validPassword) {
            const accessToken = generateAccessToken(user);
            const refreshToken = generateRefreshToken(user);
            refreshTokens.push(refreshToken);
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: false,
                path: '/',
                sameSite: 'strict'
            });
            const response = {
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
                }
            };
            res.json(responseStatus_1.default.DataResponse('Login successfully!', response));
        }
    }
    catch (error) {
        console.log(error);
        res.json(responseStatus_1.default.InternalErrorResponse());
    }
};
const getRefreshToken = async (req, res) => {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken)
        return res.json(responseStatus_1.default.ErrorResponse(401, 'Authentication'));
    if (!refreshTokens.includes(refreshToken)) {
        return res.status(403).send({ message: 'Invalid refresh token' });
    }
    jsonwebtoken_1.default.verify(refreshToken, process.env.SECRET, (err, user) => {
        if (err) {
            return res.status(401).send({ message: 'Invalid token' });
        }
        refreshTokens.filter((token) => token !== refreshToken);
        const newAccessToken = generateAccessToken(user);
        const newRefreshToken = generateRefreshToken(user);
        refreshTokens.push(newRefreshToken);
        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: false,
            path: '/',
            sameSite: 'strict'
        });
        return res.json(responseStatus_1.default.DataResponse('', {
            token: newAccessToken,
            expiresAt: new Date(new Date().setHours(new Date().getHours() + parseInt(expiresIn.substring(0, 1))))
        }));
    });
};
const logout = async (req, res) => {
    res.clearCookie('refreshToken');
    refreshTokens = refreshTokens.filter((token) => token !== req.cookies.refreshToken);
    return res.json(responseStatus_1.default.DataResponse('Logged out!', ''));
};
exports.default = {
    register,
    login,
    getRefreshToken,
    logout
};

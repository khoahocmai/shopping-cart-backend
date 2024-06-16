"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sequelize_1 = require("sequelize");
const uuid_1 = require("uuid");
const user_model_1 = require("../models/user.model");
const crypto_util_1 = require("../utils/crypto.util");
const sendEmail_util_1 = require("../utils/sendEmail.util");
async function getAllUsers(req) {
    const { page_index = 1, page_size = 10, keyword } = req.query;
    const users = await user_model_1.User.findAll({
        where: {
            ...(keyword && {
                [sequelize_1.Op.or]: [{ email: { [sequelize_1.Op.like]: `%${keyword}%` } }, { name: { [sequelize_1.Op.like]: `%${keyword}%` } }]
            })
        },
        limit: Number(page_size),
        offset: (Number(page_index) - 1) * Number(page_size)
    });
    return users;
} // Get all users
async function getUserById(userId) {
    const user = await user_model_1.User.findOne({ where: { id: userId } });
    return user;
} // Find user by id
async function getUser(fields) {
    try {
        const user = await user_model_1.User.findOne({
            where: {
                [sequelize_1.Op.or]: [{ id: fields.id || '' }, { username: fields.username || '' }, { email: fields.email || '' }]
            }
        });
        return user;
    }
    catch (err) {
        return null;
    }
} // Find user by 'Object user'
async function getUserByUsername(username) {
    const user = await user_model_1.User.findOne({ where: { username } });
    return user;
} // Find user by username
async function getCurrentUser(req) {
    const token = req.headers['authorization'];
    if (!token) {
        throw new Error('No token provided');
    }
    const decodedToken = jsonwebtoken_1.default.verify(token, process.env.SECRET);
    const username = decodedToken.username;
    const user = await getUserByUsername(username);
    if (!user) {
        throw new Error('User not found');
    }
    return user;
} // Get current user
async function deleteUser(id) {
    const result = await user_model_1.User.destroy({
        where: { id }
    });
    return result;
} // Delete user
async function sendRegisterEmail(username, email, password, callback) {
    const hashPassword = await bcrypt_1.default.hash(password, 10);
    const data = {
        email,
        username,
        password: hashPassword,
        iat: Date.now()
    };
    const encrypted = (0, crypto_util_1.encrypt)(data);
    const confirmLink = `${process.env.SERVER_URL}/users/confirm_register?code=${encrypted}`;
    const emailHeader = 'Confirm register account at My Bookstore';
    const emailBody = `
    <div style="max-width: 600px; margin: 20px auto; padding: 20px; border: 2px solid #007bff; border-radius: 8px; background-color: #fff; font-family: 'Arial', sans-serif;">
        <h2 style="color: #007bff;">My Bookstore App</h2>
        <p style="margin-bottom: 20px;">Click the link below to register your account at My Bookstore:</p>
    <a href="${confirmLink}" style="display: inline-block; padding: 10px 20px; text-decoration: none; background-color: #007bff; color: #fff; border-radius: 5px;" target="_blank">Link active your account</a>
    </div>
    `;
    (0, sendEmail_util_1.sendEmail)(data.email, emailHeader, emailBody, callback);
} // Send mail confirm user
async function register(data) {
    const findUser = await getUserByUsername(data.username);
    if (!findUser) {
        const user = await user_model_1.User.create({
            id: (0, uuid_1.v4)(),
            email: data.email,
            username: data.username,
            password: data.password,
            name: data.name,
            phone: data.phone,
            role: data.role
        });
        return user;
    }
    else {
        return null;
    }
} // Register user - Create user
// Comment
exports.default = {
    getAllUsers,
    getUserById,
    getUser,
    deleteUser,
    sendRegisterEmail,
    getCurrentUser,
    register
};

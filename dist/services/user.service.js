"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
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
    const user = await user_model_1.User.create({
        id: (0, uuid_1.v4)(),
        email: data.email,
        username: data.username,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        role: data.role
    });
    return user;
} // Register user - Create user
exports.default = {
    getAllUsers,
    getUserById,
    getUser,
    deleteUser,
    sendRegisterEmail,
    register
};

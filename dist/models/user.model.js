"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const SQLModel_1 = __importDefault(require("../constants/SQLModel"));
const UUIDModel_1 = __importDefault(require("../constants/UUIDModel"));
const database_1 = __importDefault(require("../databases/database"));
const tableName = 'user';
exports.User = database_1.default.define(tableName, {
    ...UUIDModel_1.default,
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    role: {
        type: sequelize_1.DataTypes.ENUM('admin', 'customer'),
        defaultValue: 'customer'
    },
    ...SQLModel_1.default
});
exports.User.sync().then(() => {
    console.log(`${tableName} table created successfully!`);
});

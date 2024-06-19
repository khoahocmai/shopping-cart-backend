"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const sequelize_1 = require("sequelize");
const SQLModel_1 = __importDefault(require("../constants/SQLModel"));
const UUIDModel_1 = __importDefault(require("../constants/UUIDModel"));
const database_1 = __importDefault(require("../databases/database"));
const tableName = 'product';
exports.Product = database_1.default.define(tableName, {
    ...UUIDModel_1.default,
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    price: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
        unique: false
    },
    previousPrice: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
        unique: false
    },
    status: {
        type: sequelize_1.DataTypes.ENUM('Available', 'Unavailable'),
        allowNull: false,
        unique: false
    },
    imageUrl: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        unique: false
    },
    category: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        unique: false
    },
    deleted: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        unique: false
    },
    ...SQLModel_1.default
});
exports.Product.sync().then(() => {
    console.log(`${tableName} table created successfully!`);
});

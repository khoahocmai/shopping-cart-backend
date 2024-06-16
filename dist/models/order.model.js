"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const sequelize_1 = require("sequelize");
const SQLModel_1 = __importDefault(require("../constants/SQLModel"));
const UUIDModel_1 = __importDefault(require("../constants/UUIDModel"));
const database_1 = __importDefault(require("../databases/database"));
const tableName = 'order';
exports.Order = database_1.default.define(tableName, {
    ...UUIDModel_1.default,
    customerId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false
    },
    date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW
    },
    totalAmount: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false
    },
    sizes: {
        type: sequelize_1.DataTypes.ENUM('S', 'M', 'L', 'XL', 'XXL', 'XXXL'),
        allowNull: false,
        defaultValue: 'S'
    },
    status: {
        type: sequelize_1.DataTypes.ENUM('Pending', 'Completed'),
        allowNull: false,
        defaultValue: 'Pending'
    },
    design: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    deleted: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    ...SQLModel_1.default
});
exports.Order.sync().then(() => {
    console.log(`${tableName} table created successfully!`);
});

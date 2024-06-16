"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment = void 0;
const sequelize_1 = require("sequelize");
const SQLModel_1 = __importDefault(require("../constants/SQLModel"));
const UUIDModel_1 = __importDefault(require("../constants/UUIDModel"));
const database_1 = __importDefault(require("../databases/database"));
const tableName = 'payment';
exports.Payment = database_1.default.define(tableName, {
    ...UUIDModel_1.default,
    orderId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        unique: false
    },
    cashierId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        unique: false
    },
    amount: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
        unique: false
    },
    paymentMethod: {
        type: sequelize_1.DataTypes.ENUM('Card', 'Cash'),
        allowNull: false,
        unique: false
    },
    paymentStatus: {
        type: sequelize_1.DataTypes.ENUM('Pending', 'Completed', 'Cancelled'),
        allowNull: false,
        unique: false
    },
    paymentTime: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        unique: false
    },
    deleted: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        unique: false
    },
    ...SQLModel_1.default
});
exports.Payment.sync().then(() => {
    console.log(`${tableName} table created successfully!`);
});

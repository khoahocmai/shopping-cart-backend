"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderDetail = void 0;
const sequelize_1 = require("sequelize");
const SQLModel_1 = __importDefault(require("../constants/SQLModel"));
const UUIDModel_1 = __importDefault(require("../constants/UUIDModel"));
const database_1 = __importDefault(require("../databases/database"));
const tableName = 'orderDetail';
exports.OrderDetail = database_1.default.define(tableName, {
    ...UUIDModel_1.default,
    orderId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false
    },
    productId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    price: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false
    },
    orderTime: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW
    },
    sizes: {
        type: sequelize_1.DataTypes.ENUM('M', 'L', 'XL', 'XXL', 'XXXL'),
        allowNull: false,
        defaultValue: 'M'
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
exports.OrderDetail.sync().then(() => {
    console.log(`${tableName} table created successfully!`);
});

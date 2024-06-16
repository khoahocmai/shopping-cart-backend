"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const SQLModel = {
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: (0, sequelize_1.literal)('NOW()')
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: (0, sequelize_1.literal)('NOW()')
    }
};
exports.default = SQLModel;

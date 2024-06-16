"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyRole = (role) => (req, res, next) => {
    const token = req.headers['authorization'] || req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET);
        if (role !== decoded.role) {
            return res.status(403).json({ message: "Don't have permission" });
        }
        next();
    }
    catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (token) {
        jsonwebtoken_1.default.verify(token, process.env.SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).send({ message: 'Invalid token' });
            }
            // If there's no error, proceed to the next middleware or route handler
            next();
        });
    }
    else {
        return res.status(401).send({ message: 'Unauthorized' });
    }
};
// const verifyTokenAdmin
exports.default = {
    verifyRole,
    verifyToken
};

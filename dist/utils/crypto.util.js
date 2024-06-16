"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = exports.encrypt = void 0;
const crypto_1 = __importDefault(require("crypto"));
const IV_LENGTH = 16;
const ENC_KEY = crypto_1.default.randomBytes(32);
function toText(data) {
    if (typeof data === 'object') {
        return JSON.stringify(data);
    }
    if (typeof data === 'string') {
        return data;
    }
    return data.toString();
}
function toData(text) {
    try {
        return JSON.parse(text);
    }
    catch (_) {
        return text;
    }
}
function encrypt(data) {
    const text = toText(data);
    const iv = crypto_1.default.randomBytes(IV_LENGTH);
    const cipher = crypto_1.default.createCipheriv('aes-256-cbc', ENC_KEY, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + ':' + encrypted;
}
exports.encrypt = encrypt;
function decrypt(cipherText) {
    const [ivHex, encrypted] = cipherText.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const decipher = crypto_1.default.createDecipheriv('aes-256-cbc', ENC_KEY, iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return toData(decrypted);
}
exports.decrypt = decrypt;

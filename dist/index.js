"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// ===== Imports =====
require("dotenv/config");
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const overwriteResponseJSON_middleware_1 = require("./middlewares/overwriteResponseJSON.middleware");
const index_1 = __importDefault(require("./routes/index"));
const swagger_1 = __importDefault(require("./swagger/swagger"));
const start = async () => {
    try {
        // ===== Config =====
        const app = (0, express_1.default)();
        const PORT = process.env.PORT || 3000;
        // ===== Middlewares =====
        // app.use(
        //   cors({
        //     origin: process.env.CLIENT_URL,
        //     credentials: true
        //   })
        // )
        app.use((0, cors_1.default)());
        app.use(body_parser_1.default.json());
        app.use(body_parser_1.default.urlencoded({ extended: true }));
        app.use((0, cookie_parser_1.default)());
        app.use(overwriteResponseJSON_middleware_1.overwriteResponseJSON);
        // ===== Routes =====
        // app.use('/', indexRouter)
        app.use('/api', index_1.default);
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
            console.log(`Swagger on http://localhost:${PORT}/api`);
            (0, swagger_1.default)(app, String(PORT));
        });
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
};
start();

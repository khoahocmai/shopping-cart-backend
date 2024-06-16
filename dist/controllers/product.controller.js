"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const responseStatus_1 = __importDefault(require("../constants/responseStatus"));
const product_service_1 = __importDefault(require("../services/product.service"));
async function getProducts(req, res) {
    try {
        const { products, pagination } = await product_service_1.default.getAllProducts(req);
        res.json(responseStatus_1.default.DataResponse('Get product list successfully!', products, pagination));
    }
    catch (error) {
        console.log(error);
        res.json(responseStatus_1.default.InternalErrorResponse());
    }
}
async function createProduct(req, res) {
    try {
        const product = await product_service_1.default.createProduct(req.body);
        res.json(responseStatus_1.default.DataResponse('Create product successfully!', product));
    }
    catch (error) {
        console.log(error);
        res.json(responseStatus_1.default.InternalErrorResponse());
    }
} // Controller Create product
async function updateProduct(req, res) {
    try {
        const product = await product_service_1.default.updateProduct(req.body);
        res.json(responseStatus_1.default.DataResponse('Update product successfully!', product));
    }
    catch (error) {
        console.log(error);
        res.json(responseStatus_1.default.InternalErrorResponse());
    }
} // Controller Update product
async function deleteProduct(req, res) {
    try {
        await product_service_1.default.deleteProduct(req.params.id);
        res.json(responseStatus_1.default.DataResponse('Product deleted successfully', ''));
    }
    catch (error) {
        console.log(error);
        res.json(responseStatus_1.default.InternalErrorResponse());
    }
} // Controller Delete product
async function getProductById(req, res) {
    try {
        const product = await product_service_1.default.getProductById(req.params.id);
        res.json(responseStatus_1.default.DataResponse('Get product successfully!', product));
    }
    catch (error) {
        console.log(error);
        res.json(responseStatus_1.default.InternalErrorResponse());
    }
} // Controller Get product by id
exports.default = {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductById
};

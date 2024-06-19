"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const product_model_1 = require("../models/product.model");
async function getAllProducts(req) {
    const { status, price_from, price_to, page_index = 1, page_size = 10, keyword } = req.query;
    const mapStatus = (statusNum) => {
        const statusValue = parseInt(statusNum);
        if (statusValue === 1)
            return 'Available';
        if (statusValue === 0)
            return 'Unavailable';
        return undefined;
    };
    const statusArray = status ? status.split(',').map(mapStatus) : undefined;
    const priceRange = price_from && price_to ? [Number(price_from), Number(price_to)] : undefined;
    const { count, rows: products } = await product_model_1.Product.findAndCountAll({
        where: {
            ...(statusArray && { status: { [sequelize_1.Op.in]: statusArray } }),
            ...(priceRange && { price: { [sequelize_1.Op.between]: priceRange } }),
            ...(keyword && { name: { [sequelize_1.Op.like]: `%${keyword}%` } })
        },
        limit: Number(page_size),
        offset: (Number(page_index) - 1) * Number(page_size)
    });
    const totalPage = Math.ceil(count / Number(page_size));
    const pagination = {
        pageSize: Number(page_size),
        totalItem: count,
        currentPage: Number(page_index),
        maxPageSize: 100,
        totalPage: totalPage
    };
    return { products: products, pagination: pagination };
}
async function getProductById(id) {
    const product = await product_model_1.Product.findByPk(id);
    if (product) {
        // Convert the product instance into a plain object
        const productData = product.get({ plain: true });
        return productData;
    }
    return null;
} // Get product by id
async function createProduct(productData) {
    const product = await product_model_1.Product.create({
        id: productData.id,
        name: productData.name,
        description: productData.description,
        price: productData.price,
        previousPrice: productData.previousPrice,
        status: productData.status,
        imageUrl: productData.imageUrl,
        category: productData.category,
        deleted: productData.deleted
    });
    return product;
} // Create product
async function updateProduct(productData) {
    const product = await product_model_1.Product.update(productData, {
        where: { id: productData.id }
    });
    return product;
} // Update product
async function deleteProduct(id) {
    const result = await product_model_1.Product.update({
        deleted: true
    }, {
        where: { id: id }
    });
    return result;
} // Delete product
exports.default = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};

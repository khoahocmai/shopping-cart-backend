"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const design_model_1 = require("../models/design.model");
async function getAllDesigns(req) {
    const { page_index = 1, page_size = 10, keyword } = req.query;
    const { count, rows: designs } = await design_model_1.Design.findAndCountAll({
        where: {
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
    return { designs: designs, pagination: pagination };
}
async function getDesignById(id) {
    const design = await design_model_1.Design.findByPk(id);
    if (design) {
        const designData = design.get({ plain: true });
        return designData;
    }
    return null;
}
async function createDesign(designData) {
    const design = await design_model_1.Design.create({
        id: designData.id,
        productId: designData.productId,
        name: designData.name,
        imageUrl: designData.imageUrl,
        deleted: designData.deleted
    });
    return design;
}
async function updateDesign(designData) {
    const design = await design_model_1.Design.update(designData, {
        where: { id: designData.id }
    });
    return design;
}
async function deleteDesign(id) {
    const result = await design_model_1.Design.update({
        deleted: true
    }, {
        where: { id: id }
    });
    return result;
}
exports.default = {
    getAllDesigns,
    getDesignById,
    createDesign,
    updateDesign,
    deleteDesign
};

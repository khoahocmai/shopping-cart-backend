"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const responseStatus_1 = __importDefault(require("../constants/responseStatus"));
const design_service_1 = __importDefault(require("../services/design.service"));
async function getDesigns(req, res) {
    try {
        const designs = await design_service_1.default.getAllDesigns(req);
        res.json(responseStatus_1.default.DataResponse('Get design list successfully!', designs));
    }
    catch (error) {
        console.log(error);
        res.json(responseStatus_1.default.InternalErrorResponse(error.message));
    }
} // Controller Get all designs
async function getDesign(req, res) {
    try {
        const designId = req.params.id;
        const design = await design_service_1.default.getDesignById(designId);
        if (!design) {
            res.json(responseStatus_1.default.NotFoundResponse('Not found any Design'));
        }
        res.json(responseStatus_1.default.DataResponse('Get design successfully!', design));
    }
    catch (error) {
        console.log(error);
        res.json(responseStatus_1.default.InternalErrorResponse(error.message));
    }
} // Controller Get design by Id
async function createDesign(req, res) {
    try {
        const designData = req.body;
        const design = await design_service_1.default.createDesign(designData);
        if (!design) {
            res.json(responseStatus_1.default.MessageResponse('Error in create Design'));
        }
        res.json(responseStatus_1.default.CreateSuccessResponse('', design));
    }
    catch (error) {
        console.log(error);
        res.json(responseStatus_1.default.InternalErrorResponse(error.message));
    }
} // Controller Create design
async function updateDesign(req, res) {
    try {
        const updateData = req.body;
        const design = await design_service_1.default.updateDesign(updateData);
        if (!design) {
            res.json(responseStatus_1.default.MessageResponse('Error in update Design'));
        }
        res.json(responseStatus_1.default.MessageResponse('Update Design success'));
    }
    catch (error) {
        console.log(error);
        res.json(responseStatus_1.default.InternalErrorResponse(error.message));
    }
} // Controller Update design
async function deleteDesign(req, res) {
    try {
        const designId = req.params.id;
        const design = await design_service_1.default.deleteDesign(designId);
        if (!design) {
            res.json(responseStatus_1.default.MessageResponse('Error in delete Design'));
        }
        res.json(responseStatus_1.default.MessageResponse('Delete Design success'));
    }
    catch (error) {
        console.log(error);
        res.json(responseStatus_1.default.InternalErrorResponse(error.message));
    }
} // Controller Delete design
exports.default = {
    getDesigns,
    getDesign,
    createDesign,
    updateDesign,
    deleteDesign
};

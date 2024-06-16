import { Request, Response } from 'express'

import responseStatus from '~/constants/responseStatus'
import DesignService from '~/services/design.service'

async function getDesigns(req: Request, res: Response) {
  try {
    const designs = await DesignService.getAllDesigns(req)
    res.json(responseStatus.DataResponse('Get design list successfully!', designs))
  } catch (error: string | any) {
    console.log(error)
    res.json(responseStatus.InternalErrorResponse(error.message))
  }
} // Controller Get all designs

async function getDesign(req: Request, res: Response) {
  try {
    const designId = req.params.id
    const design = await DesignService.getDesignById(designId)
    if (!design) {
      res.json(responseStatus.NotFoundResponse('Not found any Design'))
    }
    res.json(responseStatus.DataResponse('Get design successfully!', design))
  } catch (error: string | any) {
    console.log(error)
    res.json(responseStatus.InternalErrorResponse(error.message))
  }
} // Controller Get design by Id

async function createDesign(req: Request, res: Response) {
  try {
    const designData = req.body
    const design = await DesignService.createDesign(designData)
    if (!design) {
      res.json(responseStatus.MessageResponse('Error in create Design'))
    }
    res.json(responseStatus.CreateSuccessResponse('', design))
  } catch (error: string | any) {
    console.log(error)
    res.json(responseStatus.InternalErrorResponse(error.message))
  }
} // Controller Create design

async function updateDesign(req: Request, res: Response) {
  try {
    const updateData = req.body
    const design = await DesignService.updateDesign(updateData)
    if (!design) {
      res.json(responseStatus.MessageResponse('Error in update Design'))
    }
    res.json(responseStatus.MessageResponse('Update Design success'))
  } catch (error: string | any) {
    console.log(error)
    res.json(responseStatus.InternalErrorResponse(error.message))
  }
} // Controller Update design

async function deleteDesign(req: Request, res: Response) {
  try {
    const designId = req.params.id
    const design = await DesignService.deleteDesign(designId)
    if (!design) {
      res.json(responseStatus.MessageResponse('Error in delete Design'))
    }
    res.json(responseStatus.MessageResponse('Delete Design success'))
  } catch (error: string | any) {
    console.log(error)
    res.json(responseStatus.InternalErrorResponse(error.message))
  }
} // Controller Delete design

export default {
  getDesigns,
  getDesign,
  createDesign,
  updateDesign,
  deleteDesign
}

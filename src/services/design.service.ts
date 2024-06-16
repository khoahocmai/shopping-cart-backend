import { Request } from 'express'
import { Op, WhereOptions } from 'sequelize'

import { Design, DesignAttributes } from '~/models/design.model'

async function getAllDesigns(req: Request) {
  const { page_index = 1, page_size = 10, keyword } = req.query

  const { count, rows: designs } = await Design.findAndCountAll({
    where: {
      ...(keyword && { name: { [Op.like]: `%${keyword}%` } })
    } as WhereOptions<DesignAttributes> | undefined,
    limit: Number(page_size),
    offset: (Number(page_index) - 1) * Number(page_size)
  })

  const totalPage = Math.ceil(count / Number(page_size))
  const pagination = {
    pageSize: Number(page_size),
    totalItem: count,
    currentPage: Number(page_index),
    maxPageSize: 100,
    totalPage: totalPage
  }

  return { designs: designs, pagination: pagination }
}

async function getDesignById(id: string) {
  const design = await Design.findByPk(id)
  if (design) {
    const designData = design.get({ plain: true })

    return designData
  }
  return null
}

async function createDesign(designData: DesignAttributes) {
  const design = await Design.create({
    id: designData.id,
    productId: designData.productId,
    name: designData.name,
    imageUrl: designData.imageUrl,
    deleted: designData.deleted
  })
  return design
}

async function updateDesign(designData: DesignAttributes) {
  const design = await Design.update(designData, {
    where: { id: designData.id }
  })
  return design
}

async function deleteDesign(id: string) {
  const result = await Design.update(
    {
      deleted: true
    },
    {
      where: { id: id }
    }
  )
  return result
}

export default {
  getAllDesigns,
  getDesignById,
  createDesign,
  updateDesign,
  deleteDesign
}

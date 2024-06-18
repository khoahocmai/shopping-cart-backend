import { DataTypes, Model } from 'sequelize'

import SQLModel from '~/constants/SQLModel'
import UUIDModel from '~/constants/UUIDModel'
import sequelize from '~/databases/database'

const tableName = 'imageAIRender'

export const ImageAIRender = sequelize.define<ImageAIRenderInstance>(tableName, {
  ...UUIDModel,
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false
  },
  deleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  ...SQLModel
})

export interface ImageAIRenderAttributes {
  id: string
  date: Date
  imageUrl: string
  deleted: boolean
}

export interface ImageAIRenderInstance extends Model<ImageAIRenderAttributes>, ImageAIRenderAttributes {}

ImageAIRender.sync().then(() => {
  console.log(`${tableName} table created successfully!`)
})

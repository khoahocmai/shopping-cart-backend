import { DataTypes, Model } from 'sequelize'

import SQLModel from '~/constants/SQLModel'
import UUIDModel from '~/constants/UUIDModel'
import sequelize from '~/databases/database'

const tableName = 'design'

export const Design = sequelize.define<DesignInstance>(tableName, {
  ...UUIDModel,
  productId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  deleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  ...SQLModel
})

export interface DesignAttributes {
  id: string
  productId: string
  name: string
  imageUrl: string
  deleted: boolean
}

export interface DesignInstance extends Model<DesignAttributes>, DesignAttributes {}

Design.sync().then(() => {
  console.log(`${tableName} table created successfully!`)
})

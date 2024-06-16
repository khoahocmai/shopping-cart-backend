import { DataTypes, Model } from 'sequelize'

import SQLModel from '~/constants/SQLModel'
import UUIDModel from '~/constants/UUIDModel'
import sequelize from '~/databases/database'

const tableName = 'product'

export const Product = sequelize.define<ProductInstance>(tableName, {
  ...UUIDModel,
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
    unique: false
  },
  previousPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
    unique: false
  },
  status: {
    type: DataTypes.ENUM('Available', 'Unavailable'),
    allowNull: false,
    unique: false
  },
  deleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    unique: false
  },
  ...SQLModel
})

export interface ProductInstance extends Model<ProductAttributes>, ProductAttributes {}

export interface ProductAttributes {
  id: string
  name: string
  description: string
  price: number
  previousPrice: number
  status: 'Available' | 'Unavailable'
  deleted: boolean
}

Product.sync().then(() => {
  console.log(`${tableName} table created successfully!`)
})

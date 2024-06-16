import { DataTypes, Model } from 'sequelize'

import SQLModel from '~/constants/SQLModel'
import UUIDModel from '~/constants/UUIDModel'
import sequelize from '~/databases/database'

const tableName = 'order'

export const Order = sequelize.define<OrderInstance>(tableName, {
  ...UUIDModel,
  customerId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  totalAmount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  sizes: {
    type: DataTypes.ENUM('S', 'M', 'L', 'XL', 'XXL', 'XXXL'),
    allowNull: false,
    defaultValue: 'S'
  },
  status: {
    type: DataTypes.ENUM('Pending', 'Completed'),
    allowNull: false,
    defaultValue: 'Pending'
  },
  design: {
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

export interface OrderAttributes {
  id: string
  customerId: string
  date: Date
  totalAmount: number
  sizes: 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL'
  status: 'Pending' | 'Completed'
  design: string
  deleted: boolean
}

export interface OrderInstance extends Model<OrderAttributes>, OrderAttributes {}

Order.sync().then(() => {
  console.log(`${tableName} table created successfully!`)
})

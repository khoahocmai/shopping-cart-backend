import { DataTypes, Model } from 'sequelize'

import SQLModel from '~/constants/SQLModel'
import UUIDModel from '~/constants/UUIDModel'
import sequelize from '~/databases/database'

const tableName = 'orderDetail'

export const OrderDetail = sequelize.define<OrderDetailInstance>(tableName, {
  ...UUIDModel,
  orderId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  productId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  orderTime: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  sizes: {
    type: DataTypes.ENUM('M', 'L', 'XL', 'XXL', 'XXXL'),
    allowNull: false,
    defaultValue: 'M'
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

export interface OrderDetailAttributes {
  id: string
  orderId: string
  productId: string
  quantity: number
  price: number
  orderTime: Date
  sizes: 'M' | 'L' | 'XL' | 'XXL' | 'XXXL'
  design: string
  deleted: boolean
}

export interface OrderDetailInstance extends Model<OrderDetailAttributes>, OrderDetailAttributes {}

OrderDetail.sync().then(() => {
  console.log(`${tableName} table created successfully!`)
})

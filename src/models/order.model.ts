import { DataTypes, Model } from 'sequelize'

import SQLModel from '~/constants/SQLModel'
import UUIDModel from '~/constants/UUIDModel'
import sequelize from '~/databases/database'

const tableName = 'order'

export const Order = sequelize.define<OrderInstance>(tableName, {
  ...UUIDModel,
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  totalAmount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('Pending', 'Completed'),
    allowNull: false,
    defaultValue: 'Pending'
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
  date: Date
  totalAmount: number
  status: 'Pending' | 'Completed'
  deleted: boolean
}

export interface OrderInstance extends Model<OrderAttributes>, OrderAttributes {}

Order.sync().then(() => {
  console.log(`${tableName} table created successfully!`)
})

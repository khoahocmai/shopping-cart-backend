import { DataTypes, Model } from 'sequelize'

import SQLModel from '~/constants/SQLModel'
import UUIDModel from '~/constants/UUIDModel'
import sequelize from '~/databases/database'

const tableName = 'payment'

export const Payment = sequelize.define<PaymentInstance>(tableName, {
  ...UUIDModel,
  orderId: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: false
  },
  cashierId: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: false
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
    unique: false
  },
  paymentMethod: {
    type: DataTypes.ENUM('Card', 'Cash'),
    allowNull: false,
    unique: false
  },
  paymentStatus: {
    type: DataTypes.ENUM('Pending', 'Completed', 'Cancelled'),
    allowNull: false,
    unique: false
  },
  paymentTime: {
    type: DataTypes.DATE,
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

export interface PaymentAttributes {
  id: string
  orderId: string
  cashierId: string
  amount: number
  paymentMethod: 'Card' | 'Cash'
  paymentStatus: 'Pending' | 'Completed' | 'Cancelled'
  paymentTime: Date
  deleted: boolean
}

export interface PaymentInstance extends Model<PaymentAttributes>, PaymentAttributes {}

Payment.sync().then(() => {
  console.log(`${tableName} table created successfully!`)
})

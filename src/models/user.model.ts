import { DataTypes, Model } from 'sequelize'

import SQLModel from '~/constants/SQLModel'
import { Role } from '~/constants/type'
import UUIDModel from '~/constants/UUIDModel'
import sequelize from '~/databases/database'

const tableName = 'user'

export interface UserAttributes {
  id: string
  username: string
  password: string
  firstName: string
  lastName: string
  phone: string
  email: string
  role: Role
  createdAt?: Date
  updatedAt?: Date
}

// Define UserInstance interface
export interface UserInstance extends Model<UserAttributes>, UserAttributes {}

export const User = sequelize.define<UserInstance>(tableName, {
  ...UUIDModel,
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  role: {
    type: DataTypes.ENUM('admin', 'customer'),
    defaultValue: 'customer'
  },
  ...SQLModel
})

User.sync().then(() => {
  console.log(`${tableName} table created successfully!`)
})

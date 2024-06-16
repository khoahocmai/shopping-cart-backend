import { DataTypes, literal } from 'sequelize'

const SQLModel = {
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: literal('NOW()')
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: literal('NOW()')
  }
}

export default SQLModel

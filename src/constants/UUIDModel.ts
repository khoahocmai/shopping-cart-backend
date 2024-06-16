import Sequelize from 'sequelize'

const UUIDModel = {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true
  }
}

export default UUIDModel

import { Sequelize } from 'sequelize'

const sequelize = new Sequelize(
  process.env.MYSQL_DB as string,
  process.env.MYSQL_USERNAME as string,
  process.env.MYSQL_PASSWORD as string,
  {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
    logging: false
  }
)

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch((error: any) => {
    console.error('Unable to connect to the database: ', error)
  })

export default sequelize

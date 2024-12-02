import { join } from 'path'
import * as dotenv from 'dotenv'

dotenv.config()

export const databaseConfig = {
  type: 'mysql' as const,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  logging: true,
  migrations: [join(__dirname, '../migrations/*.{ts,js}')],
  entities: [join(__dirname, '../**/entities/*.entity.{ts,js}')],
  synchronize: false
}

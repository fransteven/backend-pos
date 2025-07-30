import { Sequelize } from "sequelize-typescript"
import dotenv from "dotenv"
import path from "path"

dotenv.config()

export const db = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASS, {
    models: [
        path.resolve(__dirname, '../api/modules/inventory/models/*.ts'),
        path.resolve(__dirname, '../api/modules/sales/models/*.ts'),
    ],
    logging: false,
    host: 'localhost',
    dialect: 'postgres',
    port: +process.env.DATABASE_PORT,
}
)
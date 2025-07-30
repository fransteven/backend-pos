import express from 'express' 
import colors from 'colors'
import morgan from 'morgan'
import { db } from './config/db'
import inventoryRouter from './api/modules/inventory/routes/inventory.routes'
import salesRouter from './api/modules/sales/routes/sales.routes'

async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        console.log(colors.blue.bold('Conexión a la base de datos exitosa!.'))
    } catch (error) {
        console.log(error)
        console.log(colors.red.bold('Conexión a la base de datos fallida!.'))
    }
}

connectDB()

const app = express()

app.use(morgan('dev'))

app.use(express.json())

app.use('/api/v1/inventory',inventoryRouter)
app.use('/api/v1/sales',salesRouter)


export default app
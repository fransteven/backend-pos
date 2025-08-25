import express from 'express'
import colors from 'colors'
import morgan from 'morgan'
import { db } from './config/db'
import inventoryRouter from './api/modules/inventory/routes/inventory.routes'
import salesRouter from './api/modules/sales/routes/sales.routes'
import { CorsOptions } from 'cors'
import cors from 'cors'

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

// Define los orígenes permitidos.
// Aquí puedes agregar los dominios de tu frontend en producción.
const allowedOrigins = [
    'http://localhost:5173',
    'https://mi-frontend.com'];

// Define las opciones de CORS
const options: CorsOptions = {
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Habilita el envío de cookies o encabezados de autenticación
};

app.use(cors(options))

app.use(morgan('dev'))

app.use(express.json())

app.use('/api/v1/inventory', inventoryRouter)
app.use('/api/v1/sales', salesRouter)


export default app
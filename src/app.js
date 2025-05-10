
import express from 'express'
import medicamentosRouters from './routes/softwares.routes.js'

const app = express()

app.use(express.json()) 
app.use('/api/', medicamentosRouters);

export default app


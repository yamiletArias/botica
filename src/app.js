
import express from 'express'
import softwaresRouters from './routes/softwares.routes.js'

const app = express()

app.use(express.json()) 
app.use('/api/', softwaresRouters);

export default app


import express, { Application } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from './config/swagger'
import { requestLogger, unknownEndpoint } from './middlewares/infoRequest'

import userRouter from './modules/users/routes/users.route'
import profileRouter from './modules/users/routes/profile.route'
import locationsRouter from './modules/locations/routes/locations.route'
import companyRouter from './modules/companies/routes/companies.route'
import audiovisualProjectsRouter from './modules/projects/routes/audiovisualProjects.route'

const app: Application = express()

app.use(cors())
app.use(morgan(':method :url :status :response-time ms'))
app.use(express.json())

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

if (process.env.NODE_ENV !== 'test') {
  app.use(requestLogger)
}

app.use('/api/users', userRouter)
app.use('/api/profile', profileRouter)
app.use('/api/locations', locationsRouter)
app.use('/api/companies', companyRouter)
app.use('/api/projects', audiovisualProjectsRouter)

// API health check route
app.get('/api', (_req, res) => {
  res.send(
    "API de la Comisión Fílmica de Ecuador | API's Ecuadorian Film Commission",
  )
})

app.use(unknownEndpoint)

export default app

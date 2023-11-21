import express, { Application, NextFunction, Request, Response } from 'express'
import mongoose from 'mongoose'
import modules from './modules'

const app: Application = express()

export class App {
  constructor() {
    this.setupMiddleware()
    this.setupRoutes()
    this.setupDb()
    this.setupApplication()
  }

  async setupDb() {
    try {
      await mongoose.connect('mongodb://127.0.0.1:27017/rest-api')
      console.log('Database is connected')
    } catch (err) {
      console.log('Db error')
    }
  }

  setupMiddleware() {
    app.use((req: Request, res: Response, next: NextFunction) => {
      res.header('Access-Control-Allow-Origin', '*')
      res.header('Access-Control-Allow-Headers', '*')
      if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', '*')
        return res.status(200).json()
      }

      next()
    })

    app.use(express.static('public'))
  }

  setupRoutes() {
    modules.forEach((route) => app.use('/api', route))
  }

  setupApplication() {
    const PORT = '6565'
    const HOST = 'http://localhost'

    app.listen(PORT, () => {
      console.log(`Server Listen to port ${PORT} host ${HOST}`)
    })
  }
}

import bodyParser from 'body-parser'
import express, { Application, NextFunction, Request, Response } from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import path from 'path'
import modules from './modules'
import './types/global'

const app: Application = express()

type TGlobal = typeof globalThis & {
  root: string
  $errorStatus400: (res: Response, err: any) => void
  $errorStatus401: (res: Response, err: any) => void
  $errorStatus409: (res: Response, err: any) => void
  $errorStatus417: (res: Response, err: any) => void
  $errorStatus500: (res: Response, err: any) => void
  $errorStatusObjectId: (res: Response) => void
}

let globalRoot: TGlobal

export class App {
  constructor() {
    this.setupMiddleware()
    this.setupRoutes()
    this.setupDb()
    this.setupError()
    this.setupApplication()
  }

  async setupDb() {
    try {
      await mongoose.connect(
        'mongodb+srv://vercel-admin-user:13771377@cluster0.17lybce.mongodb.net/?retryWrites=true&w=majority'
      )
      console.log('Database is connected')
    } catch (err) {
      console.log('Db error')
    }
  }

  setupAppRoot() {
    globalRoot.root = path.resolve(__dirname)
  }

  setupMiddleware() {
    app.use((req: Request, res: Response, next: NextFunction) => {
      res.header('Access-Control-Allow-Origin', '*')
      res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
      res.header('Access-Control-Allow-Credentials', 'true')
      if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
        return res.status(200).json()
      }

      next()
    })

    app.use(express.static('public'))
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())
    if (process.env.NODE_ENV === 'development') {
      app.use(morgan('dev'))
    }
  }

  setupError() {
    process.on('rejectionHandled', (err) => console.log(err))
    process.on('uncaughtException', (err) => console.log(err))
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

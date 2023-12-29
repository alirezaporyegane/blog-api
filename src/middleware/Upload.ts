import fs from 'fs'
import multer from 'multer'

const storage = multer.diskStorage({
  destination: function (req, _, cb) {
    if (!fs.existsSync('public')) fs.mkdirSync('public')

    if (!fs.existsSync('public/temp')) fs.mkdirSync('public/temp')

    if (!fs.existsSync(`public/temp/${req.query.path}`))
      fs.mkdirSync(`public/temp/${req.query.path}`)

    cb(null, `public/temp/${req.query.path}`)
  },
  filename: function (_, file, cb) {
    const uniqueSuffix = Date.now()
    cb(null, uniqueSuffix + '-' + file.originalname)
  }
})

export const upload = multer({ storage: storage })

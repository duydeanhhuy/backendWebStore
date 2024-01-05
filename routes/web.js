import express from 'express'
import userController from '../controllers/userController'
let router = express.Router()

let initWebRoutes = (app) => {
  router.get('/', (req, res) => {
    return res.send(`Hello world`)
  })

  router.post('/create-account', userController.createUser)
  router.post('/login', userController.loginAccount)
  return app.use('/', router)
}

module.exports = initWebRoutes

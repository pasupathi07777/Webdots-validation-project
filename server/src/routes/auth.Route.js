import express from 'express'
import { checkAuth, loginUser, createUser } from '../crontrollers/auth.Crontroller.js'
import { authMiddleware } from '../middleware/auth.Middleware.js'

const routes=express.Router()

routes.post('/signup',createUser)
routes.post('/login',loginUser)
routes.get('/verify-token',authMiddleware,checkAuth)


export default routes
import express from 'express'
import { authMiddleware } from '../middleware/auth.Middleware.js'
import { deleteUsers, getAllUsers } from '../crontrollers/user.Crontroller.js'

const routes=express.Router()


routes.get('/getAllUsers',authMiddleware,getAllUsers)
routes.delete('/delete-user/:_id',authMiddleware,deleteUsers)


export default routes
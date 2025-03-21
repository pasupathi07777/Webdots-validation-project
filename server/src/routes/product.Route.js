import express from 'express'
import { authMiddleware } from '../middleware/auth.Middleware.js'
import { addProduct, deleteProduct, editProduct, getAllProducts } from '../crontrollers/product.Crontroller.js'

const routes=express.Router()


routes.get('/get-product',authMiddleware,getAllProducts)
routes.post('/add-product',authMiddleware,addProduct)
routes.put('/edit-product/:_id',authMiddleware,editProduct)
routes.delete('/delete-product/:_id',authMiddleware,deleteProduct)


export default routes
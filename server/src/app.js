import express from 'express'
import cors from 'cors'
import  authRoutes  from './routes/auth.Route.js'
import errorHandler from './middleware/error.Middleware.js'
import usersRoutes from './routes/users.Route.js'
import productRoutes from './routes/product.Route.js'
import dotenv from "dotenv";  
dotenv.config({ path: "../.env" });


const app=express()
app.use(
    cors({
      origin: 'http://localhost:5173',
      credentials: true, 
    })
  );
app.use(express.json())
app.use("/api/auth",authRoutes)
app.use("/api/users",usersRoutes)
app.use("/api/product",productRoutes)
app.use(errorHandler)




export default app
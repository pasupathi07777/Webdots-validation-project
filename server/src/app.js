import express from 'express'
import cors from 'cors'
import  authRoutes  from './routes/auth.Route.js'
import errorHandler from './middleware/error.Middleware.js'
import usersRoutes from './routes/users.Route.js'
import productRoutes from './routes/product.Route.js'
import dotenv from "dotenv";  
dotenv.config({ path: "../.env" });


const app=express()


const allowedOrigins = [
  "http://localhost:5173",
  "https://webstone-assessment-project.onrender.com"
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, 
  })
);

app.use(express.json({ limit: "1000mb" }));
app.use(express.urlencoded({ limit: "1000mb", extended: true }));
app.use("/api/auth",authRoutes)
app.use("/api/users",usersRoutes)
app.use("/api/product",productRoutes)
app.use(errorHandler)




export default app
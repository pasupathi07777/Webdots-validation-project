import app from './src/app.js'
import http from 'http'
import connectDb from './src/config/db.js'



const server=http.createServer(app)
const PORT =process.env.PORT || 5000



server.listen(PORT,()=>{
    console.log(`LOCAL: http://localhost:${PORT} `);-
    connectDb()
})







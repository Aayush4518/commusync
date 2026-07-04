import dotenv from "dotenv";

dotenv.config() //dotenv is used for loading environment variables from a .env file into process.env

import app from "./app"
import {connectDB} from "./config/db"

const port= process.env.PORT || 5000

const startServer= async()=>{         //starting backend server and connecting to database
  await connectDB()
  app.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
  })
}

startServer()
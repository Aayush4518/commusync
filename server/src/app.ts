import express from "express"
import cors from "cors"
import taskRoutes from "./routes/task.routes"

const app= express()

app.use(cors())
app.use(express.json()) //.json because we are sending json data from the client to the server

app.get('/', (_, res)=>{              // _ is used to ignore the first parameter which is request
  res.send('TM API RUNNING')
})

app.use("/api/tasks", taskRoutes)

export default app
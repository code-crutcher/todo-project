// import express from "express" -> used when type: module

import express from "express";
import dotenv from "dotenv"
import taskRoutes from "./routes/taskRoutes.js" 
import userRoutes from "./routes/userRoutes.js" 
import authRoutes from "./routes/authRouter.js" 
import { connectDb } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config()
// console.log('environment variable',process.env.MONGO_URI)

const app = express();

// middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(rateLimiter)

app.use("/api/auth",authRoutes)
/*
app.use("/api/tasks", (req, res, next)=>{
  if(req.isLoggedIn){
    next();
  }
  else{
      return res.redirect("/login")
  }
})
*/
app.use("/api/tasks", taskRoutes)
app.use("/api/users", userRoutes)

const PORT = process.env.PORT || 5001;

connectDb().then(()=>{
  app.listen(PORT,()=>{
    console.log(`server at http://localhost:${PORT}`)
  })
})


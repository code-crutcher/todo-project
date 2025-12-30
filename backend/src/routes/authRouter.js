import express from 'express'
import { getLogin, getSignup, postLogin, postLogout, postSignup } from '../controllers/authController.js';


const authRoutes = express.Router();

authRoutes.get("/login", getLogin)
authRoutes.post("/login", postLogin)
authRoutes.post("/logout", postLogout)
authRoutes.get("/signup", getSignup)
authRoutes.post("/signup", postSignup)

export default authRoutes
import express from 'express'
import { signupValidation, loginValidation } from '../middleware/authValidation.js';
import { postLogin, postLogout, postSignup } from '../controllers/authController.js';


const authRoutes = express.Router();

// authRoutes.get("/login", getLogin)
// authRoutes.get("/signup", getSignup)

// control will move to 'controller()' only after being validated
authRoutes.post("/login",loginValidation, postLogin)
authRoutes.post("/logout", postLogout)
authRoutes.post("/signup",signupValidation, postSignup)

export default authRoutes
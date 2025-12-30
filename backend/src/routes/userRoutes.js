import express from 'express'
import { editUserDetail, getUserDetail } from '../controllers/userController.js';

const userRoutes = express.Router();

userRoutes.get("/:id", getUserDetail)

userRoutes.post("/:id", editUserDetail)

export default userRoutes;
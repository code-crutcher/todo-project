import express from 'express'
import {getAllUsers, editUserDetail, getUserDetail } from '../controllers/userController.js';

const userRoutes = express.Router();

userRoutes.get("/", getAllUsers);

userRoutes.get("/:id", getUserDetail);

userRoutes.post("/:id", editUserDetail);

export default userRoutes;
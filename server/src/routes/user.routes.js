import { Router } from "express";
import {
   getOneUser,
   getAllUsers,
   createUser,
   updateUser,
   deleteUser,
   getUser
} from "../controller/user.js";

const router = Router();

// get an user/ all users
router.get("/", getAllUsers);
router.get("/:id", getUser, getOneUser);

// create an user
router.post("/", createUser);

// update an user
router.patch("/", getUser, updateUser);

// delete an user
router.delete("/:id", getUser, deleteUser);

export default router;
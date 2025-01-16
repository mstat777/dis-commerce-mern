import { Router } from "express";
import {
   getUser,
   getAllUsers,
   createUser,
   updateUser,
   deleteUser
} from "../controller/user.js";

const router = Router();

// get an user/ all users
router.get("/", getAllUsers);
router.get("/:id", getUser);

// create an user
router.post("/", createUser);

// update an user
router.patch("/", updateUser);

// delete an user
router.delete("/:id", deleteUser);

export default router;
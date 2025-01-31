import { Router } from "express";
import {
   getOneUser,
   getAllUsers,
   createUser,
   logUser,
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
router.post("/signin", logUser)

// update an user
router.patch("/:id", getUser, updateUser);

// delete an user
router.delete("/:id", getUser, deleteUser);

export default router;
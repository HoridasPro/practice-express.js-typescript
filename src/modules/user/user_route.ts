import { Router } from "express";
import { userController } from "./user_controller";
import auth from "../../middleware/auth";

const router = Router();

// all get data
router.get("/", auth(), userController.getAllUsers);

// create post
router.post("/", userController.createUser);

// get single data
router.get("/:id", userController.getSingleData);

// delete data
router.delete("/:id", userController.deleteData);

// update data
router.put("/:id", userController.updateData);

export const userRouter = router;

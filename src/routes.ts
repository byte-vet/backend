import { Router } from "express";
import UserController from "./controllers/user.controller";
import { checkUserType } from "./middlewares/checkUserType";

const router = Router();

const userController = new UserController();

router.post('/auth/signup', checkUserType, userController.create)
router.post('/auth/login', userController.login)

export { router };
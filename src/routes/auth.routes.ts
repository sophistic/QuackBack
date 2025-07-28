import { Router } from "express";
import { login, signup } from "../controllers/auth.controller";
const AuthRouter = Router();
AuthRouter.post("/login", login);
AuthRouter.post("/signup", signup);
export default AuthRouter;

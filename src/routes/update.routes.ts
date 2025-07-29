import { Router } from "express";
import { UpdateName } from "../controllers/update.controller";
const UpdateRouter = Router();

UpdateRouter.post("/name", UpdateName);
export default UpdateRouter;

import { Router } from "express";
import { UpdateName, FetchName } from "../controllers/update.controller";
const UpdateRouter = Router();

UpdateRouter.post("/name", UpdateName);
UpdateRouter.post("/get-name", FetchName);
export default UpdateRouter;

import { Router } from "express";
import { updateKeys, retrieveKeys } from "../controllers/apikey.controller";
const ApiRouter = Router();
ApiRouter.get("/retrieve", retrieveKeys);
ApiRouter.post("/update", updateKeys);
export default ApiRouter;

import { Router } from "express";
import {
  updateKeys,
  retrieveKeys,
  toggleApiKey,
} from "../controllers/apikey.controller";
const ApiRouter = Router();
ApiRouter.post("/retrieve", retrieveKeys);
ApiRouter.post("/update", updateKeys);
ApiRouter.post("/toggle", toggleApiKey);
export default ApiRouter;

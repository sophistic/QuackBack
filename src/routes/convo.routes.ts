import { Router } from "express";
import {
  GetUserConvos,
  GetUserMessages,
} from "../controllers/conversation.controller";
const ConvoRouter = Router();
ConvoRouter.post("/title", GetUserConvos);
ConvoRouter.post("/messages", GetUserMessages);
export default ConvoRouter;

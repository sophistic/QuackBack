import { Router } from "express";
import {
  GetUserConvos,
  GetUserMessages,
} from "../controllers/conversation.controller";
const ConvoRouter = Router();
ConvoRouter.get("/title", GetUserConvos);
ConvoRouter.get("/messages", GetUserMessages);
export default ConvoRouter;

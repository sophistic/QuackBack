import { Router } from "express";
import {
  createUserAgent,
  fetchUserAgent,
  deleteUserAgent,
} from "../controllers/agent.controller";
const AgentRouter = Router();
AgentRouter.post("/create", createUserAgent);
AgentRouter.get("/fetch", fetchUserAgent);
AgentRouter.post("/delete", deleteUserAgent);

export default AgentRouter;

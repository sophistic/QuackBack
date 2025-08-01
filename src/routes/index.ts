import { Router } from "express";
import AuthRouter from "./auth.routes";
import ApiRouter from "./apikey.routes";
import GenerateRouter from "./generate.routes";
import ConvoRouter from "./convo.routes";
import NotesRouter from "./notes.routes";
import UpdateRouter from "./update.routes";
import AgentRouter from "./agent.routes";
const router = Router();
router.use("/auth", AuthRouter);
router.use("/key", ApiRouter);
router.use("/generate", GenerateRouter);
router.use("/conversations", ConvoRouter);
router.use("/notes", NotesRouter);
router.use("/update", UpdateRouter);
router.use("/agent", AgentRouter);
// picture analyse ka endpoint
// Voice analyse ka endpoint
// Assisst Mode
// MCP Agent
export default router;

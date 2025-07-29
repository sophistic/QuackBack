import { Router } from "express";
import AuthRouter from "./auth.routes";
import ApiRouter from "./apikey.routes";
import GenerateRouter from "./generate.routes";
import ConvoRouter from "./convo.routes";
import NotesRouter from "./notes.routes";
import UpdateRouter from "./update.routes";
const router = Router();
router.use("/auth", AuthRouter);
router.use("/key", ApiRouter);
router.use("/generate", GenerateRouter);
router.use("/conversations", ConvoRouter);
router.use("/notes", NotesRouter);
router.use("/update", UpdateRouter);

// Make doc
// UPDATE ROUTES for all task
// Analyse pictures
// Voice ka part
// Assisst Mode
// Meta prompted Agent not MCP
// MCP Agent
export default router;

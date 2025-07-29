import { Router } from "express";
import AuthRouter from "./auth.routes";
import ApiRouter from "./apikey.routes";
import GenerateRouter from "./generate.routes";
import ConvoRouter from "./convo.routes";
const router = Router();
router.use("/auth", AuthRouter);
router.use("/key", ApiRouter);
router.use("/generate", GenerateRouter);
router.use("/conversations", ConvoRouter);
// TO DO
// NOTES Router
// ANYTIME MSG SENT REMEMBER TO SEND TO "NOTIFY FUNC" TO MAKE NOTE OF IT AND ADD TO NOTES CONTEXT PER use
// FETCH USE NOTES IN BACKEND GENERATE AND ADD TO FULL PROMPT
// Normal Update Routes
// Normal Fetch Routes
// Make doc
// Analyse pictures
// Voice ka part
// Assisst Mode
// Agents
export default router;

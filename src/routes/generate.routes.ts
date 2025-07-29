import { Router } from "express";
import { handleGenerate } from "../controllers/generate.controller";
const GenerateRouter = Router();
GenerateRouter.post("/msg", handleGenerate); // For normal msges
// GenerateRouter.post("/analyse"); // Coming soon
export default GenerateRouter;

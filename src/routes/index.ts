import { Router } from "express";
import AuthRouter from "./auth.routes";
import ApiRouter from "./apikey.routes";
import GenerateRouter from "./generate.routes";
const router = Router();
router.use("/auth", AuthRouter);
router.use("/key", ApiRouter);
router.use("/generate", GenerateRouter);
export default router;

// TO DO
// Generate Route
// expect provider name and apikey and model name
// store the prompt first
// depending on provider call
// nessecary func from "utils"
// also a check to validate the apikey
// then handle storing the responses

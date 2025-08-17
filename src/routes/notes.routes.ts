import { Router } from "express";
import { updateUserNotes, getUserNotes } from "../controllers/notes.controller";
const NotesRouter = Router();
NotesRouter.post("/all", getUserNotes);
NotesRouter.post("/update", updateUserNotes);
// NotesRouter.post("/new");
export default NotesRouter;

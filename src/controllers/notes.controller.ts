import { Response, Request } from "express";
import { updateNotes, getNotes } from "../services/notes.services";
export const updateUserNotes = async (req: Request, res: Response) => {
  const { email, notes } = req.body;
  if (!email || !notes) {
    return res
      .status(500)
      .json({ message: "Insufficient Data. Need email and Notes array." });
  }
  try {
    const result = await updateNotes(email, notes);
    return res.status(201).json(result);
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export const getUserNotes = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const result = await getNotes(email);
    return res.status(201).json(result);
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

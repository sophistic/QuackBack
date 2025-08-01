import { Response, Request } from "express";
import { updateNotes, getNotes } from "../services/notes.services";

export const updateUserNotes = async (req: Request, res: Response) => {
  const { email, notes } = req.body;
  if (!email || !notes) {
    return res.status(400).json({
      message: "Insufficient Data. Need email and notes array.",
    });
  }

  try {
    const result = await updateNotes(email, notes);
    if (!result) {
      return res.status(500).json({ message: false });
    }
    return res.status(201).json({ message: true });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export const getUserNotes = async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    return res
      .status(400)
      .json({ message: "Email is required to retrieve notes." });
  }

  try {
    const result = await getNotes(email);
    if (!result) {
      return res.status(404).json({ message: false });
    }
    return res.status(200).json({mesage:true,result:result});
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

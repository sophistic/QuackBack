import { Request, Response } from "express";
import { updateApiKeys, retrieveApiKeys } from "../services/apikey.services";

export const updateKeys = async (req: Request, res: Response) => {
  const { email, openai, gemini, anthropic } = req.body;

  if (!email) {
    return res.status(400).json({ message: false });
  }

  try {
    const result = await updateApiKeys(email, openai, gemini, anthropic);

    if (result) {
      return res.status(201).json({ message: true });
    } else {
      return res.status(400).json({ message: false });
    }
  } catch (err: any) {
    return res.status(500).json({ message: err.message || "Internal Server Error" });
  }
};

export const retrieveKeys = async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: false });
  }

  try {
    const result = await retrieveApiKeys(email);

    if (result) {
      return res.status(201).json({ message: true });
    } else {
      return res.status(400).json({ message: false });
    }
  } catch (err: any) {
    return res.status(500).json({ message: err.message || "Internal Server Error" });
  }
};

import { Request, Response } from "express";
import { updateApiKeys, retrieveApiKeys } from "../services/apikey.services";

export const updateKeys = async (req: Request, res: Response) => {
  const { email, openai, gemini, anthropic } = req.body;
  try {
    const result = updateApiKeys(email, openai, gemini, anthropic);
    res.status(201).json({ message: "success" });
  } catch (err: any) {
    res.status(500).json({ message: err });
  }
};

export const retrieveKeys = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const result = await retrieveApiKeys(email);
    res.status(201).json(result);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

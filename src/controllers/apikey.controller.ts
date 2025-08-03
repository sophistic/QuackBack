import { Request, Response } from "express";
import {
  updateApiKeys,
  retrieveApiKeys,
  toggleKey,
} from "../services/apikey.services";

export const updateKeys = async (req: Request, res: Response) => {
  const { provider, apiKey } = req.body;

  if (!provider || !apiKey) {
    return res.status(400).json({ message: false });
  }

  try {
    const result = await updateApiKeys(provider, apiKey);

    if (result) {
      return res.status(201).json({ message: true });
    } else {
      return res.status(400).json({ message: false });
    }
  } catch (err: any) {
    return res
      .status(500)
      .json({ message: err.message || "Internal Server Error" });
  }
};

export const retrieveKeys = async (req: Request, res: Response) => {
  const { provider } = req.body;

  if (!provider) {
    return res.status(400).json({ message: false });
  }

  try {
    const result = await retrieveApiKeys(provider);

    if (result) {
      return res.status(201).json(result);
    } else {
      return res.status(400).json({ message: false });
    }
  } catch (err: any) {
    return res
      .status(500)
      .json({ message: err.message || "Internal Server Error" });
  }
};

export const toggleApiKey = async (req: Request, res: Response) => {
  const { key_id, val } = req.body;
  try {
    const result = await toggleKey(key_id, val);
    return res.status(201).json({ message: result });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

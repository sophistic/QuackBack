import { Request, Response } from "express";
import {
  createAgent,
  fetchAgent,
  deleteAgent,
} from "../services/agent.services";
export const createUserAgent = async (req: Request, res: Response) => {
  const { email, agentName, agentTask, provider, modelName, apiKey } = req.body;
  if (
    !email ||
    !agentName ||
    !agentTask ||
    !provider ||
    !modelName ||
    !apiKey
  ) {
    return res.status(500).json({ message: "Incomplete Data." });
  }
  try {
    const result = await createAgent(
      email,
      agentName,
      agentTask,
      provider,
      modelName,
      apiKey,
    );
    return res.status(201).json(result);
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export const fetchUserAgent = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const result = await fetchAgent(email);
    return res.status(201).json(result);
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export const deleteUserAgent = async (req: Request, res: Response) => {
  const { agentId } = req.body;
  try {
    const result = await deleteAgent(agentId);
    return res.status(201).json({ message: result });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

import { Request, Response } from "express";
import { loginUser, signupUser } from "../services/auth.services";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: "Required Data is Missing!" });
  }

  try {
    const result = await loginUser(email, password);
    return res.status(201).json({ message: result });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export const signup = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: "Required Data is Missing!" });
  }
  try {
    const result = await signupUser(email, password);
    return res.status(201).json({ message: result });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

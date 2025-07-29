import { Response, Request } from "express";
import { UpdateUserName } from "../services/update.services";
export const UpdateName = async (req: Request, res: Response) => {
  const { email, name } = req.body;
  if (!email || !name) {
    return res.status(500).json({ message: "Missing Credentials" });
  }
  try {
    const result = await UpdateUserName(email, name);
    return res.status(201).json({ message: result });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

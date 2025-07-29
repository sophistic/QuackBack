import { Response, Request } from "express";
import { GetConvos, GetMessages } from "../services/conversation.services";
export const GetUserConvos = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const result = await GetConvos(email);
    return res.status(201).json(result);
  } catch (err: any) {
    return res.status(500).json({ messsage: err.messsage });
  }
};

export const GetUserMessages = async (req: Request, res: Response) => {
  const { convoId } = req.body;
  try {
    const result = await GetMessages(convoId);
    return res.status(201).json(result);
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

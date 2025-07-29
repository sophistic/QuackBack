import { Request, Response } from "express";
import { saveUserPrompt, saveAiResponse } from "../utils/saveConvo";
import { generateResponse } from "../services/generate.services";
import type { Message } from "../models/message.model";

export const handleGenerate = async (req: Request, res: Response) => {
  const {
    email,
    message,
    newConvo,
    conversationId,
    provider,
    modelName,
    apiKey,
    messageHistory,
  } = req.body;

  if (
    !email ||
    !message ||
    typeof newConvo !== "boolean" ||
    !provider ||
    !modelName ||
    !apiKey
  ) {
    return res.status(400).json({
      message:
        "Insufficient information provided. Needed email, message,  newConvo boolean, provider , modelName and apiKey",
    });
  }

  // For existing conversations, conversationId is required
  if (!newConvo && !conversationId) {
    return res.status(400).json({
      message: "conversationId is required for existing conversations",
    });
  }

  try {
    const userMessage = await saveUserPrompt(
      email,
      message,
      newConvo,
      conversationId,
    );

    const aiResponse = await generateResponse(
      provider,
      modelName,
      message,
      apiKey,
      messageHistory,
    );

    const aiMessage = await saveAiResponse({
      userId: userMessage.user_id,
      message: aiResponse,
      conversationId: userMessage.conversation_id,
    });

    return res.status(201).json({
      userMessage,
      aiMessage,
      conversationId: userMessage.conversation_id,
      aiResponse: aiMessage.content,
    });
  } catch (err: any) {
    console.error("Generate handler error:", err);
    return res.status(500).json({ message: err.message });
  }
};

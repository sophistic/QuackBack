import { Request, Response } from "express";
import { saveUserPrompt, saveAiResponse } from "../utils/saveConvo";
import { generateResponse } from "../services/generate.services";
import { newNote } from "../services/notes.services";
import type { Message } from "../models/message.model";

export const handleGenerate = async (req: Request, res: Response) => {
  const {
    email,
    message,
    newConvo,
    conversationId,
    provider,
    modelName,
    messageHistory,
    notes,
    agentId,
    agentContext,
  } = req.body;

  if (
    !email ||
    !message ||
    typeof newConvo !== "boolean" ||
    !provider ||
    !modelName ||
    !agentId
  ) {
    return res.status(400).json({
      message:
        "Insufficient information provided. Needed email, message,  newConvo boolean, provider , modelName , apiKey and agentId",
    });
  }

  // For existing conversations, conversationId is required
  if (!newConvo && !conversationId) {
    return res.status(400).json({
      message: "conversationId is required for existing conversations",
    });
  }

  try {
    const aiResponse = await generateResponse(
      provider,
      modelName,
      message,

      messageHistory,
      notes,
      agentContext,
    );
    const userMessage = await saveUserPrompt(
      email,
      message,
      newConvo,
      conversationId,
      provider,
      modelName,

      agentId,
    );

    const aiMessage = await saveAiResponse({
      userId: userMessage.user_id,
      message: aiResponse,
      conversationId: userMessage.conversation_id,
    });

    newNote(email, provider, modelName, message);
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

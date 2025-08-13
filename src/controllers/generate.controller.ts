import { Request, Response } from "express";
import { saveUserPrompt, saveAiResponse } from "../utils/saveConvo";
import { generateResponse } from "../services/generate.services";
import { newNote } from "../services/notes.services";
import type { Message } from "../models/message.model";
import { getUserId } from "../utils/getUserId";
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

  const missingFields: string[] = [];
  if (!email) missingFields.push("email");
  if (!message) missingFields.push("message");
  if (typeof newConvo !== "boolean") missingFields.push("newConvo (boolean)");
  if (!provider) missingFields.push("provider");
  if (!modelName) missingFields.push("modelName");
  if (agentId === undefined || agentId === null) missingFields.push("agentId");

  if (missingFields.length > 0) {
    return res.status(400).json({
      message: `Missing required fields: ${missingFields.join(", ")}`,
    });
  }

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

    const { message: userMessage, title } = await saveUserPrompt(
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
      title: title || null,
    });
  } catch (err: any) {
    console.error("Generate handler error:", err);
    return res.status(500).json({ message: err.message });
  }
};

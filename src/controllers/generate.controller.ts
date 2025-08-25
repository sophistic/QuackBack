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
    console.log("STEP 1: Calling generateResponse");
    const aiResponse = await generateResponse(
      provider,
      modelName,
      message,
      messageHistory,
      notes,
      agentContext,
    );

    console.log("STEP 2: Saving user prompt");
    const userPromptResult = await saveUserPrompt(
      email,
      message,
      newConvo,
      conversationId,
      provider,
      modelName,
      agentId,
    );

    console.log("userPromptResult:", userPromptResult);
    const { message: userMessage, title } = userPromptResult;

    console.log("STEP 3: Saving AI response");
    const aiMessage = await saveAiResponse({
      user_id: userMessage?.user_id, // optional chaining just in case
      message: aiResponse,
      conversationId: userMessage?.conversation_id,
    });

    console.log("STEP 4: Adding new note");
    await newNote(email, provider, modelName, message);

    console.log("STEP 5: Sending response");
    return res.status(201).json({
      conversationId: userMessage?.conversation_id,
      aiResponse: aiMessage.content,
      title: title || null,
    });
  } catch (err: any) {
    console.error("🔥 ERROR in handleGenerate at STEP:", err.stack || err);
    return res.status(500).json({ message: err.message });
  }
};

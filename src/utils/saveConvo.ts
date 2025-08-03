import { supabase } from "./supabase";
import { getUserId } from "./getUserId";
import { generateResponse } from "../services/generate.services";
import type { Message } from "../models/message.model";
export const saveUserPrompt = async (
  email: string,
  message: string,
  newConvo: boolean,
  conversationId: number,
  provider: string,
  modelName: string,

  agentId: number,
): Promise<Message> => {
  const id = await getUserId(email);

  if (!newConvo) {
    // Insert message to existing conversation
    const { data, error } = await supabase
      .from("messages")
      .insert({
        user_id: id,
        sender: "user",
        content: message,
        conversation_id: conversationId,
      })
      .select();

    if (error) {
      throw new Error(error.message);
    }

    // Update conversation's updated_at timestamp
    const { error: convoError } = await supabase
      .from("conversations")
      .update({
        updated_at: new Date().toISOString(),
      })
      .eq("id", conversationId);

    if (convoError) {
      throw new Error(convoError.message);
    }

    return data[0];
  } else {
    const title = await generateResponse(
      provider,
      modelName,
      "Generate me a title according to this first message, only reply in one line that is the title , DO NOT REPLY anything else, here's the first message :" +
        message,

      "",
    );
    const { data: newConvo, error: convoError } = await supabase
      .from("conversations")
      .insert({
        title: title,
        user_id: id,
        agent_id: agentId,
      })
      .select();

    if (convoError || !newConvo || newConvo.length === 0) {
      throw new Error(
        convoError ? convoError.message : "Error Creating Conversation",
      );
    }

    // Insert message using the new conversation ID
    const { data: messageData, error: messageError } = await supabase
      .from("messages")
      .insert({
        user_id: id,
        sender: "user",
        content: message,
        conversation_id: newConvo[0].id,
      })
      .select();

    if (messageError) {
      throw new Error(messageError.message);
    }

    return messageData[0];
  }
};

export const saveAiResponse = async ({
  userId,
  message,
  conversationId,
}: {
  userId: number;
  message: string;
  conversationId: number;
}): Promise<Message> => {
  const { data, error } = await supabase
    .from("messages")
    .insert({
      user_id: userId,
      sender: "Assisstant",
      content: message,
      conversation_id: conversationId,
    })
    .select();
  if (error) {
    throw new Error(error.message);
  }
  return data[0];
};

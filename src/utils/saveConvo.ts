import { supabase } from "./supabase";
import { getUserId } from "./getUserId";
import type { Message } from "../models/message.model";
export const saveUserPrompt = async (
  email: string,
  message: string,
  newConvo: boolean,
  conversationId?: number,
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
    // Create new conversation first
    const { data: newConvo, error: convoError } = await supabase
      .from("conversations")
      .insert({
        title: message,
        user_id: id,
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

import { supabase } from "../utils/supabase";
import { getUserId } from "../utils/getUserId";
import type { Conversation } from "../models/conversation.model";
import type { Message } from "../models/message.model";
export const GetConvos = async (email: string): Promise<Conversation[]> => {
  const id = await getUserId(email);

  const { data: convos, error: convoError } = await supabase
    .from("conversations")
    .select("*")
    .eq("user_id", id)
    .order("updated_at", { ascending: false });

  if (convoError) {
    throw new Error("Failed to fetch conversations");
  }

  return convos || [];
};

export const GetMessages = async (
  conversationId: number,
): Promise<Message[]> => {
  const { data: messages, error } = await supabase
    .from("messages")
    .select("*")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error("Failed to fetch messages");
  }

  return messages || [];
};

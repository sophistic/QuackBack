import { supabase } from "../utils/supabase";
import type { Conversation } from "../models/conversation.model";
import type { Message } from "../models/message.model";
export const GetConvos = async (email: string): Promise<Conversation[]> => {
  // Get user Id
  // Get all convos of user
  // Sort them
  // send back
};

export const GetMessages = async (convoId: number) : Promise<Message[] => {
  // Get Convo Id
  // Get all msges related to that Convo
  // Sort them
  // Send them
};

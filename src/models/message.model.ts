// messages.model.ts
export interface Message {
  id: string;
  created_at: Date;
  user_id: string;
  sender: string;
  content: string;
  conversation_id: string;
}

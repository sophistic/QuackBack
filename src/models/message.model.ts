// messages.model.ts
export interface Message {
  id: number;
  created_at: Date;
  user_id: number;
  sender: string;
  content: string;
  conversation_id: number;
}

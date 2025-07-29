// conversations.model.ts
export interface Conversation {
  id: number;
  created_at: Date;
  title: string;
  user_id: string;
  updated_at: Date;
  agent_id: number;
}

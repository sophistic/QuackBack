// models/agent.model.ts

export interface Agent {
  id: number;
  user_id: number;
  name: string;
  context: string;
  created_at: Date;
}

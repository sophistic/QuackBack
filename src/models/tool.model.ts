// tools.model.ts
export interface Tool {
  id: string;
  created_at: Date;
  user_id: string;
  tool_name: string;
  access_token: string;
  refresh_token: string;
}

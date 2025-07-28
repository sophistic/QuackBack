// api-keys.model.ts
export interface ApiKey {
  id: string;
  created_at: Date;
  user_id: string;
  openai?: string;
  anthropic?: string;
  gemini?: string;
}

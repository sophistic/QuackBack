// api-keys.model.ts
export interface ApiKey {
  id: number;
  created_at: Date;
  provider: string;
  api_key: string;
  active: boolean;
  updated_at: Date;
}

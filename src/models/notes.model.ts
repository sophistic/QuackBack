// notes.model.ts
export interface Note {
  id: string;
  created_at: Date;
  user_id: string;
  user_context: string[];
}

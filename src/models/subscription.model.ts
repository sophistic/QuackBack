// subscriptions.model.ts
export interface Subscription {
  id: string;
  created_at: Date;
  user_id: string;
  premium: boolean;
}

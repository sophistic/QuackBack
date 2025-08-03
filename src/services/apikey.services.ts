import { supabase } from "../utils/supabase";
import type { ApiKey } from "../models/apikey.model";
export const updateApiKeys = async (
  provider: "gemini" | "claude" | "openai",
  apiKey: string,
): Promise<boolean> => {
  const { data, error } = await supabase
    .from("api_keys")
    .upsert({
      provider: provider,
      api_key: apiKey,
    })
    .select();
  if (error) {
    throw new Error(error.message);
  }
  return true;
};

export const retrieveApiKeys = async (provider: string): Promise<ApiKey[]> => {
  const { data, error } = await supabase
    .from("api_keys")
    .select("*")
    .eq("provider", provider);
  // For other errors, throw them
  if (error) {
    throw new Error(error.message);
  }

  // Return the actual data, ensuring empty strings for undefined values
  return data;
};

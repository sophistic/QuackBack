import { supabase } from "../utils/supabase";
import { getUserId } from "../utils/getUserId";
import type { ApiKey } from "../models/apikey.model";
export const updateApiKeys = async (
  email: string,
  openai: string,
  gemini: string,
  anthropic: string,
): Promise<boolean> => {
  const id = await getUserId(email);
  const { data, error } = await supabase
    .from("api_keys")
    .upsert(
      {
        user_id: id,
        openai: openai,
        gemini: gemini,
        anthropic: anthropic,
      },
      { onConflict: "user_id" },
    )
    .select();
  if (error) {
    throw new Error(error.message);
  }
  return true;
};

export const retrieveApiKeys = async (email: string): Promise<ApiKey> => {
  const id = await getUserId(email);
  const { data, error } = await supabase
    .from("api_keys")
    .select("*")
    .eq("user_id", id)
    .single();

  // If error is "no rows found", return empty API keys
  if (error && error.code === "PGRST116") {
    return {
      id: "",
      created_at: new Date(),
      user_id: id,
      openai: "",
      anthropic: "",
      gemini: "",
    };
  }

  // For other errors, throw them
  if (error) {
    throw new Error(error.message);
  }

  // If no data (shouldn't happen with single(), but just in case)
  if (!data) {
    return {
      id: "",
      created_at: new Date(),
      user_id: id,
      openai: "",
      anthropic: "",
      gemini: "",
    };
  }

  // Return the actual data, ensuring empty strings for undefined values
  return {
    id: data.id,
    created_at: data.created_at,
    user_id: data.user_id,
    openai: data.openai || "",
    anthropic: data.anthropic || "",
    gemini: data.gemini || "",
  };
};

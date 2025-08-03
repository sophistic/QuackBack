import { supabase } from "./supabase";

export const getApiKey = async (provider: string): Promise<string> => {
  const { data, error } = await supabase
    .from("api_keys")
    .select("api_key")
    .eq("provider", provider)
    .eq("active", true)
    .limit(1);

  if (error) {
    throw new Error(error.message);
  }

  if (!data || data.length === 0) {
    throw new Error("No active API key found for provider: " + provider);
  }

  return data[0].api_key;
};

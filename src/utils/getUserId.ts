import { supabase } from "./supabase";

export const getUserId = async (email: string): Promise<number> => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();
  if (error || !data) {
    throw new Error(error ? error.message : "User Doesn't Exist");
  }

  return data.id;
};

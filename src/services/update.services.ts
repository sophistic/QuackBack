import { supabase } from "../utils/supabase";

export const UpdateUserName = async (
  email: string,
  name: string,
): Promise<boolean> => {
  const { data, error } = await supabase
    .from("users")
    .update({ name: name })
    .eq("email", email);
  if (error) {
    throw new Error(error.message);
  }
  return true;
};

export const FetchUserName = async (email: string): Promise<string> => {
  const { data, error } = await supabase
    .from("users")
    .select("name")
    .eq("email", email)
    .single();
  if (error) {
    throw new Error(error.message);
  }
  return data.name as string;
};

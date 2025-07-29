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

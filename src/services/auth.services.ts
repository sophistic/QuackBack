import { supabase } from "../utils/supabase";
import bcrypt from "bcrypt";

export const loginUser = async (
  email: string,
  password: string,
): Promise<boolean> => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();
  if (error) {
    throw new Error(error.message);
  }
  if (!data) {
    return false;
  }
  const isPasswordValid = await bcrypt.compare(password, data.password);

  return isPasswordValid;
};

export const signupUser = async (
  email: string,
  password: string,
): Promise<boolean> => {
  const { data: existingUser, error: checkError } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  // If there's an error other than "no rows found", throw it
  if (checkError && checkError.code !== "PGRST116") {
    throw new Error(checkError.message);
  }

  // If user exists, throw error
  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  // Hash the password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Create new user
  const { data: newUser, error: insertError } = await supabase
    .from("users")
    .insert([
      {
        email: email,
        password: hashedPassword,
      },
    ])
    .select();

  if (insertError) {
    throw new Error(insertError.message);
  }

  return true;
};

import { supabase } from "../utils/supabase";
import type { Note } from "../models/notes.model";
import { getUserId } from "../utils/getUserId";
import { generateResponse } from "./generate.services";
export const updateNotes = async (
  email: string,
  notes: string[],
): Promise<boolean> => {
  const id = await getUserId(email);

  const { error } = await supabase
    .from("notes")
    .upsert(
      {
        user_id: id,
        user_context: notes,
      },
      { onConflict: "user_id" },
    );

  if (error) {
    console.error("Update notes error:", error.message);
    return false;
  }

  return true;
};

export const getNotes = async (email: string): Promise<Note | null> => {
  const id = await getUserId(email);

  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .eq("user_id", id)
    .single();

  if (error) {
    console.error("Get notes error:", error.message);
    return null;
  }

  return data as Note;
};

export const newNote = async (
  email: string,
  provider: string,
  modelName: string,
  apiKey: string,
  message: string,
): Promise<any> => {
  const id = await getUserId(email);
  const response = await generateResponse(
    provider,
    modelName,
    "You are a note taker Assisstant , here is the users message if theres anything worth remembering for the user in the long term as chat context please reply only that in ONE SENTENCE.  REPLY AN EMPTY STRING IF NOTHING ELSE IS WORTH REMEMBERING. DO NOT REPLY WITH ANYTHING ELSE. HERE IS THE USER MESSAGE: " +
      message,
    apiKey,
    "",
  );

  const note = String(response)
    .replace(/[`\\n]/g, "")
    .trim();

  if (!note || note === "") {
    console.log("No relevant note to store.");
    return null;
  }



  const newNotesArray = [note];
  const updatedNoteEntry = await updateNotes(email, newNotesArray);
};

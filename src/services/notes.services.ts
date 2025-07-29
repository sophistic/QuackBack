import { supabase } from "../utils/supabase";
import type { Note } from "../models/notes.model";
import { getUserId } from "../utils/getUserId";
import { generateResponse } from "./generate.services";
export const updateNotes = async (
  email: string,
  notes: string[],
): Promise<Note> => {
  const id = await getUserId(email);

  const { data, error } = await supabase
    .from("notes")
    .upsert(
      {
        user_id: id,
        user_context: notes,
      },
      { onConflict: "user_id" },
    )
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as Note;
};

export const getNotes = async (email: string): Promise<Note> => {
  const id = await getUserId(email);
  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .eq("user_id", id)
    .select()
    .single();
  if (error) {
    throw new Error(error.message);
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

  const existingNotes: Note = await getNotes(email);
  const updatedNotes = existingNotes?.user_context || [];

  if (updatedNotes.includes(note)) {
    console.log("Note already exists.");
    return;
  }

  const newNotesArray = [...updatedNotes, note];
  const updatedNoteEntry = await updateNotes(email, newNotesArray);
};

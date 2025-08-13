import { supabase } from "../utils/supabase";
import type { Note } from "../models/notes.model";
import { getUserId } from "../utils/getUserId";
import { generateResponse } from "./generate.services";
export const updateNotes = async (
  email: string,
  notes: string[],
): Promise<boolean> => {
  const id = await getUserId(email);

  const { error } = await supabase.from("notes").upsert(
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
    .maybeSingle();

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

  message: string,
): Promise<any> => {
  const id = await getUserId(email);

  // Step 1: Get current user notes (might be null)
  const currentNoteEntry = await getNotes(email);
  const currentNotes = currentNoteEntry?.user_context ?? [];

  // Step 2: Construct system prompt with current context
  const systemPrompt =
    "You are a note taker assistant. Below is the current context already stored for the user:\n\n" +
    (currentNotes.length ? currentNotes.join("\n- ") : "(No existing notes)") +
    "\n\nHere is the user's new message. If there's anything worth remembering long-term as context, reply with it in ONE SENTENCE. " +
    "REPLY WITH OK , JUST 'OK', IF NOTHING IS WORTH REMEMBERING.\n\nUser Message: " +
    message;

  // Step 3: Generate note using LLM
  const response = await generateResponse(
    provider,
    modelName,
    systemPrompt,
    "",
  );

  const note = String(response)
    .replace(/[`\\n]/g, "")
    .trim();

  if (!note || note === "") {
    console.log("No relevant note to store.");
    return null;
  }

  // Step 4: Append if not already present
  const updatedNotes = currentNotes.includes(note)
    ? currentNotes
    : [...currentNotes, note];

  const updateSuccess = await updateNotes(email, updatedNotes);
  return updateSuccess ? { message: true, note } : { message: false };
};

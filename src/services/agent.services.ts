import { supabase } from "../utils/supabase";

import { generateResponse } from "./generate.services";
import { getUserId } from "../utils/getUserId";
import type { Agent } from "../models/agent.model";
export const createAgent = async (
  email: string,
  agentName: string,
  agentTask: string,
  provider: string,
  modelName: string,
): Promise<Agent> => {
  const id = await getUserId(email);
  const result = await generateResponse(
    provider,
    modelName,
    "Create me a system prompt for an agent. ONLY REPLY THE SYSTEM PROMPT, NO NEED TO GIVE ANY OTHER DETAIL , JUST THE SYSTEM PROMPT FOR THE AGENT. The agent is  named:" +
      agentName +
      "whose task is :" +
      agentTask +
      "ONLY REPLY THE SYSTEM PROMPT, NO NEED TO GIVE ANY OTHER DETAIL , JUST THE SYSTEM PROMPT FOR THE AGENT IS ENOUGH. DO NOT SAY ANY EXTRA LINE OR SENTENCE LIKE Okay, here's a system prompt for an agent named. JUST REPLY THE SYSTEM PROMPT. ",

    "",
  );
  const { data, error } = await supabase
    .from("agents")
    .insert({ name: agentName, context: result, user_id: id })
    .select()
    .single();
  if (error) {
    throw new Error(error.message);
  }
  return data as Agent;
};

export const fetchAgent = async (email: string): Promise<Agent[]> => {
  const id = await getUserId(email);
  const { data, error } = await supabase
    .from("agents")
    .select("*")
    .eq("user_id", id);

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const deleteAgent = async (agentId: number): Promise<boolean> => {
  const { error } = await supabase.from("agents").delete().eq("id", agentId);
  if (error) {
    throw new Error(error.message);
  }
  return true;
};

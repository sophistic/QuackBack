import { generateGeminiResponse } from "../utils/geminiHandler";
import { generateOpenAIResponse } from "../utils/openaiHandler";
import { generateClaudeResponse } from "../utils/claudeHandler";
import { getApiKey } from "../utils/getApiKey";
export const generateResponse = async (
  provider: string,
  modelName: string,
  message: string,
  messageHistory = "",
  notes = [""],
  agentContext = "",
): Promise<string> => {
  const apiKey = await getApiKey(provider);
  if (!apiKey || apiKey.trim().length == 0) {
    throw new Error("No api key exists for selected provider");
  }
  if (!message.trim()) {
    throw new Error("Message cannot be empty");
  }
  let fullPrompt = "Answer in Concise manner.";
  fullPrompt += agentContext;
  if (notes && notes.length > 0) {
    const formattedNotes = `User context:\n${notes.map((note) => `- ${note}`).join("\n")}\n\n`;
    fullPrompt += formattedNotes;
  }

  fullPrompt += messageHistory
    ? `${messageHistory}\n\nUser: ${message}`
    : message;
  const providerLower = provider.toLowerCase();

  switch (providerLower) {
    case "gemini":
      return await generateGeminiResponse(apiKey, modelName, fullPrompt);

    case "claude":
    case "anthropic":
      return await generateClaudeResponse(apiKey, modelName, fullPrompt);

    case "openai":
      return await generateOpenAIResponse(apiKey, modelName, fullPrompt);

    default:
      throw new Error(
        `Unsupported provider: ${provider}. Supported providers are: gemini, claude, openai`,
      );
  }
};

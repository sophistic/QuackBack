import { generateGeminiResponse } from "../utils/geminiHandler";
import { generateOpenAIResponse } from "../utils/openaiHandler";
import { generateClaudeResponse } from "../utils/claudeHandler";
export const generateResponse = async (
  provider: string,
  modelName: string,
  message: string,
  apiKey: string,
  messageHistory: string,
): Promise<string> => {
  if (!apiKey) {
    throw new Error(`API key is required for ${provider}`);
  }

  if (!message.trim()) {
    throw new Error("Message cannot be empty");
  }
  const fullPrompt = messageHistory
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

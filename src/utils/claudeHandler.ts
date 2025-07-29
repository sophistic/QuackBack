export const generateClaudeResponse = async (
  apiKey: string,
  modelName: string,
  message: string,
): Promise<string> => {
  if (!apiKey) {
    throw new Error("Claude API key is required");
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: modelName,
        max_tokens: 1024,
        messages: [
          {
            role: "user",
            content: message,
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(
        `Claude API error: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();

    if (!data.content || !data.content.length) {
      throw new Error("Invalid response format from Claude API");
    }

    // Combine all content blocks into a single response
    return data.content.map((block: any) => block.text).join("");
  } catch (error: any) {
    throw new Error(`Claude generation failed: ${error.message}`);
  }
};

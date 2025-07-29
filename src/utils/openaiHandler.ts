export const generateOpenAIResponse = async (
  apiKey: string,
  modelName: string,
  message: string,
): Promise<string> => {
  if (!apiKey) {
    throw new Error("OpenAI API key is required");
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: modelName,
        messages: [
          {
            role: "user",
            content: message,
          },
        ],
        max_tokens: 1024,
      }),
    });

    if (!response.ok) {
      throw new Error(
        `OpenAI API error: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error("Invalid response format from OpenAI API");
    }

    return data.choices[0].message.content;
  } catch (error: any) {
    throw new Error(`OpenAI generation failed: ${error.message}`);
  }
};

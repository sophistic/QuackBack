export const generateGeminiResponse = async (
  apiKey: string,
  modelName: string,
  fullPrompt: string,
): Promise<string> => {
  if (!apiKey) {
    throw new Error("Gemini API key is required");
  }

  if (!fullPrompt.trim()) {
    throw new Error("Prompt cannot be empty");
  }

  console.log("Api key:", apiKey);
  console.log("modelName:", modelName);

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: fullPrompt,
                },
              ],
            },
          ],
        }),
      },
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(
        `Gemini API error: ${response.status} ${response.statusText}${errorData ? ` - ${JSON.stringify(errorData)}` : ""}`,
      );
    }

    const data = await response.json();

    if (
      !data.candidates ||
      !data.candidates[0] ||
      !data.candidates[0].content
    ) {
      throw new Error("Invalid response format from Gemini API");
    }

    // Combine all parts into a single response
    const parts = data.candidates[0].content.parts;
    return parts.map((part: any) => part.text).join("");
  } catch (error: any) {
    throw new Error(`Gemini generation failed: ${error.message}`);
  }
};

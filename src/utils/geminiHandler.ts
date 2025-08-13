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

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: fullPrompt }],
            },
          ],
        }),
      },
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(
        `Gemini API error: ${response.status} ${response.statusText}${
          errorData ? ` - ${JSON.stringify(errorData)}` : ""
        }`,
      );
    }

    const data = await response.json();

    const textOutput =
      data?.candidates?.[0]?.content?.parts
        ?.map((p: any) => p?.text ?? "")
        .join("")
        .trim() ||
      data?.candidates?.[0]?.content?.text || // fallback if text is directly on content
      "";

    if (!textOutput) {
      throw new Error(
        `Gemini returned no usable text. Raw data: ${JSON.stringify(data)}`,
      );
    }

    return textOutput;
  } catch (error: any) {
    throw new Error(`Gemini generation failed: ${error.message}`);
  }
};

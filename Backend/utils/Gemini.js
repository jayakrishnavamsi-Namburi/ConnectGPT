import "dotenv/config";

const getGeminiAPIResponse = async (message) => {
  const API_KEY = process.env.GEMINI_API_KEY;
  const ENDPOINT =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

  if (!API_KEY) {
    throw new Error("❌ No API key found. Did you set GEMINI_API_KEY in .env?");
  }

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: message }],
        },
      ],
    }),
  };

  try {
    const response = await fetch(`${ENDPOINT}?key=${API_KEY}`, options);
    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message);
    }

    return data.candidates[0].content.parts[0].text; // ✅ Gemini reply
  } catch (err) {
    console.error("❌ Gemini API call failed:", err.message);
    return null;
  }
};

export default getGeminiAPIResponse;

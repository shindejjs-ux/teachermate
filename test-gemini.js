import "dotenv/config";
import { GoogleGenAI } from "@google/genai";
console.log("GEMINI_API_KEY =", process.env.GEMINI_API_KEY);
console.log("Length =", process.env.GEMINI_API_KEY?.length);

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: "Say Hello",
  });

  console.log(response.text);
}

main().catch(console.error);
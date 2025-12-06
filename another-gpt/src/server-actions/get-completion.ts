"use server";

import DeepSeekAI from "openai";
import { GoogleGenAI } from "@google/genai";

const fakeApiCall = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Capital of Egypt is Cairo");
    }, 800);
  });
};

const deepSeekAi = new DeepSeekAI({
  baseURL: "https://api.deepseek.com",
  apiKey: process.env.DEEPSEEK_API_KEY!,
});

const geminiAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const getCompletion = async (
  prompt: string
): Promise<{ role: "system"; content: string }> => {
  const response = await geminiAI.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return {
    role: "system",
    content: response.text || "",
  };
};

// export const getCompletion = async (
//   messageHistory: {
//     role: "user" | "system";
//     content: string;
//   }[]
// ) => {
//   try {
//     // const response = await deepSeekAi.chat.completions.create({
//     //   model: "deepseek-chat-0324:free",
//     //   messages: messageHistory,
//     // });

//     // const messages = [
//     //   ...messageHistory,
//     //   response.choices[0].message as unknown as {
//     //     role: "user" | "system";
//     //     content: string;
//     //   },
//     // ];

//     const response = await fakeApiCall();

//     const messages = [
//       ...messageHistory,
//       {
//         role: "system",
//         content: response,
//       },
//     ];

//     return {
//       messages,
//     };
//   } catch (error: any) {
//     console.error("@@ ERROR ON AI: >>> ", error.message);
//     return { messages: [error.message] };
//   }
// };

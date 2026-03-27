import { OpenAI } from "openai";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const openai = new OpenAI({
  apiKey: "sk-4bd27113b7dc78d1-lh6jld-f4f9c69f",
  baseURL: "https://9router.vuhai.io.vn/v1",
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Read context from chatbot_data.txt
    const filePath = path.join(process.cwd(), "chatbot_data.txt");
    const chatbotInfo = fs.readFileSync(filePath, "utf-8");

    const systemPrompt = `Bạn là một trợ lý AI đại diện cho Wise MC. Hãy sử dụng thông tin sau để trả lời khách hàng:
${chatbotInfo}

Hãy luôn giữ thái độ chuyên nghiệp, thân thiện và sẵn sàng hỗ trợ.`;

    const response = await openai.chat.completions.create({
      model: "ces-chatbot-gpt-5.4",
      messages: [
        { role: "system", content: systemPrompt },
        ...messages,
      ],
      stream: false, // Start with non-streaming for simplicity
    });

    return NextResponse.json(response.choices[0].message);
  } catch (error: any) {
    console.error("Chat API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

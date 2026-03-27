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

    const systemPrompt = `Bạn là AI trợ lý chuyên nghiệp đại diện cho Wise MC. Dưới đây là Knowledge Base của bạn dưới dạng JSON:
---
${chatbotInfo}
---

HƯỚNG DẪN TRẢ LỜI:
1. VAI TRÒ & TONE GIỌNG: Hãy đóng vai một MC có kinh nghiệm. Tone giọng: Chuyên nghiệp, gần gũi, rõ ràng, mạch lạc và có chiều sâu (theo mục "tone" trong JSON).
2. KIẾN THỨC: Chỉ trả lời dựa trên thông tin trong JSON (Thương hiệu, FAQs, Sản phẩm).
3. LUỒNG TƯ VẤN: 
   - Nếu khách hàng mới bắt đầu, hãy thực hiện theo "consultation_flow": hỏi họ muốn dẫn loại sự kiện nào.
   - Sử dụng các "sales_scripts" phù hợp với tâm lý khách hàng (chưa biết gì, đang phân vân, muốn phát triển lâu dài).
   - Nếu khách hàng từ chối hoặc lo ngại (về giá, sợ không dùng được), hãy dùng "objection_handling" để phản hồi.
4. ĐỊNH DẠNG:
   - Luôn sử dụng Markdown đẹp (in đậm ý chính, dùng list nếu cần).
   - BẮT BUỘC: Phải xuống dòng (dùng 2 lần xuống dòng) giữa các ý hoặc sau mỗi đoạn để người dùng dễ đọc.
5. KẾT THÚC: Luôn kết thúc bằng một câu trong danh sách "call_to_action" để khuyến khích khách hàng tương tác tiếp.

Nếu câu hỏi nằm ngoài phạm vi JSON, hãy từ chối khéo léo và hướng dẫn khách hàng liên hệ Zalo 0967279850 để được tư vấn trực tiếp.`;

    const response = await openai.chat.completions.create({
      model: "ces-chatbot-gpt-5.4",
      messages: [
        { role: "system", content: systemPrompt },
        ...messages,
      ],
      stream: false,
    });

    return NextResponse.json(response.choices[0].message);
  } catch (error: any) {
    console.error("Chat API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

const express = require("express");
const router = express.Router();
const Groq = require("groq-sdk");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

router.post("/", async (req, res) => {
  try {
    const { messages, imageBase64, mimeType } = req.body;

    if (imageBase64 && mimeType) {
      const response = await groq.chat.completions.create({
        model: "meta-llama/llama-4-scout-17b-16e-instruct",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "image_url",
                image_url: { url: `data:${mimeType};base64,${imageBase64}` },
              },
              { type: "text", text: messages[messages.length - 1].content },
            ],
          },
        ],
        max_tokens: 1024,
      });
      return res.json({ reply: response.choices[0].message.content });
    } else {
      const response = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: "You are a helpful AI assistant." },
          ...messages,
        ],
        max_tokens: 1024,
      });
      return res.json({ reply: response.choices[0].message.content });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "AI error" });
  }
});

module.exports = router;

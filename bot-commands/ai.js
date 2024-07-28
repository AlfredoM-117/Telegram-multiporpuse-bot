import { GoogleGenerativeAI } from "@google/generative-ai"

const apiKey = process.env.GEM_AI_TOKEN
const genAI = new GoogleGenerativeAI(apiKey)

async function ai(bot, msg) {
  const chatId = msg.chat.id
  const query = msg.text.replace("/ai ", "")
  if (query) {
    try {
      const checkingMessage = await bot.sendMessage(
        chatId,
        "We are checking...💬"
      )
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
      })

      const generationConfig = {
        temperature: 1,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 8192,
        responseMimeType: "text/plain",
      }

      const chatSession = model.startChat({
        generationConfig,
        // safetySettings: Adjust safety settings
        // See https://ai.google.dev/gemini-api/docs/safety-settings
        history: [],
      })

      const result = await chatSession.sendMessage(query)
      const response = result.response.text()
      const responseParsed = response
        .replace(/_/g, (match) => {
          return "\\" + match
        })
        .replace(/\|/g, (match) => {
          return "\\" + match
        })
        .replace(/\!/g, (match) => {
          return "\\" + match
        })
        .replace(/(?<!\*)\*(?!\s*\*)/g, (match) => {
          return "\\" + match
        })
      await bot.deleteMessage(chatId, checkingMessage.message_id)
      bot.sendMessage(chatId, responseParsed, {
        parse_mode: "Markdown",
      })
    } catch (e) {
      bot.sendMessage(chatId, "Error: " + e)
      console.log(e)
    }
  }
}

export default ai

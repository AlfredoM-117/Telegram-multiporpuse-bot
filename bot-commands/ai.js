import OpenAI from "openai"

const aiToken = process.env.AI_TOKEN
const openai = new OpenAI({
  apiKey: aiToken,
  baseURL: "https://integrate.api.nvidia.com/v1",
})

async function ai(bot, msg) {
  const chatId = msg.chat.id
  const text = msg.text
  if (text) {
    try {
      const checkingMessage = await bot.sendMessage(
        chatId,
        "We are checking...💬"
      )
      const completion = await openai.chat.completions.create({
        model: "meta/llama3-8b-instruct",
        messages: [{ role: "user", content: text }],
        temperature: 0.5,
        top_p: 1,
        max_tokens: 1024,
        stream: true,
      })
      const respuesta = []
      for await (const chunk of completion) {
        respuesta.push(chunk.choices[0]?.delta?.content || "")
      }
      const resultado = respuesta.join("")
      await bot.deleteMessage(chatId, checkingMessage.message_id)
      bot.sendMessage(chatId, resultado, {
        parse_mode: "Markdown",
      })
    } catch (e) {
      bot.sendMessage(chatId, "Error: " + e)
      console.log(e)
    }
  }
}

export default ai

//-----------------------Celcius to Farenheit -----------------------

function cf(bot, msg, match) {
  const chatId = msg.chat.id
  const languageCode = msg.from.language_code
  const conversionText = languageCode === "es" ? "Conversión" : "Conversion"

  const stringFixed = match[1].replace(/,/g, ".")
  let amount = parseFloat(stringFixed)

  const conversion = (amount * 9) / 5 + 32
  const result = conversion.toString().replace(".", ",")
  amount = amount.toString().replace(".", ",")

  bot.sendChatAction(chatId, "typing")
  bot.sendMessage(
    chatId,
    "🌡     *" +
      conversionText +
      "     🌡\n\n Celcius => Farenheit\n\n" +
      amount +
      " °C => " +
      result +
      " °F*",
    {
      parse_mode: "Markdown",
    }
  )
}

//-----------------------Farenheit to Celcius -----------------------

function fc(bot, msg, match) {
  const chatId = msg.chat.id
  const languageCode = msg.from.language_code
  const conversionText = languageCode === "es" ? "Conversión" : "Conversion"

  const stringFixed = match[1].replace(/,/g, ".")
  let amount = parseFloat(stringFixed)

  const conversion = ((amount - 32) * 5) / 9
  const result = conversion.toString().replace(".", ",")
  amount = amount.toString().replace(".", ",")

  bot.sendChatAction(chatId, "typing")
  bot.sendMessage(
    chatId,
    "🌡     *" +
      conversionText +
      "    🌡\n\n Farenheit => Celcius\n\n" +
      amount +
      " °F => " +
      result +
      " °C*",
    {
      parse_mode: "Markdown",
    }
  )
}

export { cf, fc }

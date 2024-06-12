//-----------------------Pounds to Kilograms -----------------------
function lbkg(bot, msg, match) {
  const chatId = msg.chat.id
  const languageCode = msg.from.language_code
  const conversionText = languageCode === "es" ? "Conversión" : "Conversion"
  const pondsToKgText =
    languageCode === "es" ? "Libras => Kilogramos" : "Pounds => Kilograms"

  const stringFixed = match[1].replace(/,/g, ".")
  let amount = parseFloat(stringFixed)

  const conversion = amount * 0.453592
  const rounded = conversion.toFixed(2)
  const result = rounded.toString().replace(".", ",")
  amount = amount.toString().replace(".", ",")

  bot.sendChatAction(chatId, "typing")
  bot.sendMessage(
    chatId,
    "⚖️   *" +
      conversionText +
      "   ⚖️\n\n " +
      pondsToKgText +
      " \n\n" +
      amount +
      " lbs => kgs " +
      result +
      "*",
    {
      parse_mode: "Markdown",
    }
  )
}
//-----------------------Kilograms to Pounds -----------------------
function kglb(bot, msg, match) {
  const chatId = msg.chat.id
  const languageCode = msg.from.language_code
  const conversionText = languageCode === "es" ? "Conversión" : "Conversion"
  const kgToPoundsText =
    languageCode === "es" ? "Kilogramos => Libras" : "Kilograms => Pounds"

  const stringFixed = match[1].replace(/,/g, ".")
  let amount = parseFloat(stringFixed)

  const conversion = amount * 2.20462
  const rounded = conversion.toFixed(2)
  const result = rounded.toString().replace(".", ",")
  amount = amount.toString().replace(".", ",")

  bot.sendChatAction(chatId, "typing")
  bot.sendMessage(
    chatId,
    "⚖️     *" +
      conversionText +
      "    ⚖️\n\n " +
      kgToPoundsText +
      "\n\n" +
      amount +
      " kgs => " +
      result +
      " lbs*",
    {
      parse_mode: "Markdown",
    }
  )
}

export { lbkg, kglb }

// ------------------- Meters to Feet -----------------------

function mtof(bot, msg, match) {
  const chatId = msg.chat.id
  const languageCode = msg.from.language_code
  const conversionText = languageCode === "es" ? "Conversión" : "Conversion"
  const mtToFtText = languageCode === "es" ? "Metros => Pies" : "Meters => Feet"

  const stringFixed = match[1].replace(/,/g, ".")
  let amount = parseFloat(stringFixed)

  const conversion = amount * 3.28084
  const result = conversion.toString().replace(".", ",")
  amount = amount.toString().replace(".", ",")

  bot.sendChatAction(chatId, "typing")
  bot.sendMessage(
    chatId,
    "📏     *" +
      conversionText +
      "    📏\n\n " +
      mtToFtText +
      "\
      \n" +
      amount +
      " m => " +
      result +
      " ft*",
    {
      parse_mode: "Markdown",
    }
  )
}

// ------------------- Feet to Meters -----------------------
function ftom(bot, msg, match) {
  const chatId = msg.chat.id
  const languageCode = msg.from.language_code
  const conversionText = languageCode === "es" ? "Conversión" : "Conversion"
  const ftToMtText = languageCode === "es" ? "Pies => Metros" : "Meters => Feet"

  const stringFixed = match[1].replace(/,/g, ".")
  let amount = parseFloat(stringFixed)

  const conversion = amount / 3.28084
  const result = conversion.toString().replace(".", ",")
  amount = amount.toString().replace(".", ",")

  bot.sendChatAction(chatId, "typing")
  bot.sendMessage(
    chatId,
    "📏     *" +
      conversionText +
      "     📏\n\n " +
      ftToMtText +
      "\n" +
      amount +
      " ft => " +
      result +
      " m*",
    {
      parse_mode: "Markdown",
    }
  )
}

// ------------------- Inches to cm -------------------

function incm(bot, msg, match) {
  const chatId = msg.chat.id
  const languageCode = msg.from.language_code
  const conversionText = languageCode === "es" ? "Conversión" : "Conversion"
  const inCmText =
    languageCode === "es" ? "Pulgadas => Centímetros" : "Inches => Centimeters"

  const stringFixed = match[1].replace(/,/g, ".")
  let amount = parseFloat(stringFixed)

  const conversion = amount * 2.54

  const result = conversion.toString().replace(".", ",")
  amount = amount.toString().replace(".", ",")

  bot.sendChatAction(chatId, "typing")
  bot.sendMessage(
    chatId,
    "📏     *" +
      conversionText +
      "     📏\n\n " +
      inCmText +
      " \n" +
      amount +
      " in => " +
      result +
      " cm*",
    {
      parse_mode: "Markdown",
    }
  )
}

// ------------------- Cm to inches -------------------

function cmin(bot, msg, match) {
  const chatId = msg.chat.id
  const languageCode = msg.from.language_code
  const conversionText = languageCode === "es" ? "Conversión" : "Conversion"
  const cmImText =
    languageCode === "es" ? "Centímetros => Pulgadas" : "Centimeters => Inches"

  const stringFixed = match[1].replace(/,/g, ".")
  let amount = parseFloat(stringFixed)

  const conversion = amount / 2.54
  const result = conversion.toString().replace(".", ",")
  amount = amount.toString().replace(".", ",")

  bot.sendChatAction(chatId, "typing")
  bot.sendMessage(
    chatId,
    "📏     *" +
      conversionText +
      "    📏\n\n " +
      cmImText +
      "\n" +
      amount +
      " cm => " +
      result +
      " in*",
    {
      parse_mode: "Markdown",
    }
  )
}

// ------------------- Meters to Feet/Inches -----------------------

function mfstature(bot, msg, match) {
  const chatId = msg.chat.id
  const languageCode = msg.from.language_code
  const conversionText = languageCode === "es" ? "Conversión" : "Conversion"
  const mToF =
    languageCode === "es" ? "Metros => Pies/Pulgadas" : "Meters => Feet/Inches"

  const stringFixed = match[1].replace(/,/g, ".")
  let amount = parseFloat(stringFixed)

  const feet = amount * 3.2808399
  const feetRounded = Math.floor(feet)
  const inches = Math.round((feet - feetRounded) * 12)

  const amountFormatted = amount.toFixed(2).replace(".", ",")
  const result = `${feetRounded}' ${inches}"`

  bot.sendChatAction(chatId, "typing")
  bot.sendMessage(
    chatId,
    `📏 *${conversionText}* 📏\n\n ${mToF} \n\n${amountFormatted} m => ${result} ft in`,
    {
      parse_mode: "Markdown",
    }
  )
}

// ------------------- Feet/Inches to Meters -----------------------

function fmstature(bot, msg, match) {
  const chatId = msg.chat.id
  const languageCode = msg.from.language_code
  const conversionText = languageCode === "es" ? "Conversión" : "Conversion"
  const ftToMText =
    languageCode === "es" ? "Pies/Pulgadas => Metros" : "Feet/Inches => Meters"

  const [feet, inches] = match[1].split("'")

  const totalInches = parseFloat(feet) * 12 + parseFloat(inches)
  const meters = totalInches / 39.3701

  const amountFormatted = meters.toFixed(2).replace(".", ",")

  bot.sendChatAction(chatId, "typing")
  bot.sendMessage(
    chatId,
    `📏     *${conversionText}*    📏\n\n ${ftToMText}\n\n ${match[1]} ft in => ${amountFormatted} m`,
    {
      parse_mode: "Markdown",
    }
  )
}

// ------------------- Kilometers to Miles -----------------------

function kmmi(bot, msg, match) {
  const chatId = msg.chat.id
  const languageCode = msg.from.language_code
  const conversionText = languageCode === "es" ? "Conversión" : "Conversion"
  const kmToMiText =
    languageCode === "es" ? "Kilómetros => Millas" : "Kilometers => Miles"

  const stringFixed = match[1].replace(/,/g, ".")
  let amount = parseFloat(stringFixed)

  const conversion = amount * 0.621371
  const rounded = conversion.toFixed(2)
  const result = rounded.toString().replace(".", ",")
  amount = amount.toString().replace(".", ",")

  bot.sendChatAction(chatId, "typing")
  bot.sendMessage(
    chatId,
    "📏     *" +
      conversionText +
      "    📏\n\n " +
      kmToMiText +
      "\n\n" +
      amount +
      " km => " +
      result +
      " mi*",
    {
      parse_mode: "Markdown",
    }
  )
}

// ------------------- Miles to Kilometers -----------------------
function mikm(bot, msg, match) {
  const chatId = msg.chat.id
  const languageCode = msg.from.language_code
  const conversionText = languageCode === "es" ? "Conversión" : "Conversion"
  const miToKmText =
    languageCode === "es" ? "Millas => Kilómetros" : "Miles => Kilometers"

  const stringFixed = match[1].replace(/,/g, ".")
  let amount = parseFloat(stringFixed)

  const conversion = amount * 1.60934
  const rounded = conversion.toFixed(2)
  const result = rounded.toString().replace(".", ",")
  amount = amount.toString().replace(".", ",")

  bot.sendChatAction(chatId, "typing")
  bot.sendMessage(
    chatId,
    "📏     *" +
      conversionText +
      "      📏\n\n " +
      miToKmText +
      "\n\n" +
      amount +
      " mi => " +
      result +
      " km*",
    {
      parse_mode: "Markdown",
    }
  )
}

export { mtof, ftom, incm, cmin, mfstature, fmstature, kmmi, mikm }

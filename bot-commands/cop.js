import cheerio from "cheerio"
import moment from "moment-timezone"
import schedule from "node-schedule"

const bvcurl =
  "https://www.larepublica.co/indicadores-economicos/mercado-cambiario/dolar"
async function getTrm() {
  try {
    const response = await fetch(bvcurl)
    const body = await response.text()
    const $ = cheerio.load(body)
    const spanContent = []
    const elemento = $("span[class='price']")
    elemento.each(function (i, elem) {
      spanContent[i] = $(this).text()
    })
    const USD = spanContent[0]
      .replace("$ ", "")
      .replace(",", ".")
      .replace(".", "")

    return USD
  } catch (error) {
    bot.sendMessage(chatId, "Error: " + error)
    console.log(error)
  }
}

//---------------- BVC COP Exchange Rate --------------------------------
async function cop(bot, msg) {
  const chatId = msg.chat.id
  const checkingMessage = await bot.sendMessage(chatId, "...💬")
  try {
    const USD = await getTrm()

    bot.sendChatAction(chatId, "typing")
    const replyMarkup = {
      inline_keyboard: [[{ text: "TRM 🔗", url: bvcurl }]],
    }

    await bot.deleteMessage(chatId, checkingMessage.message_id)

    bot.sendMessage(
      chatId,
      "🟢     🇨🇴 *TRM*  🇨🇴     🟢\n\n🇺🇸  *USD $1 = COP " + USD + "*",
      {
        reply_markup: JSON.stringify(replyMarkup),
        parse_mode: "Markdown",
      }
    )
  } catch (error) {
    await bot.deleteMessage(chatId, checkingMessage.message_id)
    bot.sendMessage(chatId, "Error: " + error)
    console.log(error)
  }
}

async function copusd(bot, msg, match) {
  const chatId = msg.chat.id
  const languageCode = msg.from.language_code
  const conversionText = languageCode === "es" ? "Conversión" : "Conversion"
  const checkingMessage = await bot.sendMessage(chatId, "... 💬")

  const stringFixed = match[1].replace(/,/g, ".")
  let amount = parseFloat(stringFixed)
  try {
    const usdString = await getTrm()
    const USD = parseFloat(usdString)

    const conversion = amount / USD
    const rounded = conversion.toFixed(2)
    const result = rounded.toString().replace(".", ",")
    amount = amount.toString().replace(".", ",")
    const rate = USD.toString().replace(".", ",")
    bot.sendChatAction(chatId, "typing")

    await bot.deleteMessage(chatId, checkingMessage.message_id)
    bot.sendMessage(
      chatId,
      "🇨🇴  =  *" +
        conversionText +
        "  =>  🇺🇸\n\n TRM\n COP " +
        rate +
        " => $1 USD\n\n COP " +
        amount +
        " => $" +
        result +
        " USD*",
      {
        parse_mode: "Markdown",
      }
    )
  } catch (error) {
    await bot.deleteMessage(chatId, checkingMessage.message_id)
    bot.sendMessage(chatId, "Error: " + error)
    console.log("Error:", error)
  }
}

//------------------------Convert USD to COP--------------------------------
async function usdcop(bot, msg, match) {
  const chatId = msg.chat.id
  const languageCode = msg.from.language_code
  const conversionText = languageCode === "es" ? "Conversión" : "Conversion"
  const checkingMessage = await bot.sendMessage(chatId, "... 💬")
  const stringFixed = match[1].replace(/,/g, ".")
  let amount = parseFloat(stringFixed)
  try {
    const usdString = await getTrm()
    const USD = parseFloat(usdString)

    const conversion = amount * USD
    const rounded = conversion.toFixed(2)
    const result = rounded.toString().replace(".", ",")
    amount = amount.toString().replace(".", ",")
    const rate = USD.toString().replace(".", ",")
    bot.sendChatAction(chatId, "typing")

    await bot.deleteMessage(chatId, checkingMessage.message_id)
    bot.sendMessage(
      chatId,
      "🇺🇸  =  *" +
        conversionText +
        "  =>  🇨🇴\n\n TRM\n $1 USD => COP " +
        rate +
        "\n\n $" +
        amount +
        " USD => COP " +
        result +
        "*",

      {
        parse_mode: "Markdown",
      }
    )
  } catch (error) {
    await bot.deleteMessage(chatId, checkingMessage.message_id)
    bot.sendMessage(chatId, "Error: " + error)
    console.log("Error", error)
  }
}

//------------------------Daily Alert BVC COP--------------------------------
async function copAlert(bot, msg) {
  const chatId = msg.chat.id
  const languageCode = msg.from.language_code
  const activationMessage =
    languageCode === "es"
      ? "⏰ Alerta diaria activada ✅"
      : "⏰ Daily alert activate ✅"

  schedule.scheduledJobs[chatId] && schedule.scheduledJobs[chatId].cancel()

  const reminderTime = moment().tz(moment.tz.guess()).set({
    hour: 9,
    minute: 0,
    second: 0,
    millisecond: 0,
  })

  const alertBvcJob = schedule.scheduleJob(reminderTime.toDate(), async () => {
    const checkingMessage = await bot.sendMessage(chatId, "...💬")

    try {
      const USD = await getTrm()

      const replyMarkup = {
        inline_keyboard: [[{ text: "TRM 🔗", url: bvcurl }]],
      }

      bot.sendChatAction(chatId, "typing")

      await bot.deleteMessage(chatId, checkingMessage.message_id)

      bot.sendMessage(
        chatId,
        "🟢     🇨🇴 *TRM*  🇨🇴     🟢\n\n🇺🇸  *USD $1 = COP " + USD + "*",
        {
          reply_markup: JSON.stringify(replyMarkup),
          parse_mode: "Markdown",
        }
      )
    } catch (error) {
      await bot.deleteMessage(chatId, checkingMessage.message_id)
      bot.sendMessage(chatId, "Error: " + error)
      console.log(error)
    }
  })
  bot.sendMessage(chatId, activationMessage)
}

export { cop, copusd, usdcop, copAlert }

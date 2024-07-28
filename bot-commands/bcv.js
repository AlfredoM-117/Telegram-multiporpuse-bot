import { extract } from "@extractus/article-extractor"
import schedule from "node-schedule"
import moment from "moment-timezone"

const bcvurl = "https://www.bcv.org.ve/"
const ratesRegex = /<strong>([\s+\d,.]+)<\/strong>/g

//------------------------Get BCV exchange rates--------------------------------
async function getBcv() {
  try {
    const { content } = await extract(bcvurl)
    const ratesMatch = content.match(ratesRegex)
    const rates = ratesMatch.map((match) => {
      const result = match
        .replace(/<strong>|<\/strong>/g, "")
        .replace(/,/, ".")
        .trim()

      return parseFloat(result)
    })
    return rates
  } catch (error) {
    bot.sendMessage(chatId, "Error: " + error)
    console.log(error)
  }
}

//------------------------BCV command--------------------------------
async function bcv(bot, msg) {
  const chatId = msg.chat.id

  const checkingMessage = await bot.sendMessage(chatId, "...💬")
  try {
    const values = await getBcv()
    const [EUR, CNY, TRY, RUB, USD] = values
    bot.sendChatAction(chatId, "typing")

    const replyMarkup = {
      inline_keyboard: [[{ text: "BCV 🔗", url: bcvurl }]],
    }

    bot.deleteMessage(chatId, checkingMessage.message_id)

    bot.sendMessage(
      chatId,
      "🟢     🇻🇪 _BCV_  🇻🇪     🟢\n\n🇺🇸  _Dolar:_ Bs.*" +
        USD +
        "*\n\n🇪🇺  _Euro:_ Bs.*" +
        EUR +
        "*",
      {
        reply_markup: JSON.stringify(replyMarkup),
        parse_mode: "Markdown",
      }
    )
  } catch (error) {
    bot.sendMessage(chatId, "Error: " + error)
    bot.deleteMessage(chatId, checkingMessage.message_id)

    console.log(error)
  }
}

//------------------------Convert BS to USD--------------------------------

async function bsusd(bot, msg, match) {
  const chatId = msg.chat.id
  const languageCode = msg.from.language_code
  const conversionText = languageCode === "es" ? "Conversión" : "Conversion"
  const checkingMessage = await bot.sendMessage(chatId, "...💬")

  const stringFixed = match[1].replace(/,/g, ".")
  let amount = parseFloat(stringFixed)
  try {
    const values = await getBcv()
    const [EUR, CNY, TRY, RUB, USD] = values
    bot.sendChatAction(chatId, "typing")

    const conversion = amount / USD
    const rounded = conversion.toFixed(2)
    const result = rounded.toString().replace(".", ",")
    amount = amount.toString().replace(".", ",")
    const rate = USD.toString().replace(".", ",")

    await bot.deleteMessage(chatId, checkingMessage.message_id)
    bot.sendMessage(
      chatId,
      "🇻🇪  =  *" +
        conversionText +
        "*  =>  🇺🇸\n\n *BCV\n* *Bs." +
        rate +
        " => $1 \n\n Bs." +
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

//------------------------Convert USD to BS--------------------------------
async function usdbs(bot, msg, match) {
  const chatId = msg.chat.id
  const languageCode = msg.from.language_code
  const conversionText = languageCode === "es" ? "Conversión" : "Conversion"
  const checkingMessage = await bot.sendMessage(chatId, "...💬")

  const stringFixed = match[1].replace(/,/g, ".")
  let amount = parseFloat(stringFixed)
  try {
    const values = await getBcv()
    const [EUR, CNY, TRY, RUB, USD] = values
    bot.sendChatAction(chatId, "typing")

    const conversion = amount * USD
    const rounded = conversion.toFixed(2)
    const result = rounded.toString().replace(".", ",")
    amount = amount.toString().replace(".", ",")
    const rate = USD.toString().replace(".", ",")

    await bot.deleteMessage(chatId, checkingMessage.message_id)
    bot.sendMessage(
      chatId,
      "🇺🇸  =  *" +
        conversionText +
        "  =>  🇻🇪\n\n BCV\n" +
        " $1 USD  => Bs." +
        rate +
        "\n\n$" +
        amount +
        " USD => Bs." +
        result +
        "*",
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

//------------------------Daily Alert BVC--------------------------------

async function alertBcv(bot, msg) {
  const chatId = msg.chat.id
  const languageCode = msg.from.language_code
  const activationMessage =
    languageCode === "es"
      ? "⏰ Alerta diaria activada ✅"
      : "⏰ Daily alert activate ✅"

  if (schedule.scheduledJobs[chatId]) {
    schedule.scheduledJobs[chatId] && schedule.scheduledJobs[chatId].cancel()
  }
  const reminderTime = moment().tz(moment.tz.guess()).set({
    hour: 13,
    minute: 0,
    second: 0,
    millisecond: 0,
  })

  const alertBcvJob = schedule.scheduleJob(reminderTime.toDate(), async () => {
    const checkingMessage = await bot.sendMessage(chatId, "...💬")

    try {
      const values = await getBcv()
      const [EUR, CNY, TRY, RUB, USD] = values
      bot.sendChatAction(chatId, "typing")

      const replyMarkup = {
        inline_keyboard: [[{ text: "BCV 🔗", url: bcvurl }]],
      }

      bot.deleteMessage(chatId, checkingMessage.message_id)

      bot.sendMessage(
        chatId,
        "⏰     🇻🇪 _BCV_  🇻🇪     ⏰\n\n🇺🇸  _Dolar:_ Bs.*" +
          USD +
          "*\n\n🇪🇺  _Euro:_ Bs.*" +
          EUR +
          "*",
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
export { bcv, bsusd, usdbs, alertBcv }

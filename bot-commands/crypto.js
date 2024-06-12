//Get the price of a crypto
async function coin(bot, msg, match) {
  const chatId = msg.chat.id
  const checkingMessage = await bot.sendMessage(chatId, "... 💬")

  const getCoin = await fetch(
    `https://api.coingecko.com/api/v3/search?query=${match[1]}`
  )

  try {
    const coin = await getCoin.json()

    const coinId = coin.coins[0].id

    const getCoindata = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinId.toLowerCase()}`
    )
    const data = await getCoindata.json()

    const price = data[0].current_price.toString()
    const formattedPrice = price.replace(".", ",")
    const name = data[0].name
    const symbol = data[0].symbol.toUpperCase()
    const priceChange24h = data[0].price_change_percentage_24h.toString()
    const formattedPriceChange24h = priceChange24h.replace(".", ",")
    const ath = data[0].ath.toString()
    const formattedath = ath.replace(".", ",")
    const percentageChange = parseFloat(priceChange24h)

    const icon = percentageChange > 0 ? "🟢" : "🔴"
    const icon2 =
      percentageChange > 5 ? " 🚀🚀🚀" : percentageChange < -5 ? " 🩸🩸🩸" : ""
    const url = `https://es.tradingview.com/chart/?symbol=${symbol}USDT`

    const replyMarkup = {
      inline_keyboard: [[{ text: "🔗", url: url }]],
    }

    await bot.deleteMessage(chatId, checkingMessage.message_id)

    await bot.sendMessage(
      chatId,
      `🪙  _${name}_  /  *${symbol}*  ${icon}  
                                  
  _ATH_:   $${formattedath}
                                  
  _24h_:  *${formattedPriceChange24h} %*  ${icon2}
                                  
  *Price:  $${formattedPrice}*
                                  `,
      {
        reply_markup: JSON.stringify(replyMarkup),
        parse_mode: "Markdown",
      }
    )
  } catch (error) {
    await bot.deleteMessage(chatId, checkingMessage.message_id)
    const languageCode = msg.from.language_code
    const notFoundErrorText =
      languageCode === "es"
        ? "❗️ Moneda no encontrada ⚠️"
        : "❗️ Coin not found ⚠️"

    bot.sendMessage(
      chatId,
      "Error: " +
        (error ===
          "TypeError: Cannot read properties of undefined (reading 'id')")
        ? notFoundErrorText
        : error
    )
    console.log(error)
  }
}

// Get crypto chart
let chartData = {}
function chart(bot, msg, match) {
  const chatId = msg.chat.id
  const userId = msg.from.id
  const languageCode = msg.from.language_code

  const intervals = {
    "1M": "1",
    "5M": "5",
    "15M": "15",
    "30M": "30",
    "1H": "60",
    "2H": "120",
    "3H": "180",
    "4H": "240",
    "6H": "360",
    "12H": "720",
    "1D": "D",
    D: "D",
    W: "W",
    M: "M",
  }

  let interval = match[2] ? match[2].toUpperCase() : "240"
  if (interval in intervals) {
    interval = intervals[interval]
  } else {
    interval = "240"
  }

  const url = `https://www.tradingview.com/chart/?symbol=${match[1]}USDT&interval=${interval}&theme=dark`

  const openChartText = languageCode === "es" ? "Abrir gráfica" : "Open chart"
  const opts = {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: `${match[1].toUpperCase()} ${openChartText}`,
            web_app: { url: url },
          },
        ],
      ],
    },
  }
  const checkDmText = languageCode === "es" ? "Verificar DM ✅" : "Check DM ✅"
  const getChartText =
    languageCode === "es" ? "Obtener gráfica 📈" : "Get chart 📈"
  const opts2 = {
    reply_markup: {
      inline_keyboard: [
        [{ text: checkDmText, url: "https://t.me/Gepetto2024_Bot" }],
        [
          {
            text: getChartText,
            callback_data: "send_private_message",
          },
        ],
      ],
    },
  }
  const expireMessage =
    languageCode === "es"
      ? "Este mensaje caducará cuando se solicite una nueva gráfica"
      : "This message will expire when the next chart request is made"
  if (msg.chat.type === "group" || msg.chat.type === "supergroup") {
    bot.sendMessage(chatId, "\n  ✉️ " + expireMessage, opts2)
  }
  bot.sendMessage(userId, "📉  📈\n\n⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️", opts)

  chartData[chatId] = {
    match: match,
    interval: interval,
    url: url,
    opts: opts,
  }
}

export { coin, chart }

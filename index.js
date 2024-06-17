import http from "http"
import TelegramBot from "node-telegram-bot-api"
import ai from "./bot-commands/ai.js"
import { cop, copusd, usdcop, copAlert } from "./bot-commands/cop.js"
import { bcv, bsusd, usdbs, alertBcv } from "./bot-commands/bcv.js"
import { coin, chart } from "./bot-commands/crypto.js"
import { cf, fc } from "./bot-commands/temperature.js"
import reminder from "./bot-commands/reminder.js"
import gifs from "./bot-commands/gifs.js"
import { lbkg, kglb } from "./bot-commands/weight.js"
import {
  ftom,
  mtof,
  incm,
  cmin,
  mfstature,
  fmstature,
  kmmi,
  mikm,
} from "./bot-commands/measurement.js"
import {
  drivers,
  constructors,
  getF1Alerts,
  nextF1,
} from "./bot-commands/f1.js"

const telegramToken = process.env.BOT_TOKEN

const url = `https://api.telegram.org/bot${telegramToken}/setWebhook?url=https://telegram-multiporpuse-bot.onrender.com`

const bot = new TelegramBot(telegramToken, {
  webHook: { port: process.env.PORT },
})
bot.setWebHook(`${url}/bot${telegramToken}`)

const server = http.createServer((req, res) => {
  if (req.url === "/healthcheck") {
    res.statusCode = 200
    res.setHeader("Content-Type", "text/plain")
    res.end("Up and running!")
  } else if (req.url == "/bot") {
    // Tu código para manejar las solicitudes del bot de Telegram va aquí
    bot.processUpdate(req.body)
    res.writeHead(200)
    res.end()
  } else {
    res.statusCode = 404
    res.end("Down")
  }
})

server.listen(process.env.PORT, () => {
  console.log(`Server running at port b ${process.env.PORT}`)
})

// const bot = new TelegramBot(telegramToken, { polling: true })
// bot.on("polling_error", (error) => {
//   console.error("Error de polling:", error)
// })
//----------------------Get user language---------------------------

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id
  const languageCode = msg.from.language_code
  try {
    //---------------------COMMANDS-----------------------

    const commands = [
      { command: "start", description: { en: "Start bot", es: "Iniciar bot" } },
      { command: "help", description: { en: "Get help", es: "Obtener ayuda" } },
      {
        command: "coin",
        description: { en: "Get crypto price", es: "Obtener precio crypto" },
      },
      {
        command: "chart",
        description: { en: "Get crypto chart", es: "Obtener grafico crypto" },
      },
      {
        command: "alertbcv",
        description: {
          en: "Get daily BCV rate",
          es: "Obtener tasa diaria BCV",
        },
      },
      {
        command: "bcv",
        description: { en: "Get BCV price", es: "Obtener precio BCV" },
      },
      { command: "bsusd", description: { en: "Bs. to USD", es: "Bs. a USD" } },
      { command: "usdbs", description: { en: "USD to Bs.", es: "USD a Bs." } },
      {
        command: "cop",
        description: { en: "Get COP price", es: "Obtener precio COP" },
      },
      {
        command: "copalert",
        description: {
          en: "Get daily COP rate",
          es: "Obtener tasa diaria COP",
        },
      },
      { command: "copusd", description: { en: "COP to USD", es: "COP a USD" } },
      { command: "usdcop", description: { en: "USD to COP", es: "USD a COP" } },
      {
        command: "cf",
        description: {
          en: "Celsius to Fahrenheit",
          es: "Celsius a Fahrenheit",
        },
      },
      {
        command: "fc",
        description: {
          en: "Fahrenheit to Celsius",
          es: "Fahrenheit a Celsius",
        },
      },
      {
        command: "kmmi",
        description: { en: "km to miles", es: "km a millas" },
      },
      {
        command: "mikm",
        description: { en: "miles to km", es: "millas a km" },
      },
      {
        command: "cmin",
        description: { en: "cm to inches", es: "cm a pulgadas" },
      },
      {
        command: "incm",
        description: { en: "Inches to cm", es: "Pulgadas a cm" },
      },
      { command: "cmft", description: { en: "cm to feet", es: "cm a pies" } },
      {
        command: "mtof",
        description: { en: "meters to feet", es: "metros a pies" },
      },
      {
        command: "ftom",
        description: { en: "feet to meters", es: "pies a metros" },
      },
      {
        command: "fmstature",
        description: { en: "Feet to meters", es: "Pies a metros" },
      },
      {
        command: "mfstature",
        description: { en: "Meters to feet", es: "Metros a pies" },
      },
      { command: "lbkg", description: { en: "lbs to kg", es: "libras a kg" } },
      { command: "kglb", description: { en: "kg to lbs", es: "kg a libras" } },
      {
        command: "f1alerts",
        description: {
          en: "Set F1 sessions alerts",
          es: "Establecer alertas de sesiones F1",
        },
      },
      {
        command: "drivers",
        description: {
          en: "Drivers standings",
          es: "Clasificación de pilotos",
        },
      },
      {
        command: "constructors",
        description: {
          en: "Constructors standings",
          es: "Clasificación de constructores",
        },
      },
      { command: "dice", description: { en: "Roll a dice", es: "Tirar dado" } },
    ].map((command) => {
      const description = command.description
      const language = languageCode
      return {
        ...command,
        description: language === "es" ? description.es : description.en,
      }
    })

    bot.setMyCommands(commands)
    const welcomeMessage = languageCode === "es" ? " ¡Hola!" : "Hi!"
    bot.sendMessage(chatId, welcomeMessage)
    const helpMessage =
      languageCode === "es"
        ? "Utiliza /help para ver los comandos"
        : "Use /help for list of commands"
    bot.sendMessage(chatId, helpMessage)
    // if (!bot.isPolling()) {
    //   bot.startPolling()
    // }
  } catch (error) {
    console.log(error)
  }
})

//------------------Dice-------------------

bot.onText(/\/dice/, (msg) => {
  const chatId = msg.chat.id
  bot.sendDice(chatId)
})

//------------------Coin Chart----------------
let chartData = {}
bot.onText(/\/chart (\S+)(?: (\S+))?/, (msg, match) => {
  chart(bot, msg, match)
})
bot.on("callback_query", (msg) => {
  const userId = msg.from.id
  const chatId = msg.message.chat.id
  if (chartData[chatId]) {
    bot.sendMessage(userId, "💹📊📉📈 ", chartData[chatId].opts)
  }
})
//----------------- Crypto price---------------

bot.onText(/\/coin (\S+)(?: (\S+))?/, (msg, match) => {
  coin(bot, msg, match)
})

//-----------------------BCVDaily--------------------------------

bot.onText(/\/alertbcv/, (msg) => {
  alertBcv(bot, msg)
})

//---------------- BCV Bs --------------------------------

bot.onText(/\/bcv/, (msg) => {
  bcv(bot, msg)
})

//-----------------------CONVERSION BS A USD-----------------------

bot.onText(/\/bsusd (\S+)/, (msg, match) => {
  bsusd(bot, msg, match)
})

//-----------------------CONVERSION USD A BS-----------------------

bot.onText(/\/usdbs (\S+)/, (msg, match) => {
  usdbs(bot, msg, match)
})

//------------------Daily BVC------------------
bot.onText(/\/copalert/, (msg) => {
  copAlert(bot, msg)
})

//----------------Tasa BVC COP --------------------------------

bot.onText(/^\/cop$/, (msg) => {
  cop(bot, msg)
})

//-----------------------CONVERSION COP A USD-----------------------

bot.onText(/\/copusd (\S+)/, (msg, match) => {
  copusd(bot, msg, match)
})

//-----------------------CONVERSION USD A COP-----------------------

bot.onText(/\/usdcop (\S+)/, (msg, match) => {
  usdcop(bot, msg, match)
})

//-----------------------Pounds to Kilograms -----------------------

bot.onText(/\/lbkg (\S+)/, (msg, match) => {
  lbkg(bot, msg, match)
})

//-----------------------Kilograms to Pounds -----------------------

bot.onText(/\/kglb (\S+)/, (msg, match) => {
  kglb(bot, msg, match)
})

//-----------------------KM to Miles-----------------------

bot.onText(/\/kmmi (\S+)/, (msg, match) => {
  kmmi(bot, msg, match)
})

//-----------------------Miles to KM-----------------------

bot.onText(/\/mikm (\S+)/, (msg, match) => {
  mikm(bot, msg, match)
})

//----------------------- Farenheit to Celcius ---------------------------------------

bot.onText(/\/fc (\S+)/, (msg, match) => {
  fc(bot, msg, match)
})

//----------------------- Celcius to Farenheit ---------------------------------------

bot.onText(/\/cf (\S+)/, (msg, match) => {
  cf(bot, msg, match)
})

//----------------------- Meters to Feet -----------------------

bot.onText(/\/mtof (\S+)/, (msg, match) => {
  mtof(bot, msg, match)
})

//----------------------- Feet to Meters -----------------------

bot.onText(/\/ftom (\S+)/, (msg, match) => {
  ftom(bot, msg, match)
})

//-----------------------Meters to feet and inches stature-----------------------

bot.onText(/\/mfstature (\S+)/, (msg, match) => {
  mfstature(bot, msg, match)
})

//-----------------------FEET and INCHES TO METERS stature-----------------------
bot.onText(/\/fmstature (\S+)/, (msg, match) => {
  fmstature(bot, msg, match)
})

//------------Inches to cm----------------

bot.onText(/\/incm (\S+)/, (msg, match) => {
  incm(bot, msg, match)
})

//-----------------------Cm to inches-----------------------

bot.onText(/\/cmin (\S+)/, (msg, match) => {
  cmin(bot, msg, match)
})

//----------------------F1----------------------------------

//------------Drivers standings----------------
bot.onText(/\/drivers/, (msg) => {
  drivers(bot, msg)
})

bot.onText(/\/constructors/, (msg) => {
  constructors(bot, msg)
})

// //------------------F1 sessions alerts------------------

bot.onText(/\/f1alerts/, (msg) => {
  getF1Alerts(bot, msg)
})

//--------------------F1 next sessions */

bot.onText(/\/nextf1/, (msg) => {
  nextF1(bot, msg)
})

// ------------------- AI -------------------

bot.onText(/\/ai (.*)/, (msg) => {
  ai(bot, msg)
})

//---------------------Reminder---------------------

bot.onText(
  /\/reminder (.+) (\d{2}:\d{2})(\s(\d{2}\/\d{2}\/\d{4}))?/,
  (msg, match) => {
    reminder(bot, msg, match)
  }
)

//--------------------GIFS-------------------
bot.on("message", (msg) => {
  gifs(bot, msg)
})

//-----------------------HELP-----------------------

bot.onText(/\/help/, (msg) => {
  const languageCode = msg.from.language_code
  const englishHelpText = `🤖                *Bot commands*                  🤖
      
      *General*
      */start* = Start bot
  
      *Crypto*
      */coin* [coin] 
      */chart* [coin] [timeframe]
      (example = /chart btc 15m)
  
      Get a crypto chart 
      Timeframe parameter is optional
      *Timeframes available*:
      1m 5m 15m 30m 1h 2h 4h 6h 12h D M W
      
      *Bolivar*
      */bcv* = BCV Dolar/Euro price
      */alertbcv* = Get BCV daily price alert
      */bsusd* = Bs. to USD 
      */usdbs* = USD to Bs.
      
      *Colombian Peso*
      */cop* = COP price
      */copalert* = Get COP daily price alert
      */copusd* = COP to USD
      */usdcop* = USD to COP
  
      *Temperature*
      */cf* = Celsius to Fahrenheit
      */fc* = Fahrenheit to Celsius
  
      *Measurements*
      */kmmi* = km to miles*
      */mikm* = miles to km
      */cmin* = cm to inches
      */incm* = inches to cm
      */cmft* = cm to feet
      */mtof* = meters to feet*
      */ftom* = feet to meters
  
      *Stature*
      */fmstature* = feet to meters
      */mfstature* = meters to feet
  
      *Weight*
      */lbkg* = lbs to kg
      */kglb* = kg to lbs
  
      *F1*
      */f1alerts* = Set F1 sessions alerts
      */drivers* = Drivers standings
      */constructors* = Constructors standings
      */dice* = Roll a dice`

  const spanishHelpText = `🤖                *Comandos del bot*                  🤖
      
      *General*
      */start* = Iniciar el bot
  
      *Criptomonedas*
      */coin* [moneda] 
      */chart* [moneda] [temporalidad]
      (ejemplo = /chart btc 15m)
  
      Obtener un gráfico de criptomonedas
      El parámetro de temporalidad es opcional
      *Temporalidades disponibles*:
      1m 5m 15m 30m 1h 2h 4h 6h 12h D M W
      
      *Bolívar*
      */bcv* = Precio de Dolar/Euro BCV
      */alertbcv* = Alerta de precio diario de BCV
      */bsusd* = Bs. a USD
      */usdbs* = USD a Bs.
      
      *Peso Colombiano*
      */cop* = Precio COP
      */copalert* = Alerta de precio diario COP
      */copusd* = COP a USD
      */usdcop* = USD a COP
  
      *Temperatura*
      */cf* = Celsius a Fahrenheit
      */fc* = Fahrenheit a Celsius
  
      *Medidas*
      */kmmi* = Kilometros a millas
      */mikm* = Millas a kilometros
      */cmin* = Centímetros a pulgadas
      */incm* = Pulgadas a cm
      */cmft* = Centímetros a pies
      */mtof* = Metros a pies
  
      *Estatura*
      */fmstature* = Pies a metros
      */mfstature* = Metros a pies
  
      *Peso*
      */lbkg* = Libras a kilogramos
      */kglb* = Kilogramos a libras
  
      *F1*
      */f1alerts* = Alertas de sesiones de F1
      */drivers* = Clasificación de pilotos
      */constructors* = Clasificación de constructores
      
      */dice* = Lanzar un dado`
  const helpText = languageCode === "es" ? spanishHelpText : englishHelpText
  bot.sendMessage(msg.chat.id, helpText, { parse_mode: "Markdown" })
})

bot.on("message", (msg) => {
  if (msg.text === "!experimentaloptions") {
    bot.sendMessage(
      msg.chat.id,
      "*Comands:* \n\n/ai [question]\n/nextf1\n/alarm [name] [time] [date] - Date is optional",
      {
        parse_mode: "Markdown",
      }
    )
  }
})

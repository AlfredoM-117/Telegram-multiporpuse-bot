import f1Api from "f1-api-node"
import moment from "moment-timezone"
import schedule from "node-schedule"
//------------------ F1 Drivers & Constructors Standings ------------------------

//------------------- F1 Drivers Standings ------------------------
async function drivers(bot, msg) {
  const chatId = msg.chat.id
  const checkingMessage = await bot.sendMessage(chatId, "... 💬")
  const languageCode = msg.from.language_code
  const driversTableText =
    languageCode === "es" ? "Clasificación de pilotos" : "Driver standings"
  try {
    const driverStandings = await f1Api.getDriverStandings()
    const driversTable = driverStandings
      .map((drivers) => {
        const position = String(drivers.position).padStart(3, " ")
        const driver = String(drivers.driver).padEnd(20, " ")
        const points = String(drivers.points).padStart(1, " ")
        return `${position} ${driver} ${points}`
      })
      .join("\n")

    await bot.deleteMessage(chatId, checkingMessage.message_id)

    bot.sendMessage(
      chatId,
      "🏁   *" + driversTableText + "*   🍾🏎\n\n`" + driversTable + "`",
      {
        parse_mode: "Markdown",
      }
    )
  } catch (error) {
    bot.sendMessage(chatId, "Error: " + error)
    console.error(error)
  }
}

//------------------- F1 Constructors Standings ------------------------

async function constructors(bot, msg) {
  const chatId = msg.chat.id
  const checkingMessage = await bot.sendMessage(chatId, "... 💬")
  const languageCode = msg.from.language_code
  const constructorsTableText =
    languageCode === "es"
      ? "Clasificación de constructores"
      : "Constructors standings"
  try {
    const constructorStandings = await f1Api.getConstructorStandings()
    const constructorsTable = constructorStandings
      .map((constructor) => {
        const position = String(constructor.position).padStart(3, " ")
        const team = String(constructor.team).padEnd(28, " ")
        const points = String(constructor.points).padStart(1, " ")
        return `${position} ${team} ${points} `
      })
      .join("\n")

    await bot.deleteMessage(chatId, checkingMessage.message_id)

    bot.sendMessage(
      chatId,
      "🏆       *" +
        constructorsTableText +
        "*       🏆\n\n`" +
        constructorsTable +
        "`",
      { parse_mode: "Markdown" }
    )
  } catch (error) {
    bot.sendMessage(chatId, "Error: " + error)
    console.error(error)
  }
}

//------------------Get F1 calendar --------------------

async function getF1Calendar() {
  const url = "https://f1-live-motorsport-data.p.rapidapi.com/races/2024"
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": process.env.F1_API_TOKEN,
      "x-rapidapi-host": "f1-live-motorsport-data.p.rapidapi.com",
    },
  }
  try {
    const response = await fetch(url, options)
    const data = await response.json()
    const sesiones = data.results.map((race) => {
      return {
        name: race.name,
        date: race.sessions.map((session) => {
          const split = session.date.split("T")
          return { name: session.session_name, date: split[0], time: split[1] }
        }),
      }
    })

    let sesionAlarms = []

    for (const race of sesiones) {
      for (const sesion of race.date) {
        if (
          !sesion.name.includes("Grid") &&
          !sesion.name.includes("FastestLap") &&
          !sesion.name.includes("Qualifying 2") &&
          !sesion.name.includes("Qualifying 3") &&
          !sesion.name.includes("Shootout 2") &&
          !sesion.name.includes("Shootout 3")
        ) {
          let newSesionAlarm = {
            sesionName: race.name + " " + sesion.name,
            sesionDate: sesion.date,
            sesionTime: sesion.time,
          }
          sesionAlarms.push(newSesionAlarm)
        }
      }
    }

    return sesionAlarms
  } catch (error) {
    console.error(error)
  }
}

//------------------- F1 Alerts ------------------------

async function getF1Alerts(bot, msg) {
  const chatId = msg.chat.id
  const languageCode = msg.from.language_code
  const alertsActivatedText =
    languageCode === "es"
      ? "⏰ Alertas activadas 🏁"
      : "⏰ F1 alerts activated 🏁"

  try {
    const sesionAlarms = await getF1Calendar()
    const currentDate = moment()

    sesionAlarms.forEach((session) => {
      const sessionDate = moment(session.sesionDate)
      const sessionTime = moment(session.sesionTime, "HH:mm:ssZ")
      const alarmTime = moment.tz(
        sessionDate.format("YYYY-MM-DD") + " " + sessionTime.format("HH:mm:ss"),
        "YYYY-MM-DD HH:mm:ss",
        moment.tz.guess()
      )

      if (alarmTime.isAfter(currentDate)) {
        const job = schedule.scheduleJob(alarmTime.toDate(), () => {
          bot.sendMessage(
            chatId,
            `🏁 🚨 🚨 🚨 Session Alert 🚨 🚨 🚨 🏁

⏰ ${session.sesionName} 🏎
<b>Links:</b>

 <a href="https://www.disneyplus.com/es-419/browse/espn">🔗 D+ ESPN</a> 

<a href="https://www.rerace.io/live/f1tv">🔗 Rerace </a>

<a href="https://www.zonadeportiva.xyz/p/dazn-formula-1-en-vivo-gratis.html">🔗 DAZN</a>

<a href="https://www.rojadirectaenvivo.la/">🔗 RojaDirecta</a>

<a href="https://f1-dash.com">🔗 F1 Dash</a>
 `,
            {
              parse_mode: "HTML",
              disable_web_page_preview: true,
            }
          )
          job.cancel()
        })
      }
    })
    bot.sendMessage(chatId, alertsActivatedText)
  } catch (error) {
    bot.sendMessage(chatId, "Error: " + error)
    console.error(error)
  }
}

//------------------- F1 Next Race ------------------------
async function nextF1(bot, msg) {
  const chatId = msg.chat.id

  try {
    const sesionAlarms = await getF1Calendar()
    const currentDate = moment().utc().format("YYYY-MM-DD")

    let filteredSesionAlarms = []

    for (let i = 0; i < sesionAlarms.length; i++) {
      const sesion = sesionAlarms[i]

      const sesionDate = moment.utc(sesion.sesionDate).local()
      const sesionTime = moment.utc(sesion.sesionTime, "HH:mm:ssZ").local()

      if (
        sesionDate.isSameOrAfter(currentDate) &&
        sesion.sesionName.includes("Race") &&
        !sesion.sesionName.includes("Miami") &&
        !sesion.sesionName.includes("Austrian") &&
        sesionDate.year() === 2024
      ) {
        filteredSesionAlarms.push({
          sesionName: sesion.sesionName,
          sesionDate: sesionDate.format("DD-MM-YYYY"),
          sesionTime: sesionTime.format("HH:mm"),
        })
        break
      }

      if (
        sesionDate.isSameOrAfter(currentDate) &&
        !sesion.sesionName.includes("Miami") &&
        !sesion.sesionName.includes("Austrian") &&
        sesionDate.year() === 2024
      ) {
        filteredSesionAlarms.push({
          sesionName: sesion.sesionName,
          sesionDate: sesionDate.format("DD-MM-YYYY"),
          sesionTime: sesionTime.format("HH:mm"),
        })
      }
    }
    const mensaje = filteredSesionAlarms
      .map((sesion) => {
        return `${sesion.sesionName} 

📅 ${sesion.sesionDate}
⏰ ${sesion.sesionTime}`
      })
      .join("\n\n")
    bot.sendMessage(
      chatId,
      "🏁 *Next F1 GP Schedule* 🏁\n\n*" + mensaje + "*",
      {
        parse_mode: "Markdown",
      }
    )
  } catch (error) {
    console.error(error)
  }
}

export { drivers, constructors, getF1Alerts, nextF1 }

import moment from "moment-timezone"
import schedule from "node-schedule"

//----------------------Set a reminder--------------------------------
function reminder(bot, msg, match) {
  const alarmName = match[1]
  const timeStr = match[2]
  const dateStr = match[4]

  const languageCode = msg.from.language_code
  const invalidTimeText =
    languageCode === "es"
      ? "Hora inválida. Por favor, introduce una hora futura"
      : "Invalid alarm time. Please provide a future time"
  const invalidTimeFormatText =
    languageCode === "es"
      ? "Formato de hora inválido. Usa HH:mm"
      : "Invalid time format. Use HH:mm"

  try {
    const time = moment(timeStr, "HH:mm")
    let alarmDate
    if (dateStr) {
      alarmDate = moment(dateStr, "DD/MM/YYYY")
    } else {
      alarmDate = moment()
    }
    const timeZone = moment.tz.guess()
    const userTimeZone = moment.tz(timeZone)
    const alarmTime = moment(alarmDate).tz(userTimeZone.tz()).set({
      hour: time.hour(),
      minute: time.minute(),
    })

    if (alarmTime.isBefore(moment().tz(userTimeZone.tz()))) {
      bot.sendMessage(msg.chat.id, invalidTimeText)
      return
    }

    const job = schedule.scheduleJob(alarmTime.toDate(), () => {
      bot.sendMessage(
        msg.chat.id,
        `🚨 🚨 🚨 🚨 *Reminder* 🚨 🚨 🚨 🚨
          
⏰ _${alarmName}_`,
        {
          parse_mode: "Markdown",
        }
      )
      job.cancel() //
    })

    const confirmationMessage =
      languageCode === "es"
        ? `⏰ _Alarma "${alarmName}" creada ${alarmTime.format(
            "HH:mm DD/MM/YYYY_ ✅"
          )}`
        : `⏰ _"${alarmName}" set for ${alarmTime.format(
            "HH:mm DD/MM/YYYY_ ✅"
          )}`
    bot.sendMessage(msg.chat.id, confirmationMessage, {
      parse_mode: "Markdown",
    })
  } catch (error) {
    bot.sendMessage(msg.chat.id, invalidTimeFormatText)
    console.log(error)
  }
}
export default reminder

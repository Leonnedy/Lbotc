let handler = async (m, { conn }) => {
  let id = m.chat
  if (!m.quoted || m.quoted.sender != conn.user.jid || !/^Cuantos resultados de/i.test(m.quoted.text)) throw false
  conn.math = conn.math ? conn.math : {}
  if (!(id in conn.math)) throw 'Esa pregunta ha terminado'
  if (m.quoted.id == conn.math[id][0].id) {
  let math = JSON.parse(JSON.stringify(conn.math[id][1]))
  if (m.text == math.result) {
    global.DATABASE._data.users[m.sender].exp += math.bonus
    clearTimeout(conn.math[id][3])
    delete conn.math[id]
    throw `*Respuesta correcta!*\n+${math.bonus} XP`
  } else {
    if (--conn.math[id][2] == 0) {
      clearTimeout(conn.math[id][3])
      delete conn.math[id]
      throw `*Kesempatan habis!*\nJawaban: *${math.result}*`
    } else throw `*¡Respuesta incorrecta!*\nAun disponible ${conn.math[id][2]} oportunidad`
  }
 }
}
handler.customPrefix = /^-?[0-9]+(\.[0-9]+)?$/
handler.command = new RegExp
handler.exp = 0

module.exports = handler

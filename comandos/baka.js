const Discord = require('discord.js');
const kakashi = require('anime-actions');
const color = "cc2929";

module.exports = {
  name: "baka",
  alias: [],

async execute (client, message, args){

  const emojis = ["<:custom_emoji:1276068618978988104>", "<:custom_emoji:1276068974538526721>", "<:custom_emoji:1276069020423946286>", "<:custom_emoji:1276068807391318048>", "<:custom_emoji:1276068866975469660>", "<:custom_emoji:1276068618978988104>"]
  const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)]

  const text = ["Ohayo, me han dicho que tengo la voz de bakugo, hum, no sé si sea cierto, pero de que puedo hacer el baka, mmm creo que sí, osea... BAAKA 😈, ejem díganmelo ustedes ah.", `**${message.author.username}**, ¡¡BAKA!!`]
  const textRandom = text[Math.floor(Math.random() * text.length)]

const action = await kakashi.baka();

const descrip = new Discord.MessageEmbed()
  .setDescription(`${textRandom} ${randomEmoji}`)
  .setImage(action)
  .setColor(color)

  message.reply({embeds: [descrip]})


 }

}
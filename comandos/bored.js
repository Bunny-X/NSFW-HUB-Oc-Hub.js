const Discord = require('discord.js');
const kakashi = require('anime-actions');
const color = "cc2929";

module.exports = {
  name: "bored",
  alias: [],

async execute (client, message, args){

  const emojis = ["<:custom_emoji:1276068618978988104>", "<:custom_emoji:1276068974538526721>", "<:custom_emoji:1276069020423946286>", "<:custom_emoji:1276068807391318048>", "<:custom_emoji:1276068866975469660>", "<:custom_emoji:1276068618978988104>"]
  const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)]

  const mw = [`**${message.author.tag}** está muy aburrido...`, `**${message.author.tag}** se siente aburrido. u.u`, `**${message.author.tag}** está aburrido porque no sacan cheves.`]
  const random = mw[Math.floor(Math.random() * mw.length)]


const action = await kakashi.bored();

  const ochub = new Discord.MessageEmbed()
  .setDescription(`${random} ${randomEmoji}`)
  .setColor(color)
  .setImage(action)
   message.reply({embeds: [ochub]})


 }

}
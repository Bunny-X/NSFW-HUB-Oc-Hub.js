const Discord = require('discord.js');
const kakashi = require('anime-actions');
const color = "cc2929";

module.exports = {
  name: "stare",
  alias: [],

async execute (client, message, args){

  const target = message.mentions.members.first()
if(!target){ 
  const mw = new Discord.MessageEmbed()
  .setDescription("<:Converter:995595217782718475> You have to mention a user.\nMode of use: `.stare [User]`")
  .setColor(color) 
  return message.reply({embeds: [mw]})
}

  if (target.id === message.author.id) {
    const selfSlapEmbed = new Discord.MessageEmbed()
      .setDescription("<:Converter:995595217782718475> No.")
      .setColor(color);
    return message.reply({ embeds: [selfSlapEmbed] });
  }

  if (target.id === client.user.id) {
    const selfSlapEmbed = new Discord.MessageEmbed()
      .setDescription("<:Converter:995595217782718475> It doesn't suit you...")
      .setColor(color);
    return message.reply({ embeds: [selfSlapEmbed] });
  }

  const emojis = ["<:custom_emoji:1276068618978988104>", "<:custom_emoji:1276068974538526721>", "<:custom_emoji:1276069020423946286>", "<:custom_emoji:1276068807391318048>", "<:custom_emoji:1276068866975469660>", "<:custom_emoji:1276068618978988104>"]
  const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)]

  const mw = [`**${message.author.tag}** mira fijamente a **${target.user.username}**`, `**${message.author.tag}** analiza a **${target.user.username}** -_-`, `**${message.author.tag}** acosa a **${target.user.username}**`]
  const random = mw[Math.floor(Math.random() * mw.length)]


const action = await kakashi.stare();

  const ochub = new Discord.MessageEmbed()
  .setDescription(`${random} ${randomEmoji}`)
  .setColor(color)
  .setImage(action)
   message.reply({embeds: [ochub]})


 }

}
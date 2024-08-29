const Discord = require('discord.js');
const kakashi = require('anime-actions');
const db = require('megadb');
const bonks = new db.crearDB('bonks');
const color = "cc2929";

module.exports = {
  name: "yeet",
  alias: [],

async execute (client, message, args){

  const target = message.mentions.members.first()
if(!target){ 
  const mw = new Discord.MessageEmbed()
  .setDescription("<:Converter:995595217782718475> You have to mention a user.\nMode of use: `.yeet [User]`")
  .setColor(color) 
  return message.reply({embeds: [mw]})
}

  if(target.id === message.author.id) {
    const uwu = new Discord.MessageEmbed()
    .setDescription("<:Converter:995595217782718475> No")
    .setColor(color)
    return message.reply({embeds: [uwu]})
  }

  if (target.id === client.user.id) {
    const selfSlapEmbed = new Discord.MessageEmbed()
      .setDescription("<:Converter:995595217782718475> It doesn't suit you...")
      .setColor(color);
    return message.reply({ embeds: [selfSlapEmbed] });
  }
  
  const emojis = ["<:custom_emoji:1276068618978988104>", "<:custom_emoji:1276068974538526721>", "<:custom_emoji:1276069020423946286>", "<:custom_emoji:1276068807391318048>", "<:custom_emoji:1276068866975469660>", "<:custom_emoji:1276068618978988104>"]
  const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)]

  const mw = [`**${message.author.tag}** pateó duro a **${target.user.username}**.`, `**${message.author.tag}** empujó a **${target.user.username}**. OwO`, `**${message.author.tag}** arrojó a **${target.user.username}**.`]
  const random = mw[Math.floor(Math.random() * mw.length)]

   if(!bonks.tiene(`${message.author.id}.${target.id}`))
     bonks.establecer(`${message.author.id}.${target.id}`, 0)

     bonks.sumar(`${message.author.id}.${target.id}`, 1)

     let cantidad = await bonks.obtener(`${message.author.id}.${target.id}`)

const action = await kakashi.yeet();

  const ochub = new Discord.MessageEmbed()
  .setDescription(`${random} ${randomEmoji}`)
  .setColor(color)
  .setImage(action)
  .setFooter({text: `Total de vergazos dados: ${cantidad}`, iconURL: "https://media.discordapp.net/attachments/947288102270021653/1272108571269795861/aaaa-removebg-preview.png?ex=66b9c6ee&is=66b8756e&hm=0e010dfa2fef755c47408323a3f919efdeb40c323973add70dc282ef63bfe50d&=&format=webp&quality=lossless&width=365&height=345"})
   message.reply({embeds: [ochub]})


 }

}
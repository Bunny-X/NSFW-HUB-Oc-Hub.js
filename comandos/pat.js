const Discord = require('discord.js');
const kakashi = require('anime-actions');
const db = require('megadb');
const palmadas = new db.crearDB('palmadas');

const color = "cc2929";

module.exports = {
  name: "pat",
  alias: [],

async execute (client, message, args){

  const target = message.mentions.members.first()
  if(!target) {
    const sex = new Discord.MessageEmbed()
    .setDescription("You have to mention a user.\nMode of use: `.pat [User]`")
    .setColor(color)
    return message.reply({embeds: [sex]})
  }

  if(target.id === message.author.id) {
    const uwu = new Discord.MessageEmbed()
    .setDescription("No")
    .setColor(color)
    return message.reply({embeds: [uwu]})
  }

  const emojis = ["<:custom_emoji:1276068618978988104>", "<:custom_emoji:1276068974538526721>", "<:custom_emoji:1276069020423946286>", "<:custom_emoji:1276068807391318048>", "<:custom_emoji:1276068866975469660>", "<:custom_emoji:1276068618978988104>"]
  const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)]


   if(!palmadas.tiene(`${message.author.id}.${target.id}`))
   palmadas.establecer(`${message.author.id}.${target.id}`, 0)

   palmadas.sumar(`${message.author.id}.${target.id}`, 1)

   let cantidad = await palmadas.obtener(`${message.author.id}.${target.id}`)

const action = await kakashi.pat();

  const em = new Discord.MessageEmbed()
  .setDescription(`**${message.author.username}** le hizo mimos a **${target.user.username}** ${randomEmoji}`)
  .setColor(color)
  .setImage(action)
  .setFooter({text: `Total de caricias dadas: ${cantidad}`, iconURL: "https://media.discordapp.net/attachments/947288102270021653/1272108571269795861/aaaa-removebg-preview.png?ex=66b9c6ee&is=66b8756e&hm=0e010dfa2fef755c47408323a3f919efdeb40c323973add70dc282ef63bfe50d&=&format=webp&quality=lossless&width=365&height=345"})

  message.reply({embeds: [em]})




 }

}
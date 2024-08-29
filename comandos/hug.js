const Discord = require('discord.js');
const kakashi = require('anime-actions');
const db = require('megadb');
const hugs = new db.crearDB('hugs');

const color = "cc2929";

module.exports = {
  name: "hug",
  alias: [],

async execute (client, message, args){

  const target = message.mentions.members.first()
  if(!target) {
    const sex = new Discord.MessageEmbed()
    .setDescription("<:Converter:995595217782718475> You have to mention a user.\nMode of use: `.hug [User]`")
    .setColor(color)
    return message.reply({embeds: [sex]})
  }

  if(target.id === message.author.id) {
    const uwu = new Discord.MessageEmbed()
    .setDescription("<:Converter:995595217782718475> No")
    .setColor(color)
    return message.reply({embeds: [uwu]})
  }


   if(!hugs.tiene(`${message.author.id}.${target.id}`))
   hugs.establecer(`${message.author.id}.${target.id}`, 0)

   hugs.sumar(`${message.author.id}.${target.id}`, 1)

   let cantidad = await hugs.obtener(`${message.author.id}.${target.id}`)

const action = await kakashi.hug();

  const em = new Discord.MessageEmbed()
  .setDescription(`**${message.author.username}** le dio un abrazo a **${target.user.username}** (つ≧▽≦)つ`)
  .setColor(color)
  .setImage(action)
  .setFooter({text: `Total de abrazos dados: ${cantidad}`, iconURL: "https://media.discordapp.net/attachments/947288102270021653/1272108571269795861/aaaa-removebg-preview.png?ex=66b9c6ee&is=66b8756e&hm=0e010dfa2fef755c47408323a3f919efdeb40c323973add70dc282ef63bfe50d&=&format=webp&quality=lossless&width=365&height=345"})

  message.reply({embeds: [em]})




 }

}
const Discord = require('discord.js');
const kakashi = require('anime-actions');
const { crearDB } = require('megadb'); 
const db = new crearDB('slaps'); 

const color = "cc2929";

module.exports = {
  name: "slap",
  alias: [],

  async execute(client, message, args) {

    const target = message.mentions.members.first();

    if (!target) {
      const sex = new Discord.MessageEmbed()
      .setDescription("<:Converter:995595217782718475> You have to mention a user.\nMode of use: `.slap [User]`")
      .setColor(color)
      return message.reply({embeds: [sex]})
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

   
    if (!await db.has(`${message.author.id}.${target.id}`)) {
      await db.set(`${message.author.id}.${target.id}`, 0);
    }

  
    await db.add(`${message.author.id}.${target.id}`, 1);

   
    let cantidad = await db.get(`${message.author.id}.${target.id}`);

    
    const slapImage = await kakashi.slap();

  
    const slapEmbed = new Discord.MessageEmbed()
      .setDescription(`**${message.author.username}** le dio una cachetada a **${target.user.username}** 😠`)
      .setColor(color)
      .setImage(slapImage)
    .setFooter({text: `Total de cachetadas dadas: ${cantidad}`, iconURL: "https://media.discordapp.net/attachments/947288102270021653/1272108571269795861/aaaa-removebg-preview.png?ex=66b9c6ee&is=66b8756e&hm=0e010dfa2fef755c47408323a3f919efdeb40c323973add70dc282ef63bfe50d&=&format=webp&quality=lossless&width=365&height=345"})

    message.reply({ embeds: [slapEmbed] });
  }
};

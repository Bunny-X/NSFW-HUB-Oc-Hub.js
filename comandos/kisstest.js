const Discord = require('discord.js');
const kakashi = require('anime-actions');
const { crearDB } = require('megadb'); 
const db = new crearDB('kisses'); 

const color = "cc2929";

module.exports = {
  name: "kiss",
  alias: [],

  async execute(client, message, args) {
    // Obtén el usuario mencionado
    const target = message.mentions.members.first();

    if (!target) {
      const noMentionEmbed = new Discord.MessageEmbed()
        .setDescription("<:Converter:995595217782718475> You must mention a user.\nMode of use: `.kiss [Usuario]`")
        .setColor(color);
      return message.reply({ embeds: [noMentionEmbed] });
    }

    if (target.id === message.author.id) {
      const selfKissEmbed = new Discord.MessageEmbed()
        .setDescription("<:Converter:995595217782718475> No")
        .setColor(color);
      return message.reply({ embeds: [selfKissEmbed] });
    }

    const emojis = ["<:custom_emoji:1276068618978988104>", "<:custom_emoji:1276068974538526721>", "<:custom_emoji:1276069020423946286>", "<:custom_emoji:1276068807391318048>", "<:custom_emoji:1276068866975469660>", "<:custom_emoji:1276068618978988104>"]
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)]

    // 
    if (!await db.has(`${message.author.id}.${target.id}`)) {
      await db.set(`${message.author.id}.${target.id}`, 0);
    }

    // 
    await db.add(`${message.author.id}.${target.id}`, 1);

    //
    let cantidad = await db.get(`${message.author.id}.${target.id}`);

    // 
    const kissImage = await kakashi.kiss();

    // 
    const kissEmbed = new Discord.MessageEmbed()
      .setDescription(`**${message.author.username}** le dio un beso a **${target.user.username}** ${randomEmoji}`)
      .setColor(color)
      .setImage(kissImage)
      .setFooter({text: `Total de besos dados: ${cantidad}`, iconURL: "https://media.discordapp.net/attachments/947288102270021653/1272108571269795861/aaaa-removebg-preview.png?ex=66b9c6ee&is=66b8756e&hm=0e010dfa2fef755c47408323a3f919efdeb40c323973add70dc282ef63bfe50d&=&format=webp&quality=lossless&width=365&height=345"})

    message.reply({ embeds: [kissEmbed] });
  }
};

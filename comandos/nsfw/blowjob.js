const Discord = require('discord.js');
const axios = require('axios'); // Asegúrate de tener axios instalado
const db = require('megadb');
const hugs = new db.crearDB('blowjob');

const color = "cc2929";

module.exports = {
  name: "blowjob",  // Cambia el nombre del comando si es necesario
  alias: [],

  async execute(client, message, args) {
    // Verifica si el canal es NSFW
    if (!message.channel.nsfw) {
      const w = new Discord.MessageEmbed()
        .setDescription("<:Converter:995595217782718475> This command can only be used in an NSFW channel.")
        .setColor(color)
      .setImage("https://images-ext-1.discordapp.net/external/799p66YzIdNlRBpxlMzs36bFoofcO0b2lbm4wQVkvPk/https/cdn.nekotina.com/res/menus/nsfw.png?format=webp&quality=lossless&width=547&height=85")
      return message.reply({embeds: [w]})
    }

    const target = message.mentions.members.first();

    if (!target) {
      const sex = new Discord.MessageEmbed()
        .setDescription("<:Converter:995595217782718475> You have to mention user.\nMode of use: `.blowjob [Usuario]`")
        .setColor(color);
      return message.reply({ embeds: [sex] });
    }

    if (target.id === message.author.id) {
      const uwu = new Discord.MessageEmbed()
        .setDescription("Y<:Converter:995595217782718475> You can't send messages to yourself.")
        .setColor(color);
      return message.reply({ embeds: [uwu] });
    }

    if (target.id === client.user.id) {
      const selfSlapEmbed = new Discord.MessageEmbed()
        .setDescription("<:Converter:995595217782718475> It doesn't suit you...")
        .setColor(color);
      return message.reply({ embeds: [selfSlapEmbed] });
    }

    if (!await hugs.has(`${message.author.id}.${target.id}`)) {
      await hugs.set(`${message.author.id}.${target.id}`, 0);
    }

    await hugs.add(`${message.author.id}.${target.id}`, 1);

    let cantidad = await hugs.get(`${message.author.id}.${target.id}`);

    try {
     
      const response = await axios.get('https://api.waifu.pics/nsfw/blowjob');
      const blowjobImage = response.data.url; 

      const em = new Discord.MessageEmbed()
        .setDescription(`**${message.author.username}** le dio un blowjob a **${target.user.username}** 💋`)
        .setColor(color)
        .setImage(blowjobImage) 
      .setFooter({text: `Total de envios: ${cantidad}`, iconURL: "https://media.discordapp.net/attachments/947288102270021653/1272108571269795861/aaaa-removebg-preview.png?ex=66b9c6ee&is=66b8756e&hm=0e010dfa2fef755c47408323a3f919efdeb40c323973add70dc282ef63bfe50d&=&format=webp&quality=lossless&width=365&height=345"})

      message.reply({ embeds: [em] });
    } catch (error) {
      console.error('Error al obtener la imagen:', error);
      message.reply('Error.');
    }
  }
};

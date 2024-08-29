const Discord = require('discord.js');
const axios = require('axios'); 
const waifuPics = require("waifu-dot-pics").default

const color = "cc2929";

module.exports = {
  name: "waifu",  //
  alias: [],

  async execute(client, message, args) {
    // 
    if (!message.channel.nsfw) {
      const w = new Discord.MessageEmbed()
        .setDescription("This command can only be used in an NSFW channel.")
        .setColor(color)
        .setImage("https://images-ext-1.discordapp.net/external/799p66YzIdNlRBpxlMzs36bFoofcO0b2lbm4wQVkvPk/https/cdn.nekotina.com/res/menus/nsfw.png?format=webp&quality=lossless&width=547&height=85")
      return message.reply({embeds: [w]});
    }

    const emojis = ["<:custom_emoji:1276068618978988104>", "<:custom_emoji:1276068974538526721>", "<:custom_emoji:1276069020423946286>", "<:custom_emoji:1276068807391318048>", "<:custom_emoji:1276068866975469660>", "<:custom_emoji:1276068618978988104>"]
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)]

    try {

      const im = await waifuPics("waifu", { nsfw: true });
      // 
      const response = await axios.get('https://api.waifu.pics/nsfw/waifu');
      const { url: waifuImage, name: waifuName } = response.data;

      const random = [im, waifuImage]
      const randomImage = random[Math.floor(Math.random() * random.length)]

      const em = new Discord.MessageEmbed()
        .setDescription(`Aquí tienes una imagen de waifu ${randomEmoji}`)
        .setColor(color)
        .setImage(randomImage);

      message.reply({ embeds: [em] });
    } catch (error) {
      console.error('Error al obtener la imagen:', error);
      message.reply('No se pudo obtener la imagen. Intenta de nuevo más tarde.');
    }
  }
};

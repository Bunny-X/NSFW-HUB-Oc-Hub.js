const Discord = require('discord.js');

const color = "cc2929";

module.exports = {
  name: "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
  alias: [],

  async execute(client, message, args) {

    if (!message.channel.nsfw) {
      const w = new Discord.MessageEmbed()
        .setDescription("This command can only be used in an NSFW channel.")
        .setColor(color)
      .setImage("https://images-ext-1.discordapp.net/external/799p66YzIdNlRBpxlMzs36bFoofcO0b2lbm4wQVkvPk/https/cdn.nekotina.com/res/menus/nsfw.png?format=webp&quality=lossless&width=547&height=85")
      return message.reply({embeds: [w]})
    }

    const response = fetch.get('https://nekos.life/api/v2/img/cum')

    

    const em = new Discord.MessageEmbed()
    .setDescription("Ññ")
    .setImage(image)
    .setColor(color)

    message.reply({embeds: [em]})
   
  }
};

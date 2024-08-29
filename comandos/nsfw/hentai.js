const Discord = require('discord.js');
const nHentai = require('shentai');
const color = "cc2929";

let cooldown = new Set();

module.exports = {
  name: "hentai",
  alias: [],

async execute(client, message, args) {

  if (!message.channel.nsfw) {
    const embed = new Discord.MessageEmbed()
      .setDescription("This command can only be used in an NSFW channel.")
      .setColor(color)
      .setImage("https://images-ext-1.discordapp.net/external/799p66YzIdNlRBpxlMzs36bFoofcO0b2lbm4wQVkvPk/https/cdn.nekotina.com/res/menus/nsfw.png?format=webp&quality=lossless&width=547&height=85");
    return message.reply({ embeds: [embed] });
  }

  const solicitud = args.join(" ");
  if (!solicitud){
    const laal = new Discord.MessageEmbed()
    .setDescription("<:Converter:995595217782718475> You have to write a tag.\nMode of use: `.hentai [tag] | .hentai random`")
    .setColor(color)
    return message.reply({embeds: [laal]})
  }

  if(cooldown.has(message.author.id)){
    const l = new Discord.MessageEmbed()
    .setDescription(`<:Converter:995595217782718475> ${message.author}, you must wait 3 seconds to use the command.`)
    .setColor(color)
    return message.reply({embeds: [l]}).then(m => {
      setTimeout(() => {
        m.delete();
      }, 3000)
    })
  }

  cooldown.add(message.author.id);

  setTimeout(() => {
    cooldown.delete(message.author.id);
  }, 3000);

  try {

    if (solicitud.toLowerCase() === "random") {
      const sHentai = new nHentai();
      const doujins = await sHentai.getPopular()

      const randomDoujin = doujins[Math.floor(Math.random() * doujins.length)];

      const embed = new Discord.MessageEmbed()
        .setTitle(randomDoujin.titles.english || "Untitled.")
        .setColor(color)
        .setImage(randomDoujin.cover || null);

      const sentMessage = await message.channel.send({ embeds: [embed] });

      let currentPage = 0;

      const doujinData = await sHentai.getDoujin(`https://nhentai.net/g/${randomDoujin.id}/`);

      const pageEmbed = async (page) => {
        return new Discord.MessageEmbed()
          .setTitle(doujinData.titles.english || "Untitled.")
          .setDescription(`Page \`${page + 1}/${doujinData.pages.length}\``)
          .setColor(color)
          .setImage(doujinData.pages[page])
          .setURL(`https://nhentai.net/g/${randomDoujin.id}/`)
      };

      const row = new Discord.MessageActionRow()
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('previous')
            .setLabel('⬅️')
            .setStyle('DANGER'),
          new Discord.MessageButton()
            .setCustomId('next')
            .setLabel('➡️')
            .setStyle('DANGER')
        );

      let imageMessage = await message.channel.send({ embeds: [await pageEmbed(currentPage)], components: [row] });

      const filter = i => ['previous', 'next'].includes(i.customId) && i.user.id === message.author.id;

      const collector = imageMessage.createMessageComponentCollector({ filter, time: 300000 });

      collector.on('collect', async i => {
        if (i.customId === 'next') {
          if (currentPage < doujinData.pages.length - 1) {
            currentPage++;
          }
        } else if (i.customId === 'previous') {
          if (currentPage > 0) {
            currentPage--;
          }
        }

        await i.update({ embeds: [await pageEmbed(currentPage)], components: [row] });
      });

      collector.on('end', collected => {
        imageMessage.edit({ components: [] });
      });

      return;
      
    }
    
    const sHentai = new nHentai();
    const busqueda = await sHentai.search(solicitud);

    if (!busqueda.results || busqueda.results.length === 0) {
      const wwaw = new Discord.MessageEmbed()
      .setDescription("<:Converter:995595217782718475> No results found.")
      .setColor(color)
      return message.reply({embeds: [wwaw]})
    }

    const doujin = await sHentai.getDoujin(busqueda.results[0].url);

    const embed = new Discord.MessageEmbed()
      .setTitle(doujin.titles.english || "Untitled.")
      .setDescription(doujin.tags.join(", ") || "No descriptión.")
      .setColor(color)
      .setImage(doujin.cover || null); 

    const sentMessage = await message.channel.send({ embeds: [embed] });

    let currentPage = 0;

    const pageEmbed = async (page) => {
      return new Discord.MessageEmbed()
        .setTitle(doujin.titles.english || "Untitled.")
        .setDescription(`Page \`${page + 1}/${doujin.pages.length}\``)
        .setColor(color)
        .setImage(doujin.pages[page])
       .setURL(`https://nhentai.net/g/${doujin.id}/`)
    };

    const row = new Discord.MessageActionRow()
      .addComponents(
        new Discord.MessageButton()
          .setCustomId('previous')
          .setLabel('⬅️')
          .setStyle('DANGER'),
        new Discord.MessageButton()
          .setCustomId('next')
          .setLabel('➡️')
          .setStyle('DANGER')
      );

    let imageMessage = await message.channel.send({ embeds: [await pageEmbed(currentPage)], components: [row] });

    const filter = i => ['previous', 'next'].includes(i.customId) && i.user.id === message.author.id;

    const collector = imageMessage.createMessageComponentCollector({ filter, time: 300000 });

    collector.on('collect', async i => {
      if (i.customId === 'next') {
        if (currentPage < doujin.pages.length - 1) {
          currentPage++;
        }
      } else if (i.customId === 'previous') {
        if (currentPage > 0) {
          currentPage--;
        }
      }

      await i.update({ embeds: [await pageEmbed(currentPage)], components: [row] });
    });

    collector.on('end', collected => {
      imageMessage.edit({ components: [] });
    });

  } catch (err) {
    console.error(err);
    message.reply("Ocurrió un error al procesar tu solicitud.");
  }
}
};

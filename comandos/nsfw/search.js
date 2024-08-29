const Discord = require('discord.js');
const { r34_search } = require('r34-module');
const color = "cc2929";

let cooldown = new Set();

module.exports = {
  name: "search",
  alias: [],

  async execute(client, message, args) {

    if (!message.channel.nsfw) {
      const embed = new Discord.MessageEmbed()
        .setDescription("<:Converter:995595217782718475> This command can only be used in an NSFW channel.")
        .setColor(color)
        .setImage("https://images-ext-1.discordapp.net/external/799p66YzIdNlRBpxlMzs36bFoofcO0b2lbm4wQVkvPk/https/cdn.nekotina.com/res/menus/nsfw.png?format=webp&quality=lossless&width=547&height=85");
      return message.reply({ embeds: [embed] });
    }

    try {

      const busqueda = args.join(" ");
      if (!busqueda) {
        const a = new Discord.MessageEmbed()
          .setDescription("<:Converter:995595217782718475> You have to write a search.\nMode of use: `.search [tag]`")
          .setColor(color);
        return message.reply({ embeds: [a] });
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

      const r34 = await r34_search({ search_tag: busqueda });

      if (!r34 || r34.length === 0) {
        const wow = new Discord.MessageEmbed()
        .setDescription("<:Converter:995595217782718475> No results found.")
        .setColor(color)
        return message.reply({embeds: [wow]})
      }

      let currentPage = 0;

      const pageEmbed = async (page) => {
        return new Discord.MessageEmbed()
          .setTitle(`Results for ${busqueda}`)
          .setDescription(`Page \`${page + 1}/${r34.length}\``)
          .setColor(color)
          .setImage(r34[page]); 
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
          if (currentPage < r34.length - 1) {
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
      message.reply("Error: " + err);
    }

  }

};

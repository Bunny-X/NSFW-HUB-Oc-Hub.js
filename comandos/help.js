const Discord = require('discord.js');
const { Client, Intents, MessageActionRow, MessageSelectMenu } = require('discord.js');
const sexo = "cc2929";

const client = new Client({ 
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] 
});

module.exports = {
  name: "help",
  alias: ["cmds"],

async execute (client, message, args){

      const cmp = new MessageActionRow()
      .addComponents(
    new MessageSelectMenu()
    .setCustomId("menu_1")
    .setPlaceholder("Select a category")
    .addOptions([
      {
        label: "Action", 
        description: "Interact with other members!",
        value: "opcion_1",
        emoji: "<a:custom_emoji:1225679453926064269>",
      },
      {
        label: "NSFW", 
        description: "Commands +18!",
        value: "opcion_2",
        emoji: "<:custom_emoji:1276068807391318048>",
      },
      {
        label: "AI", 
        description: "Artificial intelligence!",
        value: "opcion_3",
        emoji: "<:knuckles:995595279879372841>",
      },
    ])
  );


  const lw = {
    content: "Select a category.",
    embeds: [{ description: "> [Support](https://discord.gg/hjbvMsB7v5)", color: sexo, author: {name: "Select a category.", icon_url: client.user.displayAvatarURL()} }],
    components: [cmp],
  };


  const msg = await message.reply(lw);

  const filtro = (interaction) => interaction.user.id === message.author.id;

   const collector = msg.createMessageComponentCollector({ filter: filtro, time: 60000 });

      collector.on("collect", async (interaction) => {
        if (interaction.customId === "menu_1") {
          if (interaction.values[0] === "opcion_1") {

        const sexoEmbed = {
      description: "**Commands (18):**\n> `baka`: Bakaa!\n> `bonk`: Give a bonk to a user.\n> `bored`: I'm bored.\n> `confused`: Confused command.\n> `cry`: What's good about it?\n> `hug`: Give a warm hug to someone.\n> `kiss`: Send a kiss to a user.\n> `nervous`: Feeling a bit nervous?\n> `pat`: Give a comforting pat.\n> `punch`: Give a strong punch.\n> `sad`: Express sadness.\n> `scream`: Let out a scream!\n> `slap`: Give a sharp slap.\n> `smile`: Share a smile.\n> `stare`: Stare intensely at someone.\n> `thinking`: Thinking hard...\n> `yeet`: Yeet someone away!\n> `yes`: Affirmative response.",
 color: sexo,
            thumbnail: {
            url: "https://media.discordapp.net/attachments/947288102270021653/1278278727465304085/aaaa-removebg-preview.png?ex=66d03955&is=66cee7d5&hm=17a71b1e6285fed74128798b940b9cf8bd139467249427c510970808317add55&=&format=webp&quality=lossless&width=365&height=345"
          }
        };
            await interaction.deferUpdate();
            await interaction.editReply({ embeds: [sexoEmbed], components: [cmp] });
            } else if (interaction.values[0] === "opcion_2") {
          const jejee = {
            description: "**Commands (5):**\n> `blowjob`: Blowjob command.\n> `hentai`: Look for complete sleeves!\n> `neko`: Neko command.\n> `waifu`: Waifu command.\n> `search`: Search r34.",
            color: sexo,
              thumbnail: {
              url: "https://media.discordapp.net/attachments/947288102270021653/1278278727465304085/aaaa-removebg-preview.png?ex=66d03955&is=66cee7d5&hm=17a71b1e6285fed74128798b940b9cf8bd139467249427c510970808317add55&=&format=webp&quality=lossless&width=365&height=345"
            }
          };
            await interaction.deferUpdate();
              await interaction.editReply({ embeds: [jejee], components: [cmp] });
            } else if (interaction.values[0] === "opcion_3") {
          const jejes = {
            description: "**Commands (3):**\n> `ai`: Artificial intelligence.\n> `imagen`: AI Image Generator\n> `say`: The bot repeats everything you say.",
            color: sexo,
            thumbnail: {
              url: "https://media.discordapp.net/attachments/947288102270021653/1278278727465304085/aaaa-removebg-preview.png?ex=66d03955&is=66cee7d5&hm=17a71b1e6285fed74128798b940b9cf8bd139467249427c510970808317add55&=&format=webp&quality=lossless&width=365&height=345"
            }
          };
            await interaction.deferUpdate();
              await interaction.editReply({ embeds: [jejes], components: [cmp] });
            }

           }
  })


 }

}
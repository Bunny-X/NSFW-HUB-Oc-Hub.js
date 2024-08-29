const Discord = require('discord.js');
const color = "cc2929";

module.exports = {
  name: "say",
  alias: [],

execute (client, message, args){

const texto = args.join(" ")
  if(!texto) {
    const a = new Discord.MessageEmbed()
    .setDescription("You have to write a message.\nMode of use: `.say [Message]`")
    .setColor(color)
    return message.reply({embeds: [a]})
  }

  message.delete().catch(err => {
    return;
  })



  message.channel.send(texto)




 }

}
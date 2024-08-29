const { Client, Intents, MessageActionRow, MessageSelectMenu } = require('discord.js');
const Discord = require("discord.js");
const fs = require('fs');
const config = require('./config.json');

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS],
});

const color = "cc2929";

const db = require('megadb');
const badlist = new db.crearDB('badlist');

client.commands = new Discord.Collection()

// Lee los archivos de comandos en la carpeta 'commands'
fs.readdir('./comandos/', (err, files) => {
  if (err) console.error(err);

  const jsFiles = files.filter(f => f.split('.').pop() === 'js');
  if (jsFiles.length <= 0) {
    console.log('No se encontraron comandos.');
    return;
  }

  jsFiles.forEach((file, i) => {
    const props = require(`./comandos/${file}`);
    console.log(`${i + 1}: ${file} cargado.`);
    client.commands.set(props.name, props);
  });
});

fs.readdir('./comandos/nsfw/', (err, files) => {
  if (err) console.error(err);

  const w = files.filter(f => f.split('.').pop() === 'js');
  if (w.length <= 0) {
    console.log('No se encontraron comandos.');
    return;
  }

   w.forEach((file, i) => {
      const props = require(`./comandos/nsfw/${file}`);
      console.log(`${i + 1}: ${file} cargado.`);
      client.commands.set(props.name, props);
    });
  });

// Evento cuando el bot está listo
client.once('ready', () => {
  console.log(`Bot está listo, logueado como ${client.user.tag}`);

    function presence() {
    client.user.setPresence({
        activities: [
          {
            name: "Type .cmds",
            type: "LISTENING"
          }
        ],
        status: "idle"
      });
    }

    presence();
  
  
});

// Evento cuando un mensaje es enviado
client.on('messageCreate', async message => {
  const prefix = '.';
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if(badlist.has(message.author.id)){
    const lol = new Discord.MessageEmbed()
    .setDescription("Blacklist = No opinion. :joy:")
    .setColor(color)
    return message.reply({embeds: [lol]})
  }

  const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.alias && cmd.alias.includes(command));
  if (cmd) {
    if (cmd.owner) {
      if (!config.ownerIDS.includes(message.author.id)) {
        const lol = new Discord.MessageEmbed()
          .setDescription(`Command only for developers.\nDevs: ${config.ownerIDS.map(ownerid => `<@${ownerid}>`).join(', ')}`)
          .setColor(color);
        return message.reply({ embeds: [lol] }).catch((err) => { console.log(("Error Found: " + err)) });
      }
    }
    cmd.execute(client, message, args);
  }
});

let cooldown = new Set();

client.on('messageCreate', async message => {

  const { Hercai } = require('hercai');
  const axios = require('axios');

  if (message.author.bot) return;
  if (!message.content.startsWith('.')) return;

  const args = message.content.slice(1).trim().split(/ +/g)
  const command = args.shift().toLowerCase()

  if(command === 'ai') {
    
    const herc = new Hercai();

    const question = args.join(' ');
    if(!question){
      const law = new Discord.MessageEmbed()
      .setDescription("<:Converter:995595217782718475> You have to write a question.\nMode of use: `.ai [question]`")
      .setColor(color)
      return message.reply({embeds: [law]})
    }

    if (cooldown.has(message.author.id)) {
      const l = new Discord.MessageEmbed()
        .setDescription(`<:Converter:995595217782718475> ${message.author}, vas demasiado rápido!`)
        .setColor(color);
      return message.reply({embeds: [l]}).then(m => {
        setTimeout(() => {
          m.delete();
        }, 3000);
      });
    }

    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);

    const msg = await message.reply("<a:custom_emoji:1215557264732332053> Generating response...")

    herc.question({ model: "v3", content: question }).then(async (response) => {
      msg.edit(response.reply)
    })
  }

  if(command === 'imagen') {
    const herc = new Hercai()

    const solictud = args.join()
    if(!solictud){
      const w = new Discord.MessageEmbed()
      .setDescription("<:Converter:995595217782718475> Give details...\nMode of use: `.imagen [details]`")
      .setColor(color)
      return message.reply({embeds: [w]})
    }

    if (cooldown.has(message.author.id)) {
      const l = new Discord.MessageEmbed()
        .setDescription(`<:Converter:995595217782718475> ${message.author}, vas demasiado rápido!`)
        .setColor(color);
      return message.reply({embeds: [l]}).then(m => {
        setTimeout(() => {
          m.delete();
        }, 3000);
      });
    }

    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);

    const msg = await message.reply("<a:custom_emoji:1215557264732332053> Generating response...")

    herc.drawImage({ model: "v3", prompt: solictud }).then(async (response) => {
  try {
        const imageResponse = await axios.get(response.url, { responseType: 'arraybuffer' });
        const imageBuffer = Buffer.from(imageResponse.data, 'binary');
        const attachment = new Discord.MessageAttachment(imageBuffer, 'image.png');

        msg.edit({ content: "Imagen Generada!", files: [attachment] }).catch(err => {
          msg.edit("Imagen inapropiada! " + err);
        });
      } catch (err) {
        msg.edit("Error descargando la imagen: " + err);
      }
    }).catch(err => {
      msg.edit("Error generando la imagen: " + err);
    });
  }
})


// Loguea el bot con el token en el archivo de configuración
const mySecret = process.env['key'];
client.login(mySecret);

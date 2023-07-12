require('dotenv').config()
const axios = require('axios');
const { GatewayIntentBits, Client, Partials} = require('discord.js');
const { Guilds, GuildMessages, MessageContent } = GatewayIntentBits;

const client = new Client({
  intents: [Guilds, GuildMessages, MessageContent],
  partials: [Partials.Channel],
})

client.on('ready', () => {
  console.log('Logged in as ' + client.user.tag);
});

client.on('messageCreate',async (msg) => {
  try {
    if (msg.author.bot) return; // ignore if msg is from bot
    if (!msg.content?.startsWith('sudip')) return; // ignore if msg doesn't start with !
    msg.react('👍');
    let { data } = await axios.post(process.env.GPT_URL, {"prompt": msg.content })
    data = data.split('\n')
    console.log('\n', msg.content, '\n' , JSON.parse(data[data.length - 1]).text, '\n')
    return msg.reply(`${JSON.parse(data[data.length - 1]).text}`);
  } catch (error) {
    console.log(error)
  }
});
  
client.login(process.env.BOT_TOKEN);
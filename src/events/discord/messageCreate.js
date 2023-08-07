"use strict";
const axios = require("axios");
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const constants_1 = require("../../utils/constants");
exports.default = async (client, message) => {
    const prefix = client.config.prefix;
    if (message.author.bot || message.channel.type !== discord_js_1.ChannelType.GuildText)
        return;
    if (client.config.blacklist && client.config.blacklist.includes(message.author.id))
        return;
    if (message.content.indexOf(prefix) !== 0)
        return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = String(args.shift()).toLowerCase();
    const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));
    if (cmd && cmd.voiceChannel) {
        if (!message.member?.voice.channel)
            return message.reply({ content: `❌ | You are not connected to an audio channel.`, allowedMentions: { repliedUser: false } });
        if (message.guild?.members.me?.voice.channel && message.member.voice.channelId !== message.guild.members.me.voice.channelId)
            return message.reply({ content: `❌ | You are not on the same audio channel as me.`, allowedMentions: { repliedUser: false } });
    }
    if (cmd) {
        console.log(`(${constants_1.cst.color.grey}${message.guild?.name}${constants_1.cst.color.white}) ${message.author.username} : ${message.content}`);
        if (cmd.sendTyping)
            message.channel.sendTyping();
        cmd.execute(client, message, args);
    }else {
        if (!message.content?.toLowerCase().startsWith('sudip')) return;
        message.react('👍');
        message.channel.sendTyping();
        let { data } = await axios.post(process.env.GPT_URL, {"prompt": message.content.replace('sudip', '')})
        data = data.split('\n');
        // console.log('\n', msg.content, '\n' , JSON.parse(data[data.length - 1]).text, '\n')
        return message.reply(`${JSON.parse(data[data.length - 1]).text}`);
    }

};

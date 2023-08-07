"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slashExecute = exports.execute = exports.options = exports.sendTyping = exports.showHelp = exports.voiceChannel = exports.usage = exports.description = exports.aliases = exports.name = void 0;
const embeds_1 = require("../embeds");
const uptime_1 = require("../utils/functions/uptime");
const sysusage_1 = require("../utils/functions/sysusage");
exports.name = 'status';
exports.aliases = ['info'];
exports.description = 'Show the bot status';
exports.usage = 'status';
exports.voiceChannel = false;
exports.showHelp = true;
exports.sendTyping = true;
exports.options = [];
const execute = async (client, message) => {
    const botPing = `${Date.now() - message.createdTimestamp}ms`;
    const sysload = await sysusage_1.sysusage.cpu();
    const systemStatus = {
        load: sysload,
        memory: sysusage_1.sysusage.ram(),
        heap: sysusage_1.sysusage.heap(),
        uptime: (0, uptime_1.uptime)(client.info.uptime),
        ping: {
            bot: botPing,
            api: client.ws.ping
        },
        serverCount: client.guilds.cache.size
    };
    return message.reply({
        embeds: [embeds_1.embeds.botStatus(client.config, client.info, systemStatus)],
        allowedMentions: { repliedUser: false }
    });
};
exports.execute = execute;
const slashExecute = async (client, interaction) => {
    const botPing = `${Date.now() - interaction.createdTimestamp}ms`;
    const sysload = await sysusage_1.sysusage.cpu();
    const systemStatus = {
        load: sysload,
        memory: sysusage_1.sysusage.ram(),
        heap: sysusage_1.sysusage.heap(),
        uptime: (0, uptime_1.uptime)(client.info.uptime),
        ping: {
            bot: botPing,
            api: client.ws.ping
        },
        serverCount: client.guilds.cache.size
    };
    return interaction.editReply({
        embeds: [embeds_1.embeds.botStatus(client.config, client.info, systemStatus)],
        allowedMentions: { repliedUser: false }
    });
};
exports.slashExecute = slashExecute;

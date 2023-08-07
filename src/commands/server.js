"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slashExecute = exports.execute = exports.options = exports.sendTyping = exports.showHelp = exports.voiceChannel = exports.usage = exports.description = exports.aliases = exports.name = void 0;
const embeds_1 = require("../embeds");
exports.name = 'server';
exports.aliases = [];
exports.description = 'Show currently active servers';
exports.usage = 'server';
exports.voiceChannel = false;
exports.showHelp = true;
exports.sendTyping = false;
exports.options = [];
const execute = async (client, message) => {
    const serverlist = client.guilds.cache
        .map(g => `Guild ID: ${g.id}\n Guild: ${g.name}\n Members: ${g.memberCount}`)
        .join('\n\n');
    return message.reply({
        embeds: [embeds_1.embeds.server(client.config, serverlist)],
        allowedMentions: { repliedUser: false }
    });
};
exports.execute = execute;
const slashExecute = async (client, interaction) => {
    const serverlist = client.guilds.cache
        .map(g => `Guild ID: ${g.id}\n Guild: ${g.name}\n Members: ${g.memberCount}`)
        .join('\n\n');
    return interaction.editReply({
        embeds: [embeds_1.embeds.server(client.config, serverlist)],
        allowedMentions: { repliedUser: false }
    });
};
exports.slashExecute = slashExecute;

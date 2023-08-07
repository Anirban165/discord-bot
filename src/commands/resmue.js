"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slashExecute = exports.execute = exports.options = exports.sendTyping = exports.showHelp = exports.voiceChannel = exports.usage = exports.description = exports.aliases = exports.name = void 0;
exports.name = 'resume';
exports.aliases = [];
exports.description = 'Resume paused track';
exports.usage = 'resume';
exports.voiceChannel = true;
exports.showHelp = true;
exports.sendTyping = false;
exports.options = [];
const execute = async (client, message) => {
    const player = client.lavashark.getPlayer(message.guild.id);
    if (!player) {
        return message.reply({ content: '❌ | There is no music currently playing.', allowedMentions: { repliedUser: false } });
    }
    if (!player.paused) {
        return message.reply({ content: '❌ | The music has been resumed.', allowedMentions: { repliedUser: false } });
    }
    const SUCCESS = await player.resume();
    return SUCCESS ? message.react('▶️') : message.react('❌');
};
exports.execute = execute;
const slashExecute = async (client, interaction) => {
    const player = client.lavashark.getPlayer(interaction.guild.id);
    if (!player) {
        return interaction.editReply({ content: '❌ | There is no music currently playing.', allowedMentions: { repliedUser: false } });
    }
    if (!player.paused) {
        return interaction.editReply({ content: '❌ | The music has been resumed.', allowedMentions: { repliedUser: false } });
    }
    const SUCCESS = await player.resume();
    return SUCCESS ? interaction.editReply("▶️ | Music resumed.") : interaction.editReply('❌ | Music pause failed.');
};
exports.slashExecute = slashExecute;

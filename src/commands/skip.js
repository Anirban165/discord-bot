"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slashExecute = exports.execute = exports.options = exports.sendTyping = exports.showHelp = exports.voiceChannel = exports.usage = exports.description = exports.aliases = exports.name = void 0;
exports.name = 'skip';
exports.aliases = ['s'];
exports.description = 'Skip currnet track';
exports.usage = 'skip';
exports.voiceChannel = true;
exports.showHelp = true;
exports.sendTyping = false;
exports.options = [];
const execute = async (client, message) => {
    const player = client.lavashark.getPlayer(message.guild.id);
    if (!player) {
        return message.reply({ content: '❌ | There is no music currently playing.', allowedMentions: { repliedUser: false } });
    }
    const SUCCESS = await player.skip();
    return SUCCESS ? message.react('👍') : message.react('❌');
};
exports.execute = execute;
const slashExecute = async (client, interaction) => {
    const player = client.lavashark.getPlayer(interaction.guild.id);
    if (!player) {
        return interaction.editReply({ content: '❌ | There is no music currently playing.', allowedMentions: { repliedUser: false } });
    }
    const SUCCESS = await player.skip();
    return SUCCESS ? interaction.editReply('✅ | Music skipped.') : interaction.editReply('❌ | Music skip failed.');
};
exports.slashExecute = slashExecute;

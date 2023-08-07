"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slashExecute = exports.execute = exports.options = exports.sendTyping = exports.showHelp = exports.voiceChannel = exports.usage = exports.description = exports.aliases = exports.name = void 0;
const dashboard_1 = require("../dashboard");
exports.name = 'volume';
exports.aliases = ['v'];
exports.description = 'Configure bot volume';
exports.usage = 'v <0-100>';
exports.voiceChannel = true;
exports.showHelp = true;
exports.sendTyping = true;
exports.options = [
    {
        name: "volume",
        description: "The volume to set",
        type: 4,
        required: true,
        min_value: 1
    }
];
const execute = async (client, message, args) => {
    const maxVolume = client.config.maxVolume;
    const player = client.lavashark.getPlayer(message.guild.id);
    if (!player) {
        return message.reply({ content: '❌ | There is no music currently playing.', allowedMentions: { repliedUser: false } });
    }
    await message.react('👍');
    const vol = parseInt(args[0], 10);
    if (!vol) {
        return message.reply({ content: `Current volume: **${player.volume}** 🔊\n**To change the volume, with \`1\` to \`${maxVolume}\` Type a number between.**`, allowedMentions: { repliedUser: false } });
    }
    if (player.volume === vol) {
        return message.reply({ content: `❌ | The volume you want to change is already the current volume.`, allowedMentions: { repliedUser: false } });
    }
    if (vol < 0 || vol > maxVolume) {
        return message.reply({ content: `❌ | **Type a number from \`1\` to \`${maxVolume}\` to change the volume .**`, allowedMentions: { repliedUser: false } });
    }
    player.filters.setVolume(vol);
    await dashboard_1.dashboard.update(client, player, player.current);
    return message.reply({ content: `🔊 **${vol}**/**${maxVolume}**%`, allowedMentions: { repliedUser: false } });
};
exports.execute = execute;
const slashExecute = async (client, interaction) => {
    const maxVolume = client.config.maxVolume;
    const player = client.lavashark.getPlayer(interaction.guild.id);
    if (!player) {
        return interaction.editReply({ content: '❌ | There is no music currently playing.', allowedMentions: { repliedUser: false } });
    }
    const vol = Math.floor(interaction.options.getInteger("volume"));
    if (!vol) {
        return interaction.editReply({ content: `Current volume: **${player.volume}** 🔊\n**To change the volume, with \`1\` to \`${maxVolume}\` Type a number between.**`, allowedMentions: { repliedUser: false } });
    }
    if (player.volume === vol) {
        return interaction.editReply({ content: `❌ | The volume you want to change is already the current volume.`, allowedMentions: { repliedUser: false } });
    }
    if (vol < 0 || vol > maxVolume) {
        return interaction.editReply({ content: `❌ | **Type a number from \`1\` to \`${maxVolume}\` to change the volume .**`, allowedMentions: { repliedUser: false } });
    }
    player.filters.setVolume(vol);
    await dashboard_1.dashboard.update(client, player, player.current);
    return interaction.editReply({ content: `🔊 **${vol}**/**${maxVolume}**%`, allowedMentions: { repliedUser: false } });
};
exports.slashExecute = slashExecute;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slashExecute = exports.execute = exports.options = exports.sendTyping = exports.showHelp = exports.voiceChannel = exports.usage = exports.description = exports.aliases = exports.name = void 0;
const timeToSeconds_1 = require("../utils/functions/timeToSeconds");
exports.name = 'seek';
exports.aliases = [];
exports.description = 'Seeks to a certain time in the track';
exports.usage = 'seek <[hh]mm]ss/[hh:mm]:ss> (ex: 3m20s, 1:20:55)';
exports.voiceChannel = true;
exports.showHelp = true;
exports.sendTyping = true;
exports.options = [
    {
        name: "seek",
        description: "traget time (ex: 3m20s, 1:20:55)",
        type: 3,
        required: true
    }
];
const execute = async (client, message, args) => {
    const player = client.lavashark.getPlayer(message.guild.id);
    if (!player) {
        return message.reply({ content: '❌ | There is no music currently playing.', allowedMentions: { repliedUser: false } });
    }
    const str = args.join(' ');
    const tragetTime = (0, timeToSeconds_1.timeToSeconds)(str);
    if (!tragetTime) {
        return message.reply({ content: `❌ | Invalid format for the target time.\n(**\`ex: 3m20s, 1m 50s, 1:20:55, 5:20\`**)`, allowedMentions: { repliedUser: false } });
    }
    const tragetTimeMs = tragetTime * 1000;
    await message.react('👍');
    await player.seek(tragetTimeMs);
    if (tragetTimeMs >= player.current.duration.value) {
        return message.reply({ content: `✅ | The seek position is beyond the duration of this track. (\`${player.current.duration.label}\`)\nSkipping to the next song.`, allowedMentions: { repliedUser: false } });
    }
    else {
        return message.reply({ content: `✅ | Music has been seeked to \`${str}\`.`, allowedMentions: { repliedUser: false } });
    }
};
exports.execute = execute;
const slashExecute = async (client, interaction) => {
    const player = client.lavashark.getPlayer(interaction.guild.id);
    if (!player) {
        return interaction.editReply({ content: '❌ | There is no music currently playing.', allowedMentions: { repliedUser: false } });
    }
    const str = interaction.options.getString("seek");
    const tragetTime = (0, timeToSeconds_1.timeToSeconds)(str);
    if (!tragetTime) {
        return interaction.editReply({ content: `❌ | Invalid format for the target time.\n(**\`ex: 3m20s, 1m 50s, 1:20:55, 5:20\`**)`, allowedMentions: { repliedUser: false } });
    }
    const tragetTimeMs = tragetTime * 1000;
    await player.seek(tragetTimeMs);
    if (tragetTimeMs >= player.current.duration.value) {
        return interaction.editReply({ content: `✅ | The seek position is beyond the duration of this track. (\`${player.current.duration.label}\`)\nSkipping to the next song.`, allowedMentions: { repliedUser: false } });
    }
    else {
        return interaction.editReply({ content: `✅ | Music has been seeked to \`${str}\`.`, allowedMentions: { repliedUser: false } });
    }
};
exports.slashExecute = slashExecute;

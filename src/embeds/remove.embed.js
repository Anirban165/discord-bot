"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeTrack = exports.removeList = void 0;
const discord_js_1 = require("discord.js");
const removeList = (embedsColor, nowPlaying, queueList, repeatMode) => {
    const embed_ = new discord_js_1.EmbedBuilder()
        .setColor(embedsColor)
        .setTitle('Remove List')
        .addFields({ name: nowPlaying, value: queueList })
        .setTimestamp()
        .setFooter({ text: `Loop: ${repeatMode}` });
    return embed_;
};
exports.removeList = removeList;
const removeTrack = (embedsColor, musicTitle) => {
    const embed_ = new discord_js_1.EmbedBuilder()
        .setColor(embedsColor)
        .setTitle('Removed Music')
        .setDescription(musicTitle)
        .setTimestamp();
    return embed_;
};
exports.removeTrack = removeTrack;

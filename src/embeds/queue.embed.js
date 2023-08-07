"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queue = exports.addPlaylist = exports.addTrack = void 0;
const discord_js_1 = require("discord.js");
const addTrack = (embedsColor, title, subtitle, url, thumbnail) => {
    const embed_ = new discord_js_1.EmbedBuilder()
        .setColor(embedsColor)
        .setTitle(title)
        .setURL(url)
        .setThumbnail(thumbnail)
        .addFields({ name: 'Added Track', value: subtitle, inline: true })
        .setTimestamp();
    return embed_;
};
exports.addTrack = addTrack;
const addPlaylist = (embedsColor, title, subtitle, url, thumbnail) => {
    const embed_ = new discord_js_1.EmbedBuilder()
        .setColor(embedsColor)
        .setTitle(title)
        .setURL(url)
        .setThumbnail(thumbnail)
        .addFields({ name: 'Added Playlist', value: subtitle, inline: true })
        .setTimestamp();
    return embed_;
};
exports.addPlaylist = addPlaylist;
const queue = (embedsColor, nowPlaying, queueList, repeatMode) => {
    const embed_ = new discord_js_1.EmbedBuilder()
        .setColor(embedsColor)
        .setTitle('Queue List')
        .addFields({ name: nowPlaying, value: queueList })
        .setTimestamp()
        .setFooter({ text: `Loop: ${repeatMode}` });
    return embed_;
};
exports.queue = queue;

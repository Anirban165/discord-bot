"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboard = exports.disconnect = exports.connected = void 0;
const discord_js_1 = require("discord.js");
const connected = (embedsColor) => {
    const embed_ = new discord_js_1.EmbedBuilder()
        .setColor(embedsColor)
        .setDescription('Voice channel connected successfully.');
    return embed_;
};
exports.connected = connected;
const disconnect = (embedsColor) => {
    const embed_ = new discord_js_1.EmbedBuilder()
        .setColor(embedsColor)
        .setDescription('Finished playing.');
    return embed_;
};
exports.disconnect = disconnect;
const dashboard = (embedsColor, status, title, subtitle, url, thumbnail) => {
    const embed_ = new discord_js_1.EmbedBuilder()
        .setColor(embedsColor)
        .setTitle(title)
        .setURL(url)
        .setThumbnail(thumbnail)
        .addFields({ name: status, value: subtitle })
        .setTimestamp();
    return embed_;
};
exports.dashboard = dashboard;

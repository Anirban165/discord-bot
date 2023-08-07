"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.save = void 0;
const discord_js_1 = require("discord.js");
const save = (embedsColor, title, subtitle, url, thumbnail) => {
    const embed_ = new discord_js_1.EmbedBuilder()
        .setColor(embedsColor)
        .setTitle(title)
        .setURL(url)
        .setThumbnail(thumbnail)
        .setDescription(subtitle)
        .setTimestamp();
    return embed_;
};
exports.save = save;

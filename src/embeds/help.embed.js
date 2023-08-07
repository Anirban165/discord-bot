"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.help = void 0;
const discord_js_1 = require("discord.js");
const help = (embedsColor, command, description) => {
    const embed_ = new discord_js_1.EmbedBuilder()
        .setColor(embedsColor)
        .setTitle(`Command **${command}**`)
        .setDescription(description);
    return embed_;
};
exports.help = help;

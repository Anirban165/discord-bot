"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ping = void 0;
const discord_js_1 = require("discord.js");
const ping = (embedsColor, botPing, apiPing) => {
    const embed_ = new discord_js_1.EmbedBuilder()
        .setColor(embedsColor)
        .setTitle('🛰️ LATENCY')
        .setDescription(`Bot : **${botPing}**\nAPI : **${apiPing}ms**`);
    return embed_;
};
exports.ping = ping;

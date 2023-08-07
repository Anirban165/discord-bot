"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const discord_js_1 = require("discord.js");
const server = (config, serverlist) => {
    const embed_ = new discord_js_1.EmbedBuilder()
        .setColor(config.embedsColor)
        .setTitle(`Servers that have **${config.name}**`)
        .setDescription(serverlist);
    return embed_;
};
exports.server = server;

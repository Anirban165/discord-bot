"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodesStatus = exports.botStatus = void 0;
const discord_js_1 = require("discord.js");
const botStatus = (config, info, systemStatus) => {
    const cpuUsage = `${systemStatus.load.percent}  \`${systemStatus.load.detail}\``;
    const ramUsage = `${systemStatus.memory.percent}  \`${systemStatus.memory.detail}\``;
    const heapUsage = `${systemStatus.heap.percent}  \`${systemStatus.heap.detail}\``;
    const embed_ = new discord_js_1.EmbedBuilder()
        .setColor(config.embedsColor)
        .setTitle(`${config.name} ${info.bot_version}`)
        .setURL('https://github.com/hmes98318/Music-Disc')
        .setDescription(`**• Serving ${systemStatus.serverCount} servers**\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━`)
        .addFields({ name: `⚙️ SYSTEM`, value: `OS : **${info.os_version}**\nNode.js : **${info.node_version}**\nDiscord.js : **${info.dc_version}**\nLavaShark : **${info.shark_version}**\nCPU : **${info.cpu}**\nUptime : **${systemStatus.uptime}**\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━`, inline: false }, { name: `📊 USAGE`, value: `CPU : **${cpuUsage}**\nRam : **${ramUsage}**\nHeap : **${heapUsage}**\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━`, inline: false }, { name: `🛰️ LATENCY`, value: `Bot : **${systemStatus.ping.bot}**\nAPI : **${systemStatus.ping.api}ms**`, inline: false })
        .setTimestamp();
    return embed_;
};
exports.botStatus = botStatus;
const nodesStatus = (embedsColor, nodeHealth, nodesStatus) => {
    const embed_ = new discord_js_1.EmbedBuilder()
        .setColor(embedsColor)
        .setTitle(`🛰️ Nodes Status`)
        .setDescription(`**${nodeHealth}**\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━`)
        .addFields(nodesStatus)
        .setTimestamp();
    return embed_;
};
exports.nodesStatus = nodesStatus;

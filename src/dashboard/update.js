"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = void 0;
const discord_js_1 = require("discord.js");
const constants_1 = require("../utils/constants");
const embeds_1 = require("../embeds");
async function update(client, player, track) {
    const playing = !(player.paused);
    const methods = ['Off', 'Single', 'All'];
    const repeatMode = player.repeatMode;
    const volume = player.volume;
    const subtitle = `Author : **${track?.author}**\nDuration **${track?.duration.label}**\n`
        + `────────────────────\n`
        + `Volume: \`${volume}%\` | Loop: \`${methods[repeatMode]}\``;
    const playPauseButton = new discord_js_1.ButtonBuilder().setCustomId('Dashboard-PlayPause').setEmoji(playing ? constants_1.cst.button.pause : constants_1.cst.button.play).setStyle(playing ? discord_js_1.ButtonStyle.Secondary : discord_js_1.ButtonStyle.Success);
    const skipButton = new discord_js_1.ButtonBuilder().setCustomId('Dashboard-Skip').setEmoji(constants_1.cst.button.skip).setStyle(discord_js_1.ButtonStyle.Secondary);
    const stopButton = new discord_js_1.ButtonBuilder().setCustomId('Dashboard-Stop').setEmoji(constants_1.cst.button.stop).setStyle(discord_js_1.ButtonStyle.Danger);
    const loopButton = new discord_js_1.ButtonBuilder().setCustomId('Dashboard-Loop').setEmoji(constants_1.cst.button.loop).setStyle(discord_js_1.ButtonStyle.Secondary);
    const shuffleButton = new discord_js_1.ButtonBuilder().setCustomId('Dashboard-Shuffle').setEmoji(constants_1.cst.button.shuffle).setStyle(discord_js_1.ButtonStyle.Secondary);
    const row = new discord_js_1.ActionRowBuilder().addComponents(playPauseButton, skipButton, stopButton, loopButton, shuffleButton);
    await player.dashboard.edit({
        embeds: [embeds_1.embeds.dashboard(client.config.embedsColor, 'Dashboard', track.title, subtitle, track.uri, track.thumbnail)],
        components: [row]
    });
}
exports.update = update;

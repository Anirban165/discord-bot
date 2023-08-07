"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dashboard_1 = require("../../dashboard");
const embeds_1 = require("../../embeds");
exports.default = async (client, player, tracks) => {
    if (player.playing) {
        if (Array.isArray(tracks)) { // PLAYLIST_LOADED
            const playlist = tracks;
            const subtitle = `Author : **${playlist[0]?.author}**\nDuration **${playlist[0]?.duration.label}**\n`;
            await player.metadata?.channel?.send({ embeds: [embeds_1.embeds.addPlaylist(client.config.embedsColor, playlist[0].title, subtitle, playlist[0].uri, playlist[0].thumbnail)] });
        }
        else {
            const track = tracks;
            const subtitle = `Author : **${track?.author}**\nDuration **${track?.duration.label}**\n`;
            await player.metadata?.channel?.send({ embeds: [embeds_1.embeds.addTrack(client.config.embedsColor, track.title, subtitle, track.uri, track.thumbnail)] });
        }
        try {
            await player.dashboard?.delete();
        }
        catch (error) {
            console.log('Dashboard delete error:', error);
        }
        await dashboard_1.dashboard.initial(client, player.metadata, player);
        await dashboard_1.dashboard.update(client, player, player.current);
    }
};

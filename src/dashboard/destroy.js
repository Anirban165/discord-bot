"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.destroy = void 0;
const embeds_1 = require("../embeds");
async function destroy(player, embedsColor) {
    try {
        await player.dashboard.edit({
            embeds: [embeds_1.embeds.disconnect(embedsColor)],
            components: []
        });
    }
    catch (error) {
        console.log('Dashboard error:', error);
    }
    finally {
        player.dashboard = null;
    }
}
exports.destroy = destroy;

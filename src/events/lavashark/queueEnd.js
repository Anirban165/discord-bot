"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dashboard_1 = require("../../dashboard");
exports.default = async (client, player) => {
    if (client.config.autoLeave) {
        await player.destroy();
    }
    await dashboard_1.dashboard.destroy(player, client.config.embedsColor);
};

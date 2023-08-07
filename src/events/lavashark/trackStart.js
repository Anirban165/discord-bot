"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dashboard_1 = require("../../dashboard");
exports.default = async (client, player /*, track: Track*/) => {
    // console.log('// -------- track start -------- //');
    const track = player.current; //--------------------------
    await dashboard_1.dashboard.update(client, player, track);
};

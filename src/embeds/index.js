"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.embeds = void 0;
const dashboard_embed_1 = require("./dashboard.embed");
const help_embed_1 = require("./help.embed");
const ping_embed_1 = require("./ping.embed");
const queue_embed_1 = require("./queue.embed");
const remove_embed_1 = require("./remove.embed");
const save_embed_1 = require("./save.embed");
const server_embed_1 = require("./server.embed");
const status_embed_1 = require("./status.embed");
const embeds = {
    addTrack: queue_embed_1.addTrack,
    addPlaylist: queue_embed_1.addPlaylist,
    botStatus: status_embed_1.botStatus,
    connected: dashboard_embed_1.connected,
    dashboard: dashboard_embed_1.dashboard,
    disconnect: dashboard_embed_1.disconnect,
    help: help_embed_1.help,
    nodesStatus: status_embed_1.nodesStatus,
    ping: ping_embed_1.ping,
    queue: queue_embed_1.queue,
    removeList: remove_embed_1.removeList,
    removeTrack: remove_embed_1.removeTrack,
    save: save_embed_1.save,
    server: server_embed_1.server,
};
exports.embeds = embeds;

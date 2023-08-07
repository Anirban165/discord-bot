"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initial = void 0;
const discord_js_1 = require("discord.js");
const embeds_1 = require("../embeds");
async function initial(client, interactionOrMessage, player) {
    let channel;
    if (interactionOrMessage instanceof discord_js_1.Message) {
        channel = interactionOrMessage.channel;
    }
    else if (interactionOrMessage instanceof discord_js_1.ChatInputCommandInteraction) {
        channel = interactionOrMessage.channel;
    }
    else {
        throw new TypeError("Invalid Interaction or Message type");
    }
    player.dashboard = await channel.send({
        embeds: [embeds_1.embeds.connected(client.config.embedsColor)],
        components: []
    });
}
exports.initial = initial;

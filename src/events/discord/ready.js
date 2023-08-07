"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const os_1 = __importDefault(require("os"));
const discord_js_1 = require("discord.js");
const lavashark_1 = require("lavashark");
const package_json_1 = require("../../../package.json");
const getOSVersion_1 = require("../../utils/functions/getOSVersion");
const constants_1 = require("../../utils/constants");
module.exports = async (client) => {
    client.info = {
        uptime: new Date(),
        os_version: await (0, getOSVersion_1.getOSVersion)(),
        bot_version: `v${package_json_1.version}`,
        node_version: process.version,
        dc_version: `v${discord_js_1.version}`,
        shark_version: `v${lavashark_1.VERSION}`,
        cpu: `${os_1.default.cpus()[0].model}`
    };
    const release = {
        bot: `${client.config.name}: ${constants_1.cst.color.cyan}${client.info.bot_version}${constants_1.cst.color.white}`,
        nodejs: `Node.js:    ${constants_1.cst.color.cyan}${client.info.node_version}${constants_1.cst.color.white}`,
        djs: `Discord.js: ${constants_1.cst.color.cyan}${client.info.dc_version}${constants_1.cst.color.white}`,
        shark: `LavaShark:  ${constants_1.cst.color.cyan}${client.info.shark_version}${constants_1.cst.color.white}`,
    };
    console.log(`+-----------------------+`);
    console.log(`| ${release.bot.padEnd(30, ' ')} |`);
    console.log(`| ${release.nodejs.padEnd(30, ' ')} |`);
    console.log(`| ${release.djs.padEnd(30, ' ')} |`);
    console.log(`| ${release.shark.padEnd(30, ' ')} |`);
    console.log(`+-----------------------+`);
    client.application?.commands.set(client.commands.map(cmd => {
        return {
            name: cmd.name,
            description: cmd.description,
            options: cmd.options
        };
    }));
    client.lavashark.start(String(client.user?.id));
    client.user?.setActivity(client.config.playing);
    console.log(`>>> Logged in as ${client.user?.username}`);
};

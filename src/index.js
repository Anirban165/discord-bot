"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const dotenv = __importStar(require("dotenv"));
const discord_js_1 = require("discord.js");
const lavashark_1 = require("lavashark");
const console_stamp_1 = __importDefault(require("console-stamp"));
const constants_1 = require("./utils/constants");
const node_list_json_1 = __importDefault(require("../node-list.json"));
;
;
dotenv.config();
(0, console_stamp_1.default)(console, { format: ':date(yyyy/mm/dd HH:MM:ss)' });
let client = new discord_js_1.Client({
    intents: [
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildMembers,
        discord_js_1.GatewayIntentBits.GuildMessages,
        discord_js_1.GatewayIntentBits.MessageContent,
        discord_js_1.GatewayIntentBits.GuildVoiceStates,
    ]
});
client.commands = new discord_js_1.Collection();
client.lavashark = new lavashark_1.LavaShark({
    nodes: node_list_json_1.default,
    sendWS: (guildId, payload) => { client.guilds.cache.get(guildId)?.shard.send(payload); }
});
client.config = constants_1.cst.config;
const setEnvironment = () => {
    return new Promise((resolve, _reject) => {
        client.config.name = process.env.BOT_NAME ?? client.config.name;
        client.config.prefix = process.env.PREFIX ?? client.config.prefix;
        client.config.playing = process.env.PLAYING ?? client.config.playing;
        client.config.defaultVolume = Number(process.env.DEFAULT_VOLUME) ?? client.config.defaultVolume;
        client.config.maxVolume = Number(process.env.MAX_VOLUME) ?? client.config.maxVolume;
        client.config.autoLeave = process.env.AUTO_LEAVE === 'true' ?? client.config.autoLeave;
        client.config.autoLeaveCooldown = Number(process.env.AUTO_LEAVE_COOLDOWN) ?? client.config.autoLeaveCooldown;
        client.config.displayVoiceState = process.env.DISPLAY_VOICE_STATE === 'true' ?? client.config.displayVoiceState;
        client.config.port = Number(process.env.PORT) ?? client.config.port;
        // console.log('setEnvironment: ', client.config);
        resolve();
    });
};
const loadEvents = () => {
    console.log(`-> loading Events ......`);
    return new Promise(async (resolve, reject) => {
        const events = fs.readdirSync(`${__dirname}/events/discord/`);
        console.log(`+--------------------------------+`);
        for (const file of events) {
            try {
                const event = await Promise.resolve(`${`${__dirname}/events/discord/${file}`}`).then(s => __importStar(require(s)));
                const eventName = file.split('.')[0];
                client.on(eventName, event.default.bind(null, client));
                console.log(`| Loaded event ${file.split('.')[0].padEnd(17, ' ')} |`);
            }
            catch (error) {
                reject(error);
            }
        }
        console.log(`+--------------------------------+`);
        console.log(`${constants_1.cst.color.grey}-- loading Events finished --${constants_1.cst.color.white}`);
        resolve();
    });
};
const loadLavaSharkEvents = () => {
    console.log(`-> loading LavaShark Events ......`);
    return new Promise(async (resolve, reject) => {
        const events = fs.readdirSync(`${__dirname}/events/lavashark/`);
        console.log(`+--------------------------------+`);
        for (const file of events) {
            try {
                const event = await Promise.resolve(`${`${__dirname}/events/lavashark/${file}`}`).then(s => __importStar(require(s)));
                const eventName = file.split('.')[0];
                client.lavashark.on(eventName, event.default.bind(null, client));
                console.log(`| Loaded event ${file.split('.')[0].padEnd(17, ' ')} |`);
            }
            catch (error) {
                reject(error);
            }
        }
        console.log(`+--------------------------------+`);
        console.log(`${constants_1.cst.color.grey}-- loading LavaShark Events finished --${constants_1.cst.color.white}`);
        resolve();
    });
};
const loadCommands = () => {
    console.log(`-> loading Commands ......`);
    return new Promise(async (resolve, reject) => {
        const jsFiles = fs.readdirSync(`${__dirname}/commands/`);
        console.log(`+--------------------------------+`);
        for (const file of jsFiles) {
            try {
                const command = await Promise.resolve(`${`${__dirname}/commands/${file}`}`).then(s => __importStar(require(s)));
                client.commands.set(command.name.toLowerCase(), command);
                console.log(`| Loaded Command ${command.name.toLowerCase().padEnd(15, ' ')} |`);
            }
            catch (error) {
                reject(error);
            }
        }
        console.log(`+--------------------------------+`);
        console.log(`${constants_1.cst.color.grey}-- loading Commands finished --${constants_1.cst.color.white}`);
        resolve();
    });
};
const checkNodesStats = async (nodes) => {
    console.log(`-> Checking stats for all nodes ......`);
    const pingList = await client.lavashark.nodesPing();
    console.log(`+--------------------------------+`);
    for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const ping = pingList[i];
        if (ping === -1) {
            console.log(`| ${node.identifier}: ${constants_1.cst.color.red}DISCONNECTED${constants_1.cst.color.white}`.padEnd(42, ' ') + '|');
        }
        else {
            console.log(`| ${node.identifier}: ${constants_1.cst.color.green}CONNECTED${constants_1.cst.color.white}${constants_1.cst.color.grey} (${ping}ms)${constants_1.cst.color.white}`.padEnd(50, ' ') + '|');
        }
    }
    console.log(`+--------------------------------+`);
    console.log(`${constants_1.cst.color.grey}-- All node stats have been checked --${constants_1.cst.color.white}`);
};
const loadBlacklist = async () => {
    try {
        const jsonString = fs.readFileSync('blacklist.json', 'utf-8');
        const blacklistArray = JSON.parse(jsonString);
        if (Array.isArray(blacklistArray) && blacklistArray.length > 0) {
            client.config.blacklist = blacklistArray;
            console.log('Blacklist loaded:', client.config.blacklist.length, 'users');
        }
        else {
            console.log('No blacklist entries found.');
        }
    }
    catch (error) {
        console.error('Error loading blacklist:', error);
    }
};
Promise.resolve()
    .then(() => setEnvironment())
    .then(() => loadEvents())
    .then(() => loadLavaSharkEvents())
    .then(() => loadCommands())
    .then(() => checkNodesStats(client.lavashark.nodes))
    .then(() => loadBlacklist())
    .then(() => {
    console.log(`${constants_1.cst.color.green}*** All loaded successfully ***${constants_1.cst.color.white}`);
    client.login(process.env.TOKEN);
});
process.on('unhandledRejection', (error) => {
    console.error('Unhandled promise rejection:', error);
});

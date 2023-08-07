"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slashExecute = exports.execute = exports.options = exports.sendTyping = exports.showHelp = exports.voiceChannel = exports.usage = exports.description = exports.aliases = exports.name = void 0;
const discord_js_1 = require("discord.js");
const dashboard_1 = require("../dashboard");
exports.name = 'search';
exports.aliases = ['find'];
exports.description = 'Enter song name to search';
exports.usage = 'search <URL/song name>';
exports.voiceChannel = true;
exports.showHelp = true;
exports.sendTyping = true;
exports.options = [
    {
        name: "search",
        description: "The song name",
        type: 3,
        required: true
    }
];
const execute = async (client, message, args) => {
    if (!args[0]) {
        return message.reply({ content: `❌ | Write the name of the music you want to search.`, allowedMentions: { repliedUser: false } });
    }
    const str = args.join(' ');
    const res = await client.lavashark.search(str);
    if (res.loadType === "LOAD_FAILED") {
        console.log(`Search Error: ${res.exception?.message}`);
        return message.reply({ content: `❌ | No results found.`, allowedMentions: { repliedUser: false } });
    }
    else if (res.loadType === "NO_MATCHES") {
        return message.reply({ content: `❌ | No matches.`, allowedMentions: { repliedUser: false } });
    }
    // Creates the audio player
    const player = client.lavashark.createPlayer({
        guildId: String(message.guild?.id),
        voiceChannelId: String(message.member?.voice.channelId),
        textChannelId: message.channel.id,
        selfDeaf: true
    });
    try {
        // Connects to the voice channel
        await player.connect();
        player.metadata = message;
        // Intial dashboard
        if (!player.dashboard)
            await dashboard_1.dashboard.initial(client, message, player);
    }
    catch (error) {
        console.log(error);
        await dashboard_1.dashboard.destroy(player, client.config.embedsColor);
        return message.reply({ content: `❌ | I can't join voice channel.`, allowedMentions: { repliedUser: false } });
    }
    await message.react('👍');
    if (res.loadType === 'PLAYLIST_LOADED') {
        player.addTracks(res.tracks, message.author);
        if (!player.playing) {
            await player.play()
                .catch(async (error) => {
                console.log(error);
                await message.reply({ content: `❌ | The service is experiencing some problems, please try again.`, allowedMentions: { repliedUser: false } });
                return await player.destroy();
            });
            player.filters.setVolume(client.config.defaultVolume);
        }
        return message.reply({ content: "✅ | Music added.", allowedMentions: { repliedUser: false } });
    }
    else if (res.tracks.length === 1) {
        const track = res.tracks[0];
        player.addTracks(track, message.author);
        if (!player.playing) {
            await player.play()
                .catch(async (error) => {
                console.log(error);
                await message.reply({ content: `❌ | The service is experiencing some problems, please try again.`, allowedMentions: { repliedUser: false } });
                return await player.destroy();
            });
            player.filters.setVolume(client.config.defaultVolume);
        }
        return message.reply({ content: "✅ | Music added.", allowedMentions: { repliedUser: false } });
    }
    else {
        let select = new discord_js_1.StringSelectMenuBuilder()
            .setCustomId("musicSelect")
            .setPlaceholder("Select the music")
            .setOptions(res.tracks.map(x => {
            return {
                label: x.title.length >= 25 ? x.title.substring(0, 22) + "..." : x.title,
                description: `Duration: ${x.duration.label}`,
                value: x.uri
            };
        }));
        let row = new discord_js_1.ActionRowBuilder().addComponents(select);
        let msg = await message.reply({ components: [row.toJSON()] });
        const collector = msg.createMessageComponentCollector({
            time: 20000,
            filter: i => i.user.id === message.author.id
        });
        collector.on("collect", async (i) => {
            if (i.customId != "musicSelect")
                return;
            player.addTracks(res.tracks.find(x => x.uri == i.values[0]), message.author);
            if (!player.playing) {
                await player.play()
                    .catch(async (error) => {
                    console.log(error);
                    await message.reply({ content: `❌ | The service is experiencing some problems, please try again.`, allowedMentions: { repliedUser: false } });
                    return await player.destroy();
                });
                player.filters.setVolume(client.config.defaultVolume);
            }
            i.deferUpdate();
            await msg.edit({ content: "✅ | Music added.", components: [], allowedMentions: { repliedUser: false } });
        });
        collector.on("end", async (collected, reason) => {
            if (reason == "time" && collected.size == 0) {
                if (!player.playing)
                    await player.destroy();
                await msg.edit({ content: "❌ | Time expired.", components: [], allowedMentions: { repliedUser: false } });
            }
        });
    }
};
exports.execute = execute;
const slashExecute = async (client, interaction) => {
    const str = interaction.options.getString("search");
    const res = await client.lavashark.search(str);
    if (res.loadType === "LOAD_FAILED") {
        console.log(`Search Error: ${res.exception?.message}`);
        return interaction.editReply({ content: `❌ | No results found.`, allowedMentions: { repliedUser: false } });
    }
    else if (res.loadType === "NO_MATCHES") {
        return interaction.editReply({ content: `❌ | No matches.`, allowedMentions: { repliedUser: false } });
    }
    const guildMember = interaction.guild.members.cache.get(interaction.user.id);
    const { channel } = guildMember.voice;
    // Creates the audio player
    const player = client.lavashark.createPlayer({
        guildId: String(interaction.guild?.id),
        voiceChannelId: String(channel?.id),
        textChannelId: interaction.channel?.id,
        selfDeaf: true
    });
    try {
        // Connects to the voice channel
        await player.connect();
        player.metadata = interaction;
        // Intial dashboard
        if (!player.dashboard)
            await dashboard_1.dashboard.initial(client, interaction, player);
    }
    catch (error) {
        console.log(error);
        await dashboard_1.dashboard.destroy(player, client.config.embedsColor);
        return interaction.editReply({ content: `❌ | I can't join voice channel.`, allowedMentions: { repliedUser: false } });
    }
    if (res.loadType === 'PLAYLIST_LOADED') {
        player.addTracks(res.tracks, interaction.user);
        if (!player.playing) {
            await player.play()
                .catch(async (error) => {
                console.log(error);
                await interaction.reply({ content: `❌ | The service is experiencing some problems, please try again.`, allowedMentions: { repliedUser: false } });
                return await player.destroy();
            });
            player.filters.setVolume(client.config.defaultVolume);
        }
        return interaction.editReply({ content: "✅ | Music added.", allowedMentions: { repliedUser: false } });
    }
    else if (res.tracks.length === 1) {
        const track = res.tracks[0];
        player.addTracks(track, interaction.user);
        if (!player.playing) {
            await player.play()
                .catch(async (error) => {
                console.log(error);
                await interaction.reply({ content: `❌ | The service is experiencing some problems, please try again.`, allowedMentions: { repliedUser: false } });
                return await player.destroy();
            });
            player.filters.setVolume(client.config.defaultVolume);
        }
        return interaction.editReply({ content: "✅ | Music added.", allowedMentions: { repliedUser: false } });
    }
    else {
        let select = new discord_js_1.StringSelectMenuBuilder()
            .setCustomId("musicSelect")
            .setPlaceholder("Select the music")
            .setOptions(res.tracks.map(x => {
            return {
                label: x.title.length >= 25 ? x.title.substring(0, 22) + "..." : x.title,
                description: `Duration: ${x.duration.label}`,
                value: x.uri
            };
        }));
        let row = new discord_js_1.ActionRowBuilder().addComponents(select);
        let msg = await interaction.editReply({ components: [row.toJSON()] });
        const collector = msg.createMessageComponentCollector({
            time: 20000,
            filter: i => i.user.id === interaction.user.id
        });
        collector.on("collect", async (i) => {
            if (i.customId != "musicSelect")
                return;
            player.addTracks(res.tracks.find(x => x.uri == i.values[0]), interaction.user);
            if (!player.playing) {
                await player.play()
                    .catch(async (error) => {
                    console.log(error);
                    await interaction.editReply({ content: `❌ | The service is experiencing some problems, please try again.`, allowedMentions: { repliedUser: false } });
                    return await player.destroy();
                });
                player.filters.setVolume(client.config.defaultVolume);
            }
            i.deferUpdate();
            await msg.edit({ content: "✅ | Music added.", components: [], allowedMentions: { repliedUser: false } });
        });
        collector.on("end", async (collected, reason) => {
            if (reason == "time" && collected.size == 0) {
                if (!player.playing)
                    await player.destroy();
                await msg.edit({ content: "❌ | Time expired.", components: [], allowedMentions: { repliedUser: false } });
            }
        });
    }
};
exports.slashExecute = slashExecute;

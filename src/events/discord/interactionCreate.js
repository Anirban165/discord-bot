"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const lavashark_1 = require("lavashark");
const constants_1 = require("../../utils/constants");
const embeds_1 = require("../../embeds");
const dashboard_1 = require("../../dashboard");
exports.default = async (client, interaction) => {
    if (client.config.blacklist && client.config.blacklist.includes(interaction.user.id))
        return;
    const guildMember = interaction.guild.members.cache.get(interaction.user.id);
    const voiceChannel = guildMember.voice.channel;
    if (interaction.isButton()) {
        if (!voiceChannel) {
            return interaction.reply({ content: `❌ | You are not connected to an audio channel.`, ephemeral: true, components: [] });
        }
        if (interaction.guild?.members.me?.voice.channel && voiceChannel.id !== interaction.guild.members.me.voice.channelId) {
            return interaction.reply({ content: `❌ | You are not on the same audio channel as me.`, ephemeral: true, components: [] });
        }
        const player = client.lavashark.getPlayer(interaction.guild.id);
        if (!player) {
            return interaction.reply({ content: '❌ | There is no music currently playing.', allowedMentions: { repliedUser: false } });
        }
        switch (interaction.customId) {
            case 'musicSave': {
                const track = player.current;
                const subtitle = `Author : **${track?.author}**\nDuration **${track?.duration.label}**\n`;
                guildMember?.send({ embeds: [embeds_1.embeds.save(client.config.embedsColor, track.title, subtitle, track.uri, track.thumbnail)] })
                    .then(() => {
                    return interaction.reply({ content: `✅ | I sent you the name of the music in a private message.`, ephemeral: true, components: [] });
                })
                    .catch((error) => {
                    console.log('error:', error);
                    return interaction.reply({ content: `❌ | I can't send you a private message.`, ephemeral: true, components: [] });
                });
                break;
            }
            case 'Dashboard-PlayPause': {
                const playing = !(player.paused);
                if (playing) {
                    player.pause();
                }
                else {
                    player.resume();
                }
                const playPauseButton = new discord_js_1.ButtonBuilder().setCustomId('Dashboard-PlayPause').setEmoji(!playing ? constants_1.cst.button.pause : constants_1.cst.button.play).setStyle(!playing ? discord_js_1.ButtonStyle.Secondary : discord_js_1.ButtonStyle.Success);
                const skipButton = new discord_js_1.ButtonBuilder().setCustomId('Dashboard-Skip').setEmoji(constants_1.cst.button.skip).setStyle(discord_js_1.ButtonStyle.Secondary);
                const stopButton = new discord_js_1.ButtonBuilder().setCustomId('Dashboard-Stop').setEmoji(constants_1.cst.button.stop).setStyle(discord_js_1.ButtonStyle.Danger);
                const loopButton = new discord_js_1.ButtonBuilder().setCustomId('Dashboard-Loop').setEmoji(constants_1.cst.button.loop).setStyle(discord_js_1.ButtonStyle.Secondary);
                const shuffleButton = new discord_js_1.ButtonBuilder().setCustomId('Dashboard-Shuffle').setEmoji(constants_1.cst.button.shuffle).setStyle(discord_js_1.ButtonStyle.Secondary);
                const row = new discord_js_1.ActionRowBuilder().addComponents(playPauseButton, skipButton, stopButton, loopButton, shuffleButton);
                await interaction.update({ components: [row] });
                break;
            }
            case 'Dashboard-Skip': {
                const playing = !(player.paused);
                const repeatMode = player.repeatMode;
                if (repeatMode === lavashark_1.RepeatMode.TRACK) {
                    player.setRepeatMode(lavashark_1.RepeatMode.OFF);
                    await player.skip();
                    player.setRepeatMode(lavashark_1.RepeatMode.TRACK);
                }
                else {
                    await player.skip();
                }
                const playPauseButton = new discord_js_1.ButtonBuilder().setCustomId('Dashboard-PlayPause').setEmoji(playing ? constants_1.cst.button.pause : constants_1.cst.button.play).setStyle(playing ? discord_js_1.ButtonStyle.Secondary : discord_js_1.ButtonStyle.Success);
                const skipButton = new discord_js_1.ButtonBuilder().setCustomId('Dashboard-Skip').setEmoji(constants_1.cst.button.skip).setStyle(discord_js_1.ButtonStyle.Secondary);
                const stopButton = new discord_js_1.ButtonBuilder().setCustomId('Dashboard-Stop').setEmoji(constants_1.cst.button.stop).setStyle(discord_js_1.ButtonStyle.Danger);
                const loopButton = new discord_js_1.ButtonBuilder().setCustomId('Dashboard-Loop').setEmoji(constants_1.cst.button.loop).setStyle(discord_js_1.ButtonStyle.Secondary);
                const shuffleButton = new discord_js_1.ButtonBuilder().setCustomId('Dashboard-Shuffle').setEmoji(constants_1.cst.button.shuffle).setStyle(discord_js_1.ButtonStyle.Secondary);
                const row = new discord_js_1.ActionRowBuilder().addComponents(playPauseButton, skipButton, stopButton, loopButton, shuffleButton);
                await interaction.update({ components: [row] });
                break;
            }
            case 'Dashboard-Loop': {
                let mode = 0;
                const methods = ['Off', 'Single', 'All'];
                const select = new discord_js_1.StringSelectMenuBuilder()
                    .setCustomId("Playing-Loop Select")
                    .setPlaceholder("Select the loop mode")
                    .setOptions(methods.map(x => {
                    return {
                        label: x,
                        description: x,
                        value: x
                    };
                }));
                const row = new discord_js_1.ActionRowBuilder().addComponents(select);
                let msg = await interaction.reply({ content: `Select a song loop mode.`, ephemeral: true, components: [row] });
                const collector = msg.createMessageComponentCollector({
                    time: 20000,
                    filter: i => i.user.id === interaction.user.id
                });
                collector.on("collect", async (i) => {
                    if (i.customId != "Playing-Loop Select")
                        return;
                    console.log('mode:', i.values[0]);
                    switch (i.values[0]) {
                        case 'Off': {
                            mode = 0;
                            player.setRepeatMode(lavashark_1.RepeatMode.OFF);
                            break;
                        }
                        case 'Single': {
                            mode = 1;
                            player.setRepeatMode(lavashark_1.RepeatMode.TRACK);
                            break;
                        }
                        case 'All': {
                            mode = 2;
                            player.setRepeatMode(lavashark_1.RepeatMode.QUEUE);
                            break;
                        }
                    }
                    await dashboard_1.dashboard.update(client, player, player.current);
                    await i.deferUpdate();
                    interaction.ephemeral = true;
                    await interaction.editReply({ content: `✅ | Set loop to \`${methods[mode]}\`.`, components: [] });
                });
                break;
            }
            case 'Dashboard-Stop': {
                if (client.config.autoLeave) {
                    await player.destroy();
                }
                else {
                    player.queue.clear();
                    await player.skip();
                    await dashboard_1.dashboard.destroy(player, client.config.embedsColor);
                }
                await interaction.reply({ content: '✅ | Bot leave.', ephemeral: true, components: [] });
                break;
            }
            case 'Dashboard-Shuffle': {
                player.queue.shuffle();
                await interaction.reply({ content: '✅ | Music shuffled.', ephemeral: true, components: [] });
                break;
            }
        }
    }
    else {
        if (!interaction.isCommand() || !interaction.inGuild() || interaction.member.user.bot)
            return;
        const cmd = client.commands.get(interaction.commandName);
        if (cmd && cmd.voiceChannel) {
            if (!voiceChannel) {
                return interaction.reply({ content: `❌ | You are not connected to an audio channel.`, allowedMentions: { repliedUser: false } });
            }
            if (interaction.guild?.members.me?.voice.channel && voiceChannel.id !== interaction.guild.members.me.voice.channelId) {
                return interaction.reply({ content: `❌ | You are not on the same audio channel as me.`, allowedMentions: { repliedUser: false } });
            }
        }
        if (cmd) {
            console.log(`(${constants_1.cst.color.grey}${guildMember?.guild.name}${constants_1.cst.color.white}) ${interaction.user.username} : /${interaction.commandName}`);
            await interaction.deferReply();
            cmd.slashExecute(client, interaction);
        }
    }
};

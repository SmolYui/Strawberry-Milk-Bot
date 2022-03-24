import { Channel, TextChannel } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: "Configuration",
    description: "Sends a message",

    permissions: ['ADMINISTRATOR'],

    minArgs: 2,
    expectedArgs: '<channel> <text>',
    expectedArgsTypes: ['CHANNEL','STRING'],

    slash: true,
    testOnly: true,
    guildOnly: true,

    callback: ({interaction}) => {
        const channel = interaction.options.getChannel('channel') as TextChannel
        if (!channel || channel.type !== 'GUILD_TEXT'){
            interaction.reply({
                content: 'Please tag a text channel',
                ephemeral: true,
            })
        }
        const text = interaction.options.getString('text') || ""
        console.log(`[${interaction.guild?.name}][${channel.name}] Sending <@${text}>`)
        channel.send(text)
        if (interaction){
            interaction.reply({
                content: 'Sent message!',
                ephemeral: true,
            })
        }
    }
} as ICommand
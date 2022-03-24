import { GuildChannelTypes, GuildMember } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Moderation',
    description: 'Kicks a user',

    requireRoles: true,

    slash: true,
    testOnly: true,

    minArgs: 2,
    expectedArgs: '<user> <reason>',
    expectedArgsTypes: ['USER','STRING'],

    callback: ({interaction}) => {
        const target = interaction.options.getMember('user') as GuildMember
        if (!target){
            return 'Please tag someone to kick.'
        }

        if (!target.kickable){
            return 'Cannot kick that user.'
        }

        const reason = interaction.options.getString('reason')||"no reason given"
        
        console.log(`[${interaction?.guild?.name}] Kicking ${target.displayName}(${target.id}).`) 
        target.send(`You were kicked from ${target.guild.name} for "${reason}"`)
        target.kick(reason)

        interaction.reply({
            content:`You kicked <@${target.id}>`,
            allowedMentions: { "parse": [] },
            ephemeral: true
        })
        return
    }
} as ICommand
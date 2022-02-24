import { GuildChannelTypes, GuildMember } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Moderation',
    description: 'Kicks a user',

    requireRoles: true,

    slash: 'both',
    testOnly: true,

    minArgs: 2,
    expectedArgs: '<user> <reason>',
    expectedArgsTypes: ['USER','STRING'],

    callback: ({message, interaction, args}) => {
        const target = message ? message.mentions.members?.first() : interaction.options.getMember('user') as GuildMember
        if (!target){
            return 'Please tag someone to kick.'
        }

        if (!target.kickable){
            return 'Cannot kick that user.'
        }

        args.shift()
        const reason = args.join(' ')
        
        console.log(`[${message?.guild?.name}] Kicking ${target.displayName}(${target.id})`) 
        target.send(`You were kicked from ${target.guild.name} for "${reason}"`)
        target.kick(reason)

        return `You kicked <@${target.id}>`
    }
} as ICommand
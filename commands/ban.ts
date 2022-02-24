import { GuildChannelTypes, GuildMember } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Moderation',
    description: 'Bans a user',

    requireRoles: true,

    slash: 'both',
    testOnly: true,

    minArgs: 2,
    expectedArgs: '<user> <reason>',
    expectedArgsTypes: ['USER','STRING'],

    callback: ({message, interaction, args}) => {
        const target = message ? message.mentions.members?.first() : interaction.options.getMember('user') as GuildMember
        if (!target){
            return 'Please tag someone to ban.'
        }

        if (!target.bannable){
            return 'Cannot kick that user.'
        }

        args.shift()
        const reason = args.join(' ')
        
        console.log(`[${message?.guild?.name}] Banning ${target.nickname}(${target.id})`) 
        target.send(`You were banned from ${target.guild.name} for "${reason}"`)
        target.ban({
            reason,
        })
        
        return `You banned <@${target.id}>`
    }
} as ICommand
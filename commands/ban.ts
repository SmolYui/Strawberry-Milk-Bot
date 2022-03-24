import { GuildChannelTypes, GuildMember } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Moderation',
    description: 'Bans a user',

    requireRoles: true,

    slash: true,
    testOnly: true,

    minArgs: 2,
    expectedArgs: '<user> <reason>',
    expectedArgsTypes: ['USER','STRING'],

    callback: ({interaction}) => {
        const target = interaction.options.getMember('user') as GuildMember
        if (!target){
            return 'Please tag someone to ban.'
        }

        if (!target.bannable){
            return 'Cannot ban that user.'
        }
        const reason = interaction.options.getString('reason')||"no reason given"
        
        console.log(`[${interaction?.guild?.name}] Banning ${target.displayName}(${target.id})`) 
        target.send(`You were banned from ${target.guild.name} for "${reason}"`)
        target.ban({
            reason,
        })
        
        interaction.reply({
            content:`You banned <@${target.id}>`,
            allowedMentions: { "parse": [] },
            ephemeral: true
        })
        return
    }
} as ICommand
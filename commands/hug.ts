import { GuildMember, Interaction, MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
import * as hug from "../Assets/emotes/hug.json"

export default {
    category: 'Emotes',
    description: 'Hugs the given user',
    
    minArgs: 1,
    maxArgs: 1,
    expectedArgs: '<user>',
    expectedArgsTypes: ['USER'],

    slash:true,
    testOnly:true,

    callback:({interaction})=>{
        const target = interaction.options.getMember('user') as GuildMember
        if (!target){
            return 'Please tag someone to hug.'
        }

        const min = 0
        const max = hug.links.length-1
        const index = Math.floor(Math.random()*(max - min +1))+min
        const image = hug.links[index]

        const hugEmbed = new MessageEmbed()
        .setTitle("")
        .setImage(image)

        interaction.reply({
            content:`<@${interaction.user.id}> gave <@${target.user.id}> a big hug`,
            embeds: [hugEmbed],
            allowedMentions: { "parse": [] }
        })
        return
    }
} as ICommand
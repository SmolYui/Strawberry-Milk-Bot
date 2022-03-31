import {MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
import {addBal} from "../modules/economy"

export default { 
    category: 'Currency',
    description: 'Earns you money!',
    slash:true,
    testOnly:true,

    callback: async ( {interaction,client})=>{
        const guild = interaction.guild!
        const member =interaction.member!
        const key = String(String(guild.id) + String(member.user.id))
        const max = 100
        const min = 50
        const workValue = Math.floor(Math.random()*(max - min +1))+min
        await addBal(key,workValue)

        const workEmbed = new MessageEmbed()
        .setColor('#f6a5b6')
        .setAuthor({name:`${interaction.user.username}#${interaction.user.discriminator}`, iconURL:interaction.user.avatarURL()!})
        .setDescription(`For your hard work you earned ${workValue}\:strawberry:!`)


        interaction.reply({
            embeds: [workEmbed],
            allowedMentions: { "parse": [] },
            ephemeral: true,
        })
        console.log(`[${guild.name}] ${interaction.user.username}#${interaction.user.discriminator}(${interaction.user.id}) earned ${workValue}.`)
        return
        
    }
} as ICommand

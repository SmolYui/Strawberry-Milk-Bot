import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
import {addBal} from "../modules/economy"

export default { 
    category: 'Currency',
    description: 'Earns you money!',

    slash:true,
    testOnly:true,

    callback: async ( {interaction})=>{
        const guild = interaction.guild!
        const member =interaction.member!
        const key = {guildId:guild.id,userId:member.user.id}
        let workValue = 50
        await addBal(key,workValue)

        const workEmbed = new MessageEmbed()
            .setColor('#f6a5b6')
            .setTitle(`${interaction.user.username}#${interaction.user.discriminator}`)
            .setDescription(``)

        interaction.reply({
            content: `<@${member.user.id}> Earned: ${workValue}`,
            allowedMentions: { "parse": [] },
            ephemeral: true
        })
        console.log(`[${guild.name}] ${interaction.user.username}#${interaction.user.discriminator}(${interaction.user.id}) earned ${workValue}.`)
        return
        
    }
} as ICommand

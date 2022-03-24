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
        const key = String(String(guild.id) + String(member.user.id))
        let workValue = 50
        addBal(key,workValue)
        interaction.reply({
            content: `<@${member.user.id}> Earned: ${workValue}`,
            ephemeral: true
        })
        console.log(`[${guild.name}] ${member.user.username + member.user.discriminator}(${member.user.id}) earned ${workValue}.`)
        return
        
    }
} as ICommand

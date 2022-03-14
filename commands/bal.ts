import { GuildEmoji } from "discord.js";
import { ICommand } from "wokcommands";
import balSchema from "../models/bal-schema";


export default { 
    category: 'Currency',
    description: 'Shows users balance',

    slash:'both',
    testOnly:true,

    callback: async ( {message,interaction})=>{
        const guild = message ? message.guild! : interaction.guild!
        const member = message ? message.member! : interaction.member!
        const key = String(String(guild.id) + String(member.user.id))




            const results = await balSchema.findById(key)
            if(!results){
                await balSchema.findOneAndUpdate({
                    _id: key
                }, {
                    _id: key,
                    value:0,
                },{
                    upsert: true
                })
                return `<@${member.user.id}> Balance: 0`
            }

            let currentBal = results.value



        return `<@${member.user.id}> Balance: ${currentBal}`
            
        
    }
} as ICommand

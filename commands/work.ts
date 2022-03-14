import { GuildEmoji } from "discord.js";
import mongoose from "mongoose";
import { ICommand } from "wokcommands";
import balSchema from "../models/bal-schema";

export default { 
    category: 'Currency',
    description: 'Earns you money!',

    slash:'both',
    testOnly:true,

    callback: async ( {message,interaction})=>{
        const guild = message ? message.guild! : interaction.guild!
        const member = message ? message.member! : interaction.member!
        const key = String(String(guild.id) + String(member.user.id))



            const results = await balSchema.findById(key)
            if(!results){
                console.log("failed to find")
                await balSchema.findOneAndUpdate({
                    _id: key
                }, {
                    _id: key,
                    value:50,
                },{
                    upsert: true
                })
                return `<@${member.user.id}> Earned: 50`
            }

            let currentBal = results.value

        let workamount = 50

        await balSchema.findOneAndUpdate({
            _id: key
        }, {
            _id: key,
            value:currentBal+workamount,
        },{
            upsert: true
        })




        return `<@${member.user.id}> Earned: ${workamount}`
            
        
    }
} as ICommand

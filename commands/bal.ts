import { Channel, GuildEmoji, User } from "discord.js";
import { ICommand } from "wokcommands";
import balSchema from "../models/bal-schema";


export default { 
    category: 'Currency',
    description: 'Shows users balance',

    minArgs: 0,
    maxArgs: 1,
    expectedArgs: '<user>',
    expectedArgsTypes: ['USER'],

    slash:true,
    testOnly:true,

    callback: async ( {interaction, args})=>{
        const guild = interaction.guild!
        const user = interaction.options.getUser('user')||interaction.member!.user
        const key = String(String(guild.id) + String(user.id))




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
                interaction.reply({

                content:`<@${user.id}> Balance: 0`,
                allowedMentions: { "parse": [] },
            })
            }

            let currentBal = results.value

        interaction.reply({

            content:`<@${user.id}> Balance: ${currentBal}`,
            allowedMentions: { "parse": [] },
        })    
        return
    }
} as ICommand

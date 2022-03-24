import { Channel, GuildEmoji, MessageEmbed, User } from "discord.js";
import { ICommand } from "wokcommands";
import balSchema from "../models/bal-schema";
import { getBal } from "../modules/economy";


export default { 
    category: 'Currency',
    description: 'Shows users balance',

    minArgs: 0,
    maxArgs: 1,
    expectedArgs: '<user>',
    expectedArgsTypes: ['USER'],

    slash:true,
    testOnly:true,

    callback: async ( {interaction})=>{
        const guild = interaction.guild!
        const user = interaction.options.getUser('user')||interaction.member!.user
        const key = String(String(guild.id) + String(user.id))
        const currentBal = await getBal(key)

        
        const balEmbed = new MessageEmbed()
        .setColor('#f6a5b6')
        .setAuthor({name:`${interaction.user.username}#${interaction.user.discriminator}`, iconURL:interaction.user.avatarURL()!})
        .addField('Balance:',`${currentBal}\:strawberry:`)

        interaction.reply({
            embeds: [balEmbed],
            allowedMentions: { "parse": [] },
            ephemeral: true
        })
        console.log(`[${guild.name}] ${interaction.user.username}#${interaction.user.discriminator}(${interaction.user.id}) requested balance: ${currentBal}.`)
        return
    }
} as ICommand

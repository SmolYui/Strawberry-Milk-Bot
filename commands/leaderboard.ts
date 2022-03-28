import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
import {getUserId, top10} from "../modules/economy";


export default { 
    category: 'Currency',
    description: 'Shows leaderboard',

    slash:true,
    testOnly:true,

    callback: async ( {interaction})=>{
        const guild = interaction.guild!
        const Top10 = await top10(guild.id)
        let description:string = "";
        for (let i=0;i<10;i++){
            description = description + `**\n#${i+1}** `
            let doc = Top10[i]
            let entry = "none"
            if(doc){
                entry = `<@${ await getUserId(doc._id)}>: ${doc.value}\:strawberry:`
            }
            description = description+entry            
        }

        const leaderboardEmbed = new MessageEmbed()
        .setColor('#f6a5b6')
        .setTitle(`Leaderboard:`)
        .setDescription(description)



        interaction.reply({
            embeds:[leaderboardEmbed],
            ephemeral: true
        })
        console.log(`[${guild.name}] ${interaction.user.username}#${interaction.user.discriminator}(${interaction.user.id}) requested leaderboard`)
        return
    }
} as ICommand

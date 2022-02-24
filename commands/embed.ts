import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";

export default { 
    category: 'Testing',
    description: 'Sends an embed',

    permissions: ['ADMINISTRATOR'],
    testOnly:true,
    

    callback: ({message, text})=>{
        const embed = new MessageEmbed()
        .setDescription("Hello World")
        .setTitle('Title')
        .setColor('RED')
        .setAuthor('Strawb')
        .setFooter('Footer')
        return embed
        
    }
} as ICommand

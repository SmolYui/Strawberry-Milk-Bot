import { ICommand } from "wokcommands";
import welcomeSchema from "../models/welcome-schema";

export default {
    category: 'Configuration',
    description: 'Sets the welcome channel',

    permissions: ['ADMINISTRATOR'],

    minArgs: 2,
    expectedArgs: '<channel> <text>',

    slash: true,
    testOnly: true,

    options: [
        {
            name: 'channel',
            description: 'The target channel.',
            required: true,
            type: 'CHANNEL',
        },
        {
            name: 'text',
            description: 'The welcome message.',
            required: true,
            type: 'STRING',
        }
    ],

    callback: async ({ guild, interaction}) => {
        if (!guild){
            return 'Please use this command within a server.'
        }

        const target = interaction.options.getChannel('channel')
        if (!target || target.type !== 'GUILD_TEXT'){
            return 'Please tag a text channel.'
        }

        let text = interaction?.options.getString('text')

        console.log(`[${interaction?.guild?.name}] setting welcome message to "${text}"`) 
        await welcomeSchema.findOneAndUpdate({
            _id: guild.id 
        }, {
            _id: guild.id,
            text,
            channelId: target.id
        },{
            upsert: true
        })
        interaction.reply({
            content:'Welcome channel & message set!',
            allowedMentions: { "parse": [] },
            ephemeral: true
        })
    }
} as ICommand
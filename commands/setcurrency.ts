import { ICommand } from "wokcommands";
import currencySchema from "../models/currency-schema";

export default {
    category: 'Currency',
    description: 'Sets the currency Emote and the side it should appear relative to the value',

    permissions: ['ADMINISTRATOR'],

    minArgs: 2,
    expectedArgs: '<emote> <leading>',

    slash: true,
    testOnly: true,

    options: [
        {
            name: 'emote',
            description: 'The emote to use',
            required: true,
            type: 'STRING',
        },
        {
            name: 'leading',
            description: 'If the emote should appear before number e.g. £1, set False for 1£ ',
            required: true,
            type: 'BOOLEAN',
        }
    ],

    callback: async ({ guild, interaction}) => {
        if (!guild){
            return 'Please use this command within a server.'
        }
        
        const emote = interaction.options.getString('emote') || ''
        if(!RegExp(/^(:[^:\s]+:|<:[^:\s]+:[0-9]+>|<a:[^:\s]+:[0-9]+>)+$/gm).test(emote)){
            interaction.reply({
                content:'Please use a valid Emoji',
                ephemeral: true
            })
            return
        }

        const leading = interaction.options.getBoolean('leading')


        await currencySchema.findOneAndUpdate({
            _id: guild.id 
        }, {
            _id: guild.id,
            emote: emote,
            leading: leading
        },{
            upsert: true
        })
        interaction.reply({
            content:'Currency emoji and format set!',
            ephemeral: true
        })
    }
} as ICommand
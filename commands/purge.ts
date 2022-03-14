import { ICommand } from "wokcommands";

export default {
    category: 'Moderation',
    description: 'Deletes multiple messages at once.',

    permissions: ['ADMINISTRATOR'],
    requireRoles: true,

    minArgs: 1,
    maxArgs: 1,
    expectedArgs: '[amount]',
    expectedArgsTypes: ['INTEGER'],

    slash: 'both',
    testOnly: true,

    callback: async ({message, interaction, channel, args}) => {
        const amount = parseInt(args.shift()!)

        if (message){
            await message.delete()
        }

        const {size} = await channel.bulkDelete(amount, true)

        const reply = `Deleted ${size} message${size > 1 ? 's':''}.`

        if (interaction){
            return reply
        }
    }

} as ICommand

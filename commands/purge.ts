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

    slash: true,
    testOnly: true,

    callback: async ({interaction, channel}) => {
        const amount = interaction.options.getInteger('amount')!

        const {size} = await channel.bulkDelete(amount, true)

        const replyContent = `Deleted ${size} message${size > 1 ? 's':''}.`

        interaction.reply({
            content:replyContent,
            ephemeral: true
        })

        console.log(`[${interaction.guild?.name}][${channel.name}] ${interaction.user.username + interaction.user.discriminator}(${interaction.user.id}) purged ${size} message${size > 1 ? 's':''}.`)
        return
    }

} as ICommand

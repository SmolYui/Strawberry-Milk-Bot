import { Client, GuildMember, Interaction, MessageActionRow, MessageSelectMenu, MessageSelectOptionData, Role, TextChannel } from "discord.js";
import { ICommand } from "wokcommands";

export default{
    category: 'Configuration',
    description: 'Adds a role to the auto role message.',

    permissions: ['ADMINISTRATOR'],

    minArgs: 3,
    maxArgs: 3,
    expectedArgs: '<channel> <messageId> <role>',
    expectedArgsTypes: ['CHANNEL', 'STRING', 'ROLE'],

    slash: true,
    testOnly: true,
    guildOnly: true,

    init: (client: Client) => {
        client.on('interactionCreate', interaction =>{
            if(!interaction.isSelectMenu()){
                return
            }

            const { customId, values, member} = interaction

            if(customId === 'auto_roles' && member instanceof GuildMember){
                const component = interaction.component as MessageSelectMenu
                const removed = component.options.filter((option) => {
                    return !values.includes(option.value)
                })

                for (const id of removed){
                    member.roles.remove(id.value)
                }
                for (const id of values){
                    member.roles.add(id)
                }

                console.log(`[${member?.guild.name}] updated roles for ${member.displayName} `) 
                interaction.reply({
                    content: 'Roles updated!',
                    ephemeral: true
                })
            }

        })
    },

    callback: async ({client, interaction,guild}) => {
        const channel = interaction.options.getChannel('channel') as TextChannel
        if (!channel || channel.type !== 'GUILD_TEXT'){   
            interaction.reply({
                content: 'Please tag a text channel.',
                ephemeral: true
            })
            return
        }

        const messageId = String(interaction.options.getInteger('messageId'))

        const role = (interaction.options.getRole('role')) as Role
        if (!Role){
            interaction.reply({
                content: 'Unknown Role.',
                ephemeral: true
            })
            return
        }

        const targetMessage = await channel.messages.fetch(messageId,{
            cache:true,
            force: true
        })

        if (!targetMessage){
            interaction.reply({
                content: 'Unknown MessageID',
                ephemeral: true
            })
            return
        }

        if(targetMessage.author.id !== client.user?.id){
            interaction.reply({
                content: `Please provide a message ID that was sent from <@${client.user?.id}>`,
                ephemeral: true
            })
            return
        }

        let row = targetMessage.components[0] as MessageActionRow
        if (!row){
            row = new MessageActionRow()
        }

        const option: MessageSelectOptionData[] = [{
            label: role.name,
            value: role.id
        }]

        let menu = row.components[0] as MessageSelectMenu
        if (menu){
            for (const o of menu.options){
                if (o.value === option[0].value){
                    return {
                        custom: true,
                        content: `<@${o.value}> is already part of this menu.`,
                        allowedMentions: {
                            roles: []
                        },
                        ephemeral: true,
                    }
                }

            }
            menu.addOptions(option)
            menu.setMaxValues(menu.options.length)
            } else {
                row.addComponents(
                    new MessageSelectMenu()
                    .setCustomId('auto_roles')
                    .setMinValues(0)
                    .setMaxValues(1)
                    .setPlaceholder('Select yor roles...')
                    .addOptions(option)
                )
            
        }targetMessage.edit({
            components: [row]
        })
        console.log(`[${guild?.name}][${channel.name}][${messageId}] Added <@${role.name}> to message`)
        return {
            custom: true,
            content: `Added \`${role.name}\`to the auto roles menu.`,
            ephemeral: true
        }
    }

}as ICommand
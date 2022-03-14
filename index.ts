import DiscordJS, { CachedManager, Guild, Intents, Interaction, Message, MessageCollector } from 'discord.js'
import WOKCommands from 'wokcommands'
import path from 'path'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
dotenv.config()


const client = new DiscordJS.Client({
    intents : [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.DIRECT_MESSAGES,
    ]
})

client.on('ready', async () =>{
    new WOKCommands(client, {
        commandDir: path.join(__dirname, 'commands'),
        featureDir: path.join(__dirname, 'features'),
        typeScript:true,
        testServers: ['944402087318552616','943281597271146546'],
        botOwners: ['245629175803674624'],
        mongoUri:process.env.MONGO_URI,
    })
})


client.login(process.env.TOKEN)
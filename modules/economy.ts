//Yui Neko 2022
import balSchema from "../models/bal-schema";
import currencySchema from "../models/currency-schema"

type account = { guildId: string, userId: string, bal: number }

async function newAccount(key: string) {
    await balSchema.findOneAndUpdate({
        _id: key
    }, {
            value: 0,
        }, {
            upsert: true
        })
    console.log("created new balance account")
}

async function fetchAccount(guildId:string, userId:string): Promise<account> {
    const key = parseKey(guildId, userId)
    const results = await balSchema.findById(key)
    if (!results) {
        await newAccount(key)
        return fetchAccount(key)
    }
    const guildId = key.slice(0, 18)
    const userId = key.slice(18)
    const bal = results.value
    return { guildId, userId, bal }
}

export async function getGuildId(key: string): Promise<string> {
    const account = await fetchAccount(key)
    const guildId = account.guildId
    return guildId
}

export async function getUserId(key:string): Promise<string> {
    const account = await fetchAccount(key)
    const userId = account.userId
    return userId
}

export async function getBal(guildId:string, userId:string): Promise<number> {
    const key = parseKey(guildId, userId)
    const account = await fetchAccount(key)
    const bal = account.bal
    return bal
}

export async function addBal(guildId: string, userId: string, amount: number) {
    const key = parseKey(guildId, userId)
    const account = await fetchAccount(key)
    const bal = account.bal
    const add = amount > 0 ? amount : 0
    const newValue = bal + add
    await balSchema.findOneAndUpdate({
        _id: key
    }, {
            value: newValue,
        })
}

export async function subBal(guildId:string, userId:string, amount: number) {
    const key = parseKey(guildId, userId)
    const account = await fetchAccount(key)
    const bal = account.bal
    if (bal - amount < 0) return false
    const newValue = bal - amount
    await balSchema.findOneAndUpdate({
        _id: key
    }, {
            value: newValue,
        })
}
export async function top10(guildId: string) {
    const top10Document = await balSchema.find()
        .where('_id')
        .regex(new RegExp(`${guildId}`))
        .sort({ 'value': -1 })
        .limit(10)
    console.log(top10Document)
    return top10Document
}

async function fetchSettings(guildId: string): Promise<{ emote: string, leading: boolean }> {
    const results = await currencySchema.findById(guildId)
    const emote = results ? results.emote : ":strawberry:"
    const leading = results ? results.leading : false
    return { emote, leading }
}


export async function parseCurrency(guildId: string, value: number): Promise<string> {
    const settings = await fetchSettings(guildId)
    return `${settings.leading ? settings.emote : ""}${value}${!settings.leading ? settings.emote : ""}`
}
function parseKey(guildId: string, userId: string): string {
    const key = `${guildId}${userId}`
    return key
}
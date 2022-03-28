import balSchema from "../models/bal-schema";

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

async function fetchAccount(key: string): Promise<account> {
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

export async function getUserId(key: string): Promise<string> {
    const account = await fetchAccount(key)
    const userId = account.userId
    return userId
}

export async function getBal(key: string): Promise<number> {
    const account = await fetchAccount(key)
    const bal = account.bal
    return bal
}

export async function addBal(key: string, amount: number) {
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

export async function subBal(key: string, amount: number) {
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
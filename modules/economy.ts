import balSchema from "../models/bal-schema";

type keyType = {guildId:String, userId:String}

async function newAccount(key: keyType) {
    await balSchema.findOneAndUpdate({
        _id: key
    }, {
        _id: key,
        value: 0,
    }, {
        upsert: true
    })
    console.log("created new balance account")
}

async function fetchAccount(key: keyType): Promise<number> {
    const results = await balSchema.findById(key)
    if (!results) {
        await newAccount(key)
        return fetchAccount(key)
    }
    return results.value
}

export async function getBal(key: keyType): Promise<number> {
    const bal = await fetchAccount(key)
    return bal
}

export async function addBal(key: keyType, amount: number) {
    const bal = await fetchAccount(key)
    const add = amount > 0 ? amount : 0
    const newValue = bal + add
    await balSchema.findOneAndUpdate({
        _id: key
    }, {
        value: newValue,
    })
}

export async function subBal(key: keyType, amount: number) {
    const bal = await fetchAccount(key)
    if (bal - amount < 0 ) return false
    const newValue = bal - amount
    await balSchema.findOneAndUpdate({
        _id: key
    }, {
        value: newValue,
    })
}
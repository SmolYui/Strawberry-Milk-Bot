import balSchema from "../models/bal-schema";

async function newAccount(key: string) {
    await balSchema.findOneAndUpdate({
        _id: key
    }, {
        _id: key,
        value: 0,
    }, {
        upsert: true
    })
}

async function fetchAccount(key: string): Promise<number> {
    const results = await balSchema.findById(key)
    if (!results) {
        newAccount(key)
        return fetchAccount(key)
    }
    return results.value
}

export async function getBal(key: string): Promise<number> {
    const bal = await fetchAccount(key)
    return bal
}

export async function addBal(key: string, amount: number) {
    const bal = await fetchAccount(key)
    const add = amount > 0 ? amount : 0
    const newValue = bal + add
    await balSchema.findOneAndUpdate({
        _id: key
    }, {
        value: newValue,
    })
}

export async function subBal(key: string, amount: number) {
    const bal = await fetchAccount(key)
    if (bal - amount < 0 ) return false
    const newValue = bal - amount
    await balSchema.findOneAndUpdate({
        _id: key
    }, {
        value: newValue,
    })
}
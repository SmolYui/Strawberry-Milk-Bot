import mongoose, {Schema} from "mongoose";

const currencySchema = new Schema({
    _id: {// Guild ID
        type: String,
        required: true
    },
    emote: { //the emote used for the Guild's currency, default :strawberry:
        type: String,
        required: true
    },
    leading: { //if the currency icon should be displayed infront of the value, default False
        type: Boolean,
        required: true
    }
})

const name = 'settings-currency'

export default mongoose.models[name] || mongoose.model(name, currencySchema, name)
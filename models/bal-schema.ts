import mongoose, {Schema} from "mongoose";

const balSchema = new Schema({
    
    _id: {// GuildID + UserID
        type: String,
        required: true
    },
    value: {// balance
        type: Number,
        required: true
    }
})

const name = 'bal-currency'

export default mongoose.models[name] || mongoose.model(name, balSchema, name)
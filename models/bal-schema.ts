import mongoose, {Schema} from "mongoose";

const balSchema = new Schema({
    // Guild ID + User ID
    _id: {
        type: {guildId:String,userId:String},
        required: true
    },
    value: {
        type: Number,
        required: true
    }
})

const name = 'bal-currency'

export default mongoose.models[name] || mongoose.model(name, balSchema, name)
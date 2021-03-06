import mongoose, {Schema} from "mongoose";

const reqString = {
    type: String,
    required: true
}

const welcomeSchema = new Schema({
    _id: reqString, // Guild ID
    channelId: reqString, //Welcome channel
    text: reqString //Welcome message
})

const name = 'welcome-config'

export default mongoose.models[name] || mongoose.model(name, welcomeSchema, name)
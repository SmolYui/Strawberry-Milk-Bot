import mongoose, {Schema} from "mongoose";

const reqString = {
    type: String,
    required: true
}

const welcomeSchema = new Schema({
    // Guild ID
    _id: reqString,
    channelId: reqString,
    text: reqString
})

const name = 'welcome-config'

export default mongoose.models[name] || mongoose.model(name, welcomeSchema, name)
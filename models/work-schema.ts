import mongoose, { Schema } from "mongoose";

const workSchema = new Schema({
    _id: {// Guild ID
        type: String,
        required: true
    },
    min: {
        type: Number,
        required: true
    },
    max: {
        type: Number,
        required: true
    }

})

const name = 'work-currency'

export default mongoose.models[name] || mongoose.model(name, workSchema, name)
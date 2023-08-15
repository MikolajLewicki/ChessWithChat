import mongoose from 'mongoose'

const whitelistUserSchema = mongoose.Schema({
    userId: {type: String, required: true},
    status: {type: String, required: true},
    accessLink: {type: String, required: true},
    liChessNick: {type: String},
    id: {type: String},
})

export default mongoose.model('WhitelistUser', whitelistUserSchema)
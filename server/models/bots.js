import mongoose from 'mongoose'

const botsSchema = mongoose.Schema({
    mail: {type: String, required: true},
    password: {type: String, required: true},
    token: {type: String, required: true},
    currentPlayer: {type: String, required: true},
    gameStatus: {type: String, required: true},
    validMoves: {type: Array},
    lastMove: {type: String},
    currentPresident: {type: String},
    timeForVotes: {type: Date},
    votes: {type: Array},
    id: {type: String},
})

export default mongoose.model('Bots', botsSchema)
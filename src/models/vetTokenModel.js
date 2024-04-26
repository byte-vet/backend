import mongoose from 'mongoose';

const tokenVetSchema = {
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Vet'
    },
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600,
    }
}

const TokenVet = mongoose.model('TokenVet', tokenVetSchema); // Renomeado para TokenVet
export default TokenVet;

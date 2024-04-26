import mongoose from 'mongoose';

const tokenSchema = {
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

const Token = mongoose.model('Token', tokenSchema);
export default Token;


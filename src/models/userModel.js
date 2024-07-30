import mongoose from 'mongoose';

const userSchema = {
    fullName: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        default: false
    },
    pets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Animal',
        required: false
    }],
}

const User = mongoose.model('User', userSchema);
export default User;
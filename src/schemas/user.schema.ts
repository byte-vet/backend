import mongoose, { Schema } from 'mongoose';

const vetSchema = new Schema({
  fullName: String,
  email: String,
  password: String,
  clinicName: String,
  clinicLoc: String
});

const clientSchema = new Schema({
  fullName: String,
  email: String,
  password: String,
  pets: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Animal',
    required: false
  }],
});

const VetModel = mongoose.model('veterinario', vetSchema);
const ClientModel = mongoose.model('cliente', clientSchema);

export { VetModel, ClientModel };

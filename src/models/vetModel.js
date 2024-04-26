// vetModel.js

import mongoose from 'mongoose';

const VeterinarioSchema = new mongoose.Schema({
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
    nomeClinica: {
      type: String,
      required: true
    },
    localizacaoClinica: {
      type: String,
      required: true
    }
});

const Veterinario = mongoose.model('Veterinario', VeterinarioSchema);

export default Veterinario; // Exportando o modelo como um valor padrão

const mongoose = require('mongoose');

const VeterinarioSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  senha: {
    type: String,
    required: true
  },
  nome: {
    type: String,
    required: true
  },
  cpf: {
    type: String,
    required: true,
    unique: true
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

module.exports = Veterinario;

import mongoose from 'mongoose';

const consultaSchema = {
  animalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Animal',
    required: true
  },
  vetId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Veterinario',
    required: true
  },
  data: {
    type: Date,
    required: true
  },
  motivo: {
    type: String,
    required: true
  },
  diagnostico: {
    type: String,
    required: true
  }
}

const Consulta = mongoose.model('Consulta', consultaSchema);
export default Consulta;
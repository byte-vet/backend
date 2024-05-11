import mongoose from "mongoose";

const vacinaSchema = {
    id_animal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Animal",
        required: true,
    },
    nomeDaVacina: {
        type: String,
        required: true,
    },
    dataDeAplicacao: {
        type: String, // trocar para Date
        required: true,
    }
};

const Vacina = mongoose.model('Vacina', vacinaSchema);

export default Vacina;
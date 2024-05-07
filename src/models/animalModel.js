import mongoose from 'mongoose';

const Especies = Object.freeze(
    {
        CACHORRO: 'Cachorro',
        GATO: 'Gato',
        PEIXE: 'Peixe',
        PASSARO: 'Pássaro',
        COELHO: 'Coelho',
        ROEDOR: 'Roedor',
        REPTIL: 'Réptil',
        OUTRO: 'Outro'
    }
)

const animalSchema = new mongoose.Schema({
    usuario: { // usuario dono do pet
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    nome: {
        type: String,
        required: true
    },
    especie: {
        type: String,
        enum: Object.values(Especies),
        required: true
    },
    raca: {
        type: String,
        required: true
    },
    idade: {
        type: Number,
        required: true
    },
    peso: {
        type: Number,
        required: true
    },
});

Object.assign(animalSchema.statics, { Especies }); 

const Animal = mongoose.model('Animal', animalSchema);

export default Animal; 

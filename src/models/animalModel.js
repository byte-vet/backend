import { UUID } from 'mongodb';
import mongoose from 'mongoose';

const Especies = Object.freeze(
    {
        CACHORRO: 'cachorro',
        GATO: 'gato',
        PEIXE: 'peixe',
        PASSARO: 'passaro',
        COELHO: 'coelho',
        ROEDOR: 'roedor',
        REPTIL: 'reptil',
        OUTRO: 'outro'
    }
)

const animalSchema = new mongoose.Schema({
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

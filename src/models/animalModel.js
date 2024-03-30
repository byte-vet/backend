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
    nome: {
        type: String,
        required: true
    },
    especie: {
        type: String,
        enum: [Object.values(Especies)], // Validação de valores permitidos
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

Object.assign(animalSchema.statics, { Especies }); // Adiciona o objeto Especies ao modelo

const Animal = mongoose.model('Animal', animalSchema);

module.exports = Animal; // Exporta o modelo Animal

import Vacina from "../models/vacinaModel.js";
import Animal from "../models/animalModel.js";

const adicionaVacina = async (req, res) => {
    const { id_animal, nomeDaVacina, dataDeAplicacao } = req.body;
    const pet = await Animal.findById(id_animal);

    try {
        if (!pet) {
            res.status(404).json({ message: `Animal com id ${id_animal} não encontrado` });
            return;
        }
        const novaVacina = await Vacina.create({ id_animal, nomeDaVacina, dataDeAplicacao });
        pet.cartaoDeVacina = [...pet.cartaoDeVacina, novaVacina._id];
        await pet.save();
        res.status(201).json(novaVacina);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const listaVacinasDoPet = async (req, res) => {
        try {
        const pet = await Animal.findById(req.params.id_pet).populate('cartaoDeVacina');
        if (!pet) {
            res.status(404).json({ message: `Animal com id ${req.params.id_pet} não encontrado` });
            return;
        }
        res.status(200).json(pet.cartaoDeVacina);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export { adicionaVacina, listaVacinasDoPet };
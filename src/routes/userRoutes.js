import express from 'express';
import { getUser, updateUser } from '../controllers/userController.js';
import { checkToken } from '../middlewares/authorization.js';
import { createAnimal, 
    getAllAnimalsByUser, 
    deleteAnimalByUser, 
    getAnimalByUser, 
    updateAnimalByUser 
} from '../controllers/animalController.js';
import { getAllConsultasByAnimal } from '../controllers/vetController.js';

import { adicionaVacina, listaVacinasDoPet } from '../controllers/vacinaController.js';

const router = express.Router();

/* Rotas relacionadas ao dados do usuario */
router.get('/:id', checkToken, getUser); // http://localhost:3000/users/{{id_usuario}}
router.put('/:id/', checkToken, updateUser); // http://localhost:3000/users/{{id_usuario}}

/* Rotas relacionadas ao pet do usuario */
router.post('/:id/pets/', checkToken, createAnimal); //http://localhost:3000/users/{{id_usuario}}/pets/
router.get('/:id/pets', checkToken, getAllAnimalsByUser); // http://localhost:3000/users/{{id_usuario}}/pets
router.get('/:id/pets/:id_pet', checkToken, getAnimalByUser); // http://localhost:3000/users/{{id_usuario}}/pets/{{id_pet}}
router.delete('/:id/pets/:id_pet', checkToken, deleteAnimalByUser); // http://localhost:3000/users/{{id_usuario}}/pets/{{id_pet}}
router.put('/:id/pets/:id_pet', checkToken, updateAnimalByUser); // http://localhost:3000/users/{{id_usuario}}/pets/{{id_pet}}

/* Rotas relacionadas ao cartao de vacina do pet */
router.post('/:id/pets/:id_pet/vacinas', checkToken, adicionaVacina); // http://localhost:3000/users/{{id_usuario}}/pets/{{id_pet}}/vacinas
router.get('/:id/pets/:id_pet/vacinas', checkToken, listaVacinasDoPet); // http://localhost:3000/users/{{id_usuario}}/pets/{{id_pet}}/vacinas
router.get('/:id/pets/:id_pet/consultas', checkToken, getAllConsultasByAnimal); // http://localhost:3000/users/{{id_usuario}}/pets/{{id_pet}}/consultas
export default router;

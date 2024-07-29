import express from 'express';
import multer from 'multer';
import { checkToken } from '../middlewares/authorization.js';
import { 
    createAnimal, 
    getAnimal, 
    getAllAnimals, 
    deleteAnimal, 
    getAllAnimalsByUser, 
    deleteAnimalByUser, 
    getAnimalByUser, 
    updateAnimalByUser, 
    uploadVaccinationCard, 
    downloadVaccinationCard 
} from '../controllers/animalController.js';

const router = express.Router();

// Configuração do multer para upload de arquivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

// Rotas
router.post('/', checkToken, createAnimal); // url - http://localhost:3000/animais
router.get('/:id', checkToken, getAnimal);  // url - http://localhost:3000/animais/{id}
router.get('/', checkToken, getAllAnimals); // url - http://localhost:3000/animais
router.delete('/:id', checkToken, deleteAnimal); // url - http://localhost:3000/animais/{id}

router.post('/:id/upload', checkToken, upload.single('file'), uploadVaccinationCard); // url - http://localhost:3000/animais/{id}/upload
router.get('/:id/download', checkToken, downloadVaccinationCard); // url - http://localhost:3000/animais/{id}/download

router.get('/user/:id', checkToken, getAllAnimalsByUser); // url - http://localhost:3000/animais/user/{id}
router.get('/user/:id/:id_pet', checkToken, getAnimalByUser); // url - http://localhost:3000/animais/user/{id}/{id_pet}
router.put('/user/:id/:id_pet', checkToken, updateAnimalByUser); // url - http://localhost:3000/animais/user/{id}/{id_pet}
router.delete('/user/:id/:id_pet', checkToken, deleteAnimalByUser); // url - http://localhost:3000/animais/user/{id}/{id_pet}

export default router;

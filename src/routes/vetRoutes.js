import express from 'express';
import { createConsulta, getConsultas, createHistorico, getVet, updateVet } from '../controllers/vetController.js';
import { checkToken } from '../middlewares/authorization.js';

const router = express.Router();

router.get('/:id', checkToken, getVet); // http://localhost:3000/users/{{id_vet}}
router.put('/:id/', checkToken, updateVet); // http://localhost:3000/users/{{id_vet}}

router.post('/:id/consulta', checkToken, createConsulta); // http://localhost:3000/vet/{{id_vet}}/consulta
router.get('/:id/consulta', checkToken, getConsultas);
router.post('/historico', checkToken, createHistorico); // http://localhost:3000/vet/historico

export default router;

import { Router } from "express";
import { createMedicamento, 
  deleteMedicamento, 
  getMedicamentoById, 
  getMedicamentos, 
  getMedicamentosPorReceta, 
  getMedicamentosPorTipo, 
  updateMedicamento} from "../controllers/softwares.controller.js";

const router = Router();

router.get('/botica', getMedicamentos);
router.get('/botica/:id', getMedicamentoById);
router.get('/botica/recetas/:receta', getMedicamentosPorReceta);
router.get('/botica/tipo/:tipo', getMedicamentosPorTipo);
router.post('/botica', createMedicamento);
router.put('/botica/:id', updateMedicamento);
router.delete('/botica/:id', deleteMedicamento);

export default router;
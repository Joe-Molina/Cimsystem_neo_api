import { Router } from "express";
import { Socios } from "../controllers/socios.controller";



const router = Router();

router.get('/info/:accion', Socios.getOne)
router.get('/', Socios.getAll)

export default router;
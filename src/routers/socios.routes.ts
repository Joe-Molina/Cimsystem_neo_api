import { Router } from "express";
import { Socios } from "../controllers/socios.controller";



const router = Router();

router.get('/info/:accion', Socios.getOne)
router.get('/invitados/:accion', Socios.getAllguests)
router.get('/', Socios.getAll)

export default router;
import { Router } from "express";
import { CuotasMan } from "../controllers/cuotas_socios.controller";



const router = Router();

router.get('/', CuotasMan.getAll)

export default router;
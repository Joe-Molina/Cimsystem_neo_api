import { Router } from "express";
import { Facturas } from "../controllers/facturas.controller";



const router = Router();

router.get('/:accion', Facturas.getAll)
router.get('/detalles/:factura', Facturas.getAllDetails)

export default router;
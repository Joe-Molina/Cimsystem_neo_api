import { Router } from "express";
import { Cobranza } from "../controllers/cobranza.controller";



const router = Router();

router.get('/', Cobranza.getInfoCobranza) // array con objetos que contienen informacion de cobranza de cada socio
router.post('/sendmail', Cobranza.sentMail)

export default router;
import { Router } from "express";
import { PartnerBirthdays } from '../controllers/cumple_socios.controller';

const router = Router();

router.get('/', PartnerBirthdays.getAll)

export default router;
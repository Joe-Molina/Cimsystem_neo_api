import { Router } from "express";
import { PartnerBirthdays } from '../controllers/cumple_socios.controller';

const router = Router();

router.get('/', PartnerBirthdays.getAll)
router.get('/today', PartnerBirthdays.getTodayBirdthDays)
router.get('/tomorrow', PartnerBirthdays.getTomorrowBirdthDays)
router.get('/Month', PartnerBirthdays.getMonthBirdthDays)

export default router;
import { Router } from "express";
import { CuotasMan } from "../controllers/cuotas_socios.controller";



const router = Router();

router.get('/', CuotasMan.getAllCuotas) // array con objetos que contienen informacion sobre las cuotas de cada socio

router.get('/Cuotas_mes_socios/:fecha', CuotasMan.getCuotasPorMesSocios) // array con los socios que han pagado mas de 2 cuotas en el mes buscado 

router.get('/cuotas_dia/:fecha', CuotasMan.getCuotasDeUnDia) // array con las cuotas que se pagaron en un dia en especifico. 

router.get('/cuotas_historial_socio/:accion', CuotasMan.getCuotasSocio)// todas las cuotas de mantenimiento de una accion pagadas y morosas

router.post('/cuotas_morosos', CuotasMan.getMorososPorFecha) // array con cuotas pagadas y cuotas morosas en un rango de fechas

router.post('/cuotas_por_fecha', CuotasMan.getCuotasPorFecha)// cuotas pagadas en un rango de fechas

export default router;
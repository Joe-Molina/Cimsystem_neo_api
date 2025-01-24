import { addDay, addHour, dayEnd, dayStart, monthEnd, monthStart, parse } from "@formkit/tempo"
import { CuotasManModel } from "../models/cuotas_socios.model"


export class CuotasMan {
  static async getAllCuotas(_req: any, res: any) {

    const cuotasMante = await CuotasManModel.getAll()

    const deuda_socios = await CuotasManModel.SortMaintenaceByAction(cuotasMante)
    res.json(deuda_socios)
  }

  static async getCuotasPorMesSocios(req: any, res: any) {

    const pagos = await CuotasManModel.getAllPagosByMonth(addHour(monthStart(req.params.fecha), -4), monthEnd(req.params.fecha))

    const deuda_socios = await CuotasManModel.SortMaintenaceByAction(pagos)

    res.json(deuda_socios)
  }

  static async getCuotasSocio(req: any, res: any) {
    const cuotasMante = await CuotasManModel.getOne(req.params.accion)

    const deuda = cuotasMante.reduce((deudas: any, cuota: any) => {

      if (!deudas.bs) {
        deudas = {
          bs: 0,
          divisa: 0,
          cuotas: 0,
          fecha_ult_deuda: ""
        }
      }

      const { monto, divisa } = cuota

      if (cuota.marca == false) {
        deudas.bs += monto
        deudas.divisa += divisa
        deudas.cuotas++
      }

      if (cuota.marca == false && deudas.fecha_ult_deuda == "") {
        deudas.fecha_ult_deuda = cuota.fecha_ini
      }

      return deudas
    }, {})


    res.json({ cuotasMante, deudas: deuda })
  }

  static async getCuotasDeUnDia(req: any, res: any) {

    const cuotasMante = await CuotasManModel.getAllByDay(dayEnd(req.params.fecha), dayStart(req.params.fecha))

    cuotasMante.forEach(el => {
      el.accion = el.accion.trim()
    })

    res.json(cuotasMante)
  }

  static async getMorososPorFecha(req: any, res: any) {

    const morosos = await CuotasManModel.getAllMorososInTimeRange(addHour(req.body.startDate, -4), parse(req.body.endDate))

    morosos.forEach(el => {
      el.accion = el.accion.trim()
    })

    res.json({ morosos })
  }

  static async getCuotasPorFecha(req: any, res: any) {

    const pagos = await CuotasManModel.getAllPagosInOneMonth(addHour(req.body.startDate, -4), parse(req.body.endDate))

    pagos.forEach(el => {
      el.accion = el.accion.trim()
    })

    res.json(pagos)
  }


}
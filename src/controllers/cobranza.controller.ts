// import { addDay, addHour, dayEnd, dayStart, monthEnd, monthStart, parse } from "@formkit/tempo"
import { CobranzsaModel } from "../models/cobranza.model"
import { deuda } from "../services/deuda"
import { fechaMasCercana } from "../services/fechaMasCercana"

export class Cobranza {
  static async getInfoCobranza(_req: any, res: any) {

    //informacion personal de los socios
    const socios = await CobranzsaModel.getAllSocios()

    const mantenimiento = await CobranzsaModel.getAllMantenimientos()

    const result = Object.groupBy(mantenimiento, ({ accion }) => accion)

    if (socios && result) {
      const data = socios.map((socio) => {

        return {
          info_personal: socio,
          cuotas_man: result[socio.accion],
          ultimo_pago: fechaMasCercana(result[socio.accion]),
          deuda: deuda(result[socio.accion])

        }
      })
      res.json(data)
    }

  }

}
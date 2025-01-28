import { CobranzsaModel } from "../models/cobranza.model"
import { deuda } from "../services/deuda"
import { fechaMasCercana } from "../services/fechaMasCercana"

export class Cobranza {
  static async getInfoCobranza(_req: any, res: any) {

    //informacion personal de los socios
    const socios = await CobranzsaModel.getAllSocios()

    const cargos = await CobranzsaModel.getCargosPendientes()

    const mantenimiento = await CobranzsaModel.getAllMantenimientos()

    const result = Object.groupBy(mantenimiento, ({ accion }) => accion)

    const result2 = Object.groupBy(cargos, ({ accion }: { accion: any }) => accion)

    console.log(result2)

    if (socios && result) {
      const data = socios.filter(socio => socio.accion?.includes('D') ? false : true).map((socio) => {

        //cuota mantenimiento
        const deudaSocio = deuda(result[socio.accion])
        const total_divisa = deudaSocio.reduce((acc, cv) => acc + cv.divisa, 0)

        //cargos
        const cargos = result2[socio.accion]
        const cargos_cantidad = cargos?.length
        const cargos_divisa = cargos?.reduce((acc: any, cv: any) => acc + cv.divisa, 0)



        return {
          // info_personal: socio,
          accion: socio.accion,
          cedula: socio.cedula,
          celular: socio.celular,
          e_mail: socio.e_mail,
          nombre: socio.nombre,
          telefonos: socio.telefonos,
          // cuotas_man: result[socio.accion],
          ultimo_pago: fechaMasCercana(result[socio.accion]),
          // deuda: deudaSocio,
          cant_cuotas_vencidas: deudaSocio.length,
          total_divisa,
          cargos_divisa,
          cargos_cantidad,
          deuda_total: (cargos_divisa ? cargos_divisa : 0) + (total_divisa ? total_divisa : 0)
        }
      })
      res.json(data)
    }

  }

}
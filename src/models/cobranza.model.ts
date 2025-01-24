import { prisma } from '../libs/prisma'

export class CobranzsaModel {
  static async getAllMantenimientos() {
    const mante = await prisma.data_mante.findMany({
      select: {
        accion: true,
        mes_cuota: true,
        marca: true,
        monto: true,
        divisa: true,
        fecha_ini: true,
        fecha_can: true,
        factura: true,
      }
    })

    //antes de pasar esta info puedo conseguir la info del ultimo pago de cada accion.

    const result = mante.map(man => {
      man.accion = man.accion.trim()
      return man
    })

    return result
  }

  static async getAllSocios() {
    try {
      const socios = await prisma.mae_socios.findMany({
        select: {
          accion: true,
          cedula: true,
          nombre: true,
          celular: true,
          e_mail: true,
          telefonos: true
        }
      })

      return socios
    } catch (error) {
      return false
    }
  }

}
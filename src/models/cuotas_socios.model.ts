import { prisma } from '../libs/prisma'

export class CuotasManModel {
  static async getAll() {
    const mante = await prisma.data_mante.findMany({
      select: {
        accion: true,
        mes_cuota: true,
        marca: true,
        monto: true,
        divisa: true,
        fecha_ini: true,
      }
    })
    return mante
  }

  static SortMaintenaceByAction(cuotas: any) {

    const sortedByAction = cuotas.reduce((acc: any, el: any) => {
      const { accion, marca, monto, divisa, fecha_ini } = el

      const sliceAction = accion.trim()
      const date = fecha_ini.toISOString().split('T')[0];
      const CuotaMonnth = fecha_ini.getMonth()
      const CurrentMonth = new Date().getMonth()

      if (!acc[sliceAction]) {
        acc[sliceAction] = {
          accion: sliceAction,
          cuotas: [],
          deudaTotal: 0,
          mesesVencidos: 0,
          deudaDolares: 0,
          deudaDesde: ""
        }
      }

      if (!marca && acc[sliceAction].deudaDesde == "") { acc[sliceAction].deudaDesde = date }

      if (!marca && CuotaMonnth < CurrentMonth - 1) {
        acc[sliceAction].mesesVencidos++
        acc[sliceAction].deudaTotal += monto
        acc[sliceAction].deudaDolares += divisa
      }



      acc[sliceAction].cuotas.push({ marca, monto, divisa, date })

      return acc
    }, {})

    return sortedByAction
  }

}
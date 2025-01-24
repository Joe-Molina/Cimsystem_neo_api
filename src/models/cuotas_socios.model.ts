import { format } from '@formkit/tempo'
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
        fecha_can: true,
        factura: true,
      }
    })
    return mante
  }

  static async getAllByDay(endDate: Date, startDate: Date) {
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
      },
      where: {
        fecha_can: {
          gte: startDate,
          lte: endDate
        }
      }
    })
    return mante
  }

  static async getAllPagosByMonth(startDate: Date, endDate: Date) {
    // sirve todos los pagos que se hicieron en el mes, sean o no para pagar las cuotas de ese mes
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
      },
      where: {
        fecha_can: {
          gte: startDate,
          lte: endDate
        }
      }
    })
    return mante
  }

  static async getAllPagosInOneMonth(startDate: Date, endDate: Date) {
    // sirve todos los pagos que se hicieron en un mes, para pagar ese mes (ej: todos los pagos de enero que se hicieron para pagar enero)

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
      },
      where: {
        fecha_can: {
          gte: startDate,
          lte: endDate
        },
        fecha_ini: startDate
      }
    })
    return mante
  }

  static async getAllMorososInTimeRange(startDate: Date, endDate: Date) {
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
      },
      where: {
        fecha_ini: {
          gte: startDate,
          lte: endDate
        },
        fecha_can: null
      }
    })
    return mante
  }

  static async getOne(accion: string) {
    const mante = await prisma.data_mante.findMany({
      select: {
        accion: true,
        mes_cuota: true,
        marca: true,
        monto: true,
        divisa: true,
        fecha_ini: true,
        fecha_can: true,
      },
      where: {
        accion
      }
    })
    return mante
  }

  static SortMaintenaceByAction(cuotas: any) {

    const sortedByAction = cuotas.reduce((acc: any, el: any) => {
      const { accion, marca, monto, divisa, fecha_ini, fecha_can } = el

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

      acc[sliceAction].cuotas.push({ marca, monto, divisa, date, fecha_can })

      return acc
    }, {})

    return sortedByAction
  }

  static getFacturacionPorDia(cuotas: any) {

  }

  static async getAllPagosInTimeRange(startDate: Date, endDate: Date) {
    // sirve todos los pagos que se hicieron en un mes, para pagar ese mes (ej: todos los pagos de enero que se hicieron para pagar enero)

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
      },
      where: {
        fecha_can: {
          gte: startDate,
          lte: endDate
        }
      }
    })
    return mante
  }

}
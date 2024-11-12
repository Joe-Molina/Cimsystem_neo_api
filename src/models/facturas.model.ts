import { prisma } from '../libs/prisma'

export class FacturasModel {

  static async getAll(accion: string) {
    const data = await prisma.mae_factura.findMany({
      where: {
        accion
      },
      select: {
        numero: true,
        accion: true,
        total: true,
        sub_total: true,
        monto_iva: true,
        recibido: true,
        fecha_hora: true,

      },
      orderBy: {
        fecha_hora: 'desc'
      }
    })

    return data
  }

  static async getAllDetails(factura: string) {
    const data = await prisma.deta_factura.findMany({
      where: {
        numero: factura
      },
      select: {
        numero: true,
        accion: true,
        descripcio: true,
        pvp: true,
        cantidad: true,
        importe: true,
        fecha_hora: true,
      }
    })

    return data
  }


}
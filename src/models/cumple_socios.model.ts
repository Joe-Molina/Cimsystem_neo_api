import { prisma } from '../libs/prisma'

export class PartnerBirthdaysModel {
  static async getAllPartners() {
    const socios = await prisma.mae_socios.findMany({
      select: {
        activa: true,
        accion: true,
        cedula: true,
        fecha_nac: true,
        celular: true,
        e_mail: true,
        nombre: true
      }
    })

    return socios
  }


}
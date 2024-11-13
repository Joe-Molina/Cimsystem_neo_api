import { prisma } from '../libs/prisma'

export class PartnerBirthdaysModel {
  static async getAllPartners() {
    const getSocios = await prisma.mae_socios.findMany({
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

    const getConyuges = await prisma.deta_socios.findMany({
      where: {
        par_fam: 1
      },
      select: {
        activa: true,
        accion: true,
        fec_fam: true,
        nom_fam: true,
        cel_fam: true,
        email_fam: true,
      }
    })

    const socios = await getSocios.filter((e: any) => e?.accion[0] !== "D")
    const conyuges = await getConyuges.filter((e: any) => e?.accion[0] !== "D")

    return { socios, conyuges }
  }

  static async getAccionContact(accion: string) {
    const getContact = await prisma.mae_socios.findFirst({
      select: {
        celular: true,
        e_mail: true,
      },
      where: {
        accion
      }
    })

    return { celular: getContact?.celular, email: getContact?.e_mail }
  }

}
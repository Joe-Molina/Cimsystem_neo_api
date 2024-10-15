import { prisma } from '../libs/prisma'
import { PartnerBirthdaysModel } from '../models/cumple_socios.model'

export class PartnerBirthdays {

  static async getAll(_req: any, res: any) {

    const socios = await PartnerBirthdaysModel.getAllPartners()

    const familiares = await prisma.deta_socios.findMany({
      where: {
        par_fam: 1
      },
      select: {
        activa: true,
        accion: true,
        fec_fam: true,
        nom_fam: true,

      }
    })

    const data: any = [...socios, ...familiares]

    const sin_disfrutantes = await data.filter((e: any) => e?.accion[0] !== "D")

    console.log(sin_disfrutantes)

    const cumples = await sin_disfrutantes.reduce((acc: any, el: any) => {

      const { accion, activa, cedula, fec_fam, fecha_nac, celular, e_mail, nom_fam, nombre } = el

      if (!acc[accion]) {
        acc[accion] = {
          accion,
          celular,
          e_mail,
          socios: []
        }
      }
      acc[accion].socios.push({ nombre: nombre || nom_fam, fecha_nac: fec_fam || fecha_nac })

      return acc
    }, {})

    return (cumples)
      ? res.json(cumples)
      : res.sendStatus(404)
  }




}


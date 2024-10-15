import { SociosModel } from "../models/socios.model"


export class Socios {
  static async getOne(req: any, res: any) {

    const { accion } = req.params

    const socio = await SociosModel.getPartner(accion)
    const familiares = (await SociosModel.getAllFamiliares(accion))
    const pases = (await SociosModel.getAllPases(accion))

    res.json({ socio, familiares, pases })
  }

  static async getAll(req: any, res: any) {

    const socios = (await SociosModel.getAllPartners()).filter((e: any) => e.activa == true)

    res.json(socios)
  }
}
import { FacturasModel } from "../models/facturas.model"


export class Facturas {
  static async getAll(req: any, res: any) {
    const facturas = await FacturasModel.getAll(req.params.accion)
    res.json(facturas)

  }

  static async getAllDetails(req: any, res: any) {
    const detallesFactura = await FacturasModel.getAllDetails(req.params.factura)
    res.json(detallesFactura)

  }

}
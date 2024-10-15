import { CuotasManModel } from "../models/cuotas_socios.model"


export class CuotasMan {
  static async getAll(_req: any, res: any) {

    const cuotasMante = await CuotasManModel.getAll()

    const deuda_socios = await CuotasManModel.SortMaintenaceByAction(cuotasMante)

    res.json(deuda_socios)
  }

}
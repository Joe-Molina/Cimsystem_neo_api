import { isBefore } from "@formkit/tempo"

export const deuda = (cuotas_mante: any[] | undefined) => {

  const date = new Date()

  if (cuotas_mante) {
    const cuotas_vencidas = cuotas_mante.filter((cuota) => isBefore(cuota.fecha_ini, date) && cuota.marca == false ? cuota : false)
    return cuotas_vencidas
  } else {
    return []
  }

}
import { addDay, addMonth, isAfter, isBefore } from "@formkit/tempo"

export const deuda = (cuotas_mante: any[] | undefined) => {

  const date = new Date()

  if (cuotas_mante) {

    const cuotas_vencidas = cuotas_mante.filter((cuota) => isBefore(cuota.fecha_ini, date) && cuota.marca == false ? cuota : false)

    cuotas_vencidas.map((cuota) => {

      if (isAfter(date, addDay(addMonth(cuota.fecha_ini), 5))) {
        cuota.divisa = cuota.divisa + (cuota.divisa * 0.1)
      }
    })

    return cuotas_vencidas
  } else {
    return []
  }

}
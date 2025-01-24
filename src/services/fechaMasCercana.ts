import { isAfter } from "@formkit/tempo";

export function fechaMasCercana(mantenimientos: any[] | undefined) {
  // Validar que `mantenimientos` es un array válido y no está vacío
  if (!Array.isArray(mantenimientos) || mantenimientos.length === 0) {
    return null;
  }

  // Filtrar los elementos nulos o sin `fecha_can`
  const mantenimientosValidos = mantenimientos.filter(
    (mantenimiento) => mantenimiento && mantenimiento.fecha_can
  );

  if (mantenimientosValidos.length === 0) {
    return null;
  }

  // Reducir para encontrar la fecha más cercana
  const fechaCercana = mantenimientosValidos.reduce((acumulador: any, actual: any) => {
    return isAfter(actual.fecha_can, acumulador.fecha_can) ? actual : acumulador;
  });

  return fechaCercana;
}
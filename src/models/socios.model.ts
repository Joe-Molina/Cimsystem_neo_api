import { prisma } from '../libs/prisma'

export class SociosModel {

  static async getAllPartners() {
    const socio = await prisma.mae_socios.findMany({
      select: {
        accion: true,
        activa: true,
        status: true,
        cedula: true,
        nombre: true,
        tipo_socio: true,
      }
    })
    return socio
  }

  static async getPartner(accion: any) {
    const socio = await prisma.mae_socios.findFirst({
      select: {
        nombre: true,
        accion: true,
        activa: true,
        status: true,
        tipo_socio: true,
        fecha_nac: true,
        e_mail_rep: true,
        fax_tra: true,
        sexo: true,
        nfcId: true,
        cedula: true,
        e_mail: true,
        estado_civ: true,
        nacionalid: true,
        direccion: true,
        celular: true,
        telefonos: true,
        telefonos_rep: true,
        telefonos_tra: true,
        empresa_tra: true,
        cedula_rep: true,
        nombre_rep: true,
        cuotas_man: true,
        rif_tra: true,
        profesion: true,
        nota: true,
        fecha_ing: true,
      },
      where: {
        accion
      }
    })

    let nacionalidad: string = ""

    switch (socio?.nacionalid) {
      case 1:
        nacionalidad = "Venezolano"
        break; // al encontrar este 'break' no se continuará con el siguiente 'default:'
      case 2:
        nacionalidad = "Italiana"
        break; // al encontrar este 'break' no se continuará con el siguiente 'default:'
      case 3:
        nacionalidad = "Española"
        break; // al encontrar este 'break' no se continuará con el siguiente 'default:'
      case 4:
        nacionalidad = "Portuguesa"
        break; // al encontrar este 'break' no se continuará con el siguiente 'default:'
      case 5:
        nacionalidad = "Colombiana"
        break; // al encontrar este 'break' no se continuará con el siguiente 'default:'
      case 6:
        nacionalidad = "Peruana"
        break; // al encontrar este 'break' no se continuará con el siguiente 'default:'
      case 7:
        nacionalidad = "Estadounidense"
        break; // al encontrar este 'break' no se continuará con el siguiente 'default:'
      case 8:
        nacionalidad = "China"
        break; // al encontrar este 'break' no se continuará con el siguiente 'default:'
      case 9:
        nacionalidad = "Mexicana"
        break; // al encontrar este 'break' no se continuará con el siguiente 'default:'
      case 10:
        nacionalidad = "Brasilera"
        break; // al encontrar este 'break' no se continuará con el siguiente 'default:'
      case 11:
        nacionalidad = "Libaneza"
        break; // al encontrar este 'break' no se continuará con el siguiente 'default:'
      case 12:
        nacionalidad = "Argentina"
        break; // al encontrar este 'break' no se continuará con el siguiente 'default:'
      case 13:
        nacionalidad = "Chilena"
        break; // al encontrar este 'break' no se continuará con el siguiente 'default:'
      case 14:
        nacionalidad = "Austriaca"
        break; // al encontrar este 'break' no se continuará con el siguiente 'default:'
      case 15:
        nacionalidad = "Uruguaya"
        break; // al encontrar este 'break' no se continuará con el siguiente 'default:'
      case 16:
        nacionalidad = "Francesa"
        break; // al encontrar este 'break' no se continuará con el siguiente 'default:'
      case 17:
        nacionalidad = "Alemana"
        break; // al encontrar este 'break' no se continuará con el siguiente 'default:'
      case 18:
        nacionalidad = "Japonesa"
        break; // al encontrar este 'break' no se continuará con el siguiente 'default:'
      case 19:
        nacionalidad = "Cubana"
        break; // al encontrar este 'break' no se continuará con el siguiente 'default:'
      case 20:
        nacionalidad = "Ecuatoriana"
        break; // al encontrar este 'break' no se continuará con el siguiente 'default:'
      case 21:
        nacionalidad = "Siria"
        break; // al encontrar este 'break' no se continuará con el siguiente 'default:'
    }

    const response = { ...socio, nombre_rep: socio?.nombre_rep?.trim(), nacionalidad }

    return response
  }

  static async getAllFamiliares(accion: any) {
    const familiares = await prisma.deta_socios.findMany({
      select: {
        accion: true,
        nom_fam: true,
        fec_fam: true,
        sexo_fam: true,
        nfcId: true,
        ced_fam: true,
        par_fam: true,
        cel_fam: true,
        email_fam: true,
        edo_civil: true,
      },
      where: {
        accion
      }
    })

    return familiares
  }

  static async getAllPases(accion: any) {
    const pases = await prisma.carnet_traba.findMany({
      select: {
        accion: true,
        nombre: true,
        activo: true,
        cedula: true,
        cargo: true,
        email: true,
        fecha_venc: true,
        nfcId: true,
        celular: true,
      },
      where: {
        accion
      }
    })

    pases.forEach((p: any) => {
      if (typeof p.nombre == 'string') {
        p.nombre = p.nombre.trim()

      }
    })

    return pases

  }

  static async getAllguests(accion: any) {
    const invitados = await prisma.invitados.findMany({
      select: {
        accion: true,
        cedula_i: true,
        nombre_i: true,
        fecha_hora: true,
        tipo_pase: true,
        id_invit: true,
      },
      where: {
        accion
      },
      orderBy: {
        fecha_hora: 'desc'
      }
    })

    return invitados

  }

}
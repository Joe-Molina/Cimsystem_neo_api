import { PartnerBirthdaysModel } from '../models/cumple_socios.model'

export class PartnerBirthdays {

  static async getAll(_req: any, res: any) {

    const { socios, conyuges } = await PartnerBirthdaysModel.getAllPartners()

    const data = { ...socios, ...conyuges }

    const cumples = await data.reduce((acc: any, el: any) => {

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


  static async getTodayBirdthDays(_req: any, res: any) {

    const { socios, conyuges } = await PartnerBirthdaysModel.getAllPartners()

    const itsYourBirdthDay = (date: Date | null, daysAfter: number = -1) => {
      const compareDay = (day: number) => {
        const todayDay = new Date().getDate() + daysAfter
        if (day && todayDay == day) return true
      }

      const compareMonth = (month: number) => {
        const todayMonth = new Date().getMonth()
        if (todayMonth == month) return true
      }

      return (date && (compareDay(date.getDate()) && compareMonth(date.getMonth())))
    }

    const Socios = socios.filter(socio => {
      return itsYourBirdthDay(socio.fecha_nac)
    })

    const Conyuges = conyuges.filter(conyuge => {
      return itsYourBirdthDay(conyuge.fec_fam)
    })

    const updatedConyuges = await Promise.all(Conyuges.map(async (e) => {
      const { celular, email } = await PartnerBirthdaysModel.getAccionContact(e.accion);

      console.log(celular, email);

      if (celular) {
        e.cel_fam = celular; // Modificar directamente la propiedad
      }

      if (email) {
        e.email_fam = email; // Modificar directamente la propiedad
      }

      return e; // Devolver el objeto actualizado
    }));

    return res.json({ Socios, updatedConyuges })

  }

  static async getTomorrowBirdthDays(_req: any, res: any) {

    const { socios, conyuges } = await PartnerBirthdaysModel.getAllPartners()

    const itsYourBirdthDay = (date: Date | null, daysAfter: number = -1) => {
      const compareDay = (day: number) => {
        const todayDay = new Date().getDate() + daysAfter
        if (day && todayDay == day) return true
      }

      const compareMonth = (month: number) => {
        const todayMonth = new Date().getMonth()
        if (todayMonth == month) return true
      }

      return (date && (compareDay(date.getDate()) && compareMonth(date.getMonth())))
    }

    const Socios = socios.filter(socio => {
      return itsYourBirdthDay(socio.fecha_nac, 0)
    })

    const Conyuges = conyuges.filter(conyuge => {
      return itsYourBirdthDay(conyuge.fec_fam, 0)
    })

    const updatedConyuges = await Promise.all(Conyuges.map(async (e) => {
      const { celular, email } = await PartnerBirthdaysModel.getAccionContact(e.accion);

      console.log(celular, email);

      if (celular) {
        e.cel_fam = celular; // Modificar directamente la propiedad
      }

      if (email) {
        e.email_fam = email; // Modificar directamente la propiedad
      }

      return e; // Devolver el objeto actualizado
    }));

    return res.json({ Socios, updatedConyuges })

  }

  static async getMonthBirdthDays(_req: any, res: any) {

    const { socios, conyuges } = await PartnerBirthdaysModel.getAllPartners()

    const itsYourBirdthDay = (date: Date | null) => {

      const compareMonth = (month: number) => {
        const todayMonth = new Date().getMonth()
        if (todayMonth == month) return true
      }

      return (date && compareMonth(date.getMonth()))
    }

    const Socios = socios.filter(socio => {
      return itsYourBirdthDay(socio.fecha_nac)
    })

    const Conyuges = conyuges.filter(conyuge => {
      return itsYourBirdthDay(conyuge.fec_fam)
    })

    const updatedConyuges = await Promise.all(Conyuges.map(async (e) => {
      const { celular, email } = await PartnerBirthdaysModel.getAccionContact(e.accion);

      console.log(celular, email);

      if (celular) {
        e.cel_fam = celular; // Modificar directamente la propiedad
      }
      if (email) {
        e.email_fam = email; // Modificar directamente la propiedad
      }

      return e; // Devolver el objeto actualizado
    }));

    return res.json({ Socios, updatedConyuges })

  }

}


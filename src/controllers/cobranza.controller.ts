import { CobranzsaModel } from "../models/cobranza.model"
import { deuda } from "../services/deuda"
import { fechaMasCercana } from "../services/fechaMasCercana"
import nodemailer from 'nodemailer'

export class Cobranza {

  static async sentMail(_req: any, res: any) {

    try {
      const socios = await CobranzsaModel.getAllSocios()
      const cargos = await CobranzsaModel.getCargosPendientes()
      const mantenimiento = await CobranzsaModel.getAllMantenimientos()
      const result = Object.groupBy(mantenimiento, ({ accion }) => accion)
      const result2 = Object.groupBy(cargos, ({ accion }: { accion: any }) => accion)

      const data = socios && socios.filter(socio => !socio.accion?.includes('D')).map((socio) => {

        //cuota mantenimiento
        const deudaSocio = deuda(result[socio.accion])
        const total_divisa = deudaSocio.reduce((acc, cv) => acc + cv.divisa, 0)

        //cargos
        const cargos = result2[socio.accion]
        const cargos_cantidad = cargos?.length
        const cargos_divisa = cargos?.reduce((acc: any, cv: any) => acc + cv.divisa, 0)

        return {
          // info_personal: socio,
          accion: socio.accion,
          cedula: socio.cedula,
          celular: socio.celular,
          e_mail: socio.e_mail,
          nombre: socio.nombre,
          telefonos: socio.telefonos,
          // cuotas_man: result[socio.accion],
          ultimo_pago: fechaMasCercana(result[socio.accion]),
          // deuda: deudaSocio,
          cant_cuotas_vencidas: deudaSocio.length,
          total_divisa,
          cargos_divisa,
          cargos_cantidad,
          deuda_total: (cargos_divisa ? cargos_divisa : 0) + (total_divisa ? total_divisa : 0)
        }
      }).filter(socio => socio.cant_cuotas_vencidas > 1)

      // const socios = req.body.data

      const enviarCorreo = async (data: any) => {

        const text = `<p>
    Estimado(a) Socio(a)<br/>
    ${data.nombre}<br/>

    Reciba nuestros cordiales  saludos, en nombre del Dpto. de Cobranzas de CASA DE ITALIA DE MARACAY. Le escribimos el dia de hoy para hacerle un amable recordatorio en relación a sus cuotas vencidas con nuestra Asociación, bajo el Nro. De Acción ${data.accion} <br/>

    El monto total pendiente,  es de $${data.deuda_total.toFixed(2)}, su pago equivalente en Bolívares (tasa BCV) al cambio del día, correspondiente a ${data.cant_cuotas_vencidas} cuotas. <br/>

    <img src="cid:cobranza" style="width: 200px; height: auto;">
    Agradecemos además su atención.<br/>
    atte. Dpto. de cobranzas<br/></p>`;
        // Configurar el transporte SMTP
        const transporter = nodemailer.createTransport({
          host: 'mail.casaitaliamaracay.com', // Cambia esto por el host SMTP de tu proveedor
          port: 465, // 587 para TLS, 465 para SSL
          secure: true, // true para 465, false para otros puertos
          auth: {
            user: 'cobranzas@casaitaliamaracay.com', // Tu correo
            pass: 'cob6805&57Qx4' // Tu contraseña
          }
        });
        // console.log(await transporter.verify())
        const info = await transporter.sendMail({
          from: `"Maryelin Ruiz" <cobranzas@casaitaliamaracay.com>`, // Remitente
          // to: `${data.e_mail}`, // Destinatario
          to: `joedodaniljr123@gmail.com`,
          cc: 'cobranzas@casaitaliamaracay.com',
          subject: 'Recordatorio de pagos de su accion en la CASA DE ITALIA DE MARACAY',
          text,
          html: `<p>
    Estimado(a) Socio(a)<br/>
    ${data.nombre}<br/><br/>

    Reciba nuestros cordiales  saludos, en nombre del Dpto. de Cobranzas de CASA DE ITALIA DE MARACAY. Le escribimos el dia de hoy para hacerle un amable recordatorio en relación a sus cuotas vencidas con nuestra Asociación, bajo el Nro. De Acción ${data.accion} <br/><br/>

    El monto total pendiente,  es de $${data.deuda_total.toFixed(2)}, su pago equivalente en Bolívares (tasa BCV) al cambio del día, correspondiente a ${data.cant_cuotas_vencidas} cuotas. <br/><br/>

    <img src="cid:cobranza" style="width: 100%; height: auto; display: block;"><br/><br/>
    Agradecemos además su atención.<br/><br/>
    Este mensaje se genera de manera automatica</p>
            `,
          attachments: [
            {
              filename: 'cobranza.jpeg',
              path: './assets/cobranza.jpeg', // Ruta local o URL
              cid: 'cobranza' // mismo cid que usaste en el html
            }
          ]
        });

        return ((info.rejected.length == 0) ? true : false);
      }

      const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

      const enviarCorreos = async (socios: any[]) => {
        const resultados = {
          correosEnviados: [] as any[], // Array para almacenar correos enviados correctamente
          correosFallidos: [] as any[], // Array para almacenar correos que fallaron
        };

        for (const socio of socios) {
          try {
            const correo = await enviarCorreo(socio); // Intenta enviar el correo

            console.log(correo)

            if (correo) {
              resultados.correosEnviados.push(socio); // Agrega el socio a correosEnviados
              await delay(3000); // Espera 3 segundos antes de enviar el siguiente correo
            } else {
              resultados.correosFallidos.push(socio); // Agrega el socio a correosFallidos
            }
          } catch (error) {
            console.error(`Error enviando correo a ${socio.email}:`, error);
            resultados.correosFallidos.push(socio); // Agrega el socio a correosFallidos si hay un error
          }
        }

        return resultados; // Devuelve el objeto con los resultados
      };

      const resultados = await enviarCorreos(data || [])

      res.json(resultados)
    } catch (error) {
      res.error(error)
    }
  }

  static async getInfoCobranza(_req: any, res: any) {

    //informacion personal de los socios
    const socios = await CobranzsaModel.getAllSocios()

    const cargos = await CobranzsaModel.getCargosPendientes()

    const mantenimiento = await CobranzsaModel.getAllMantenimientos()

    const result = Object.groupBy(mantenimiento, ({ accion }) => accion)

    const result2 = Object.groupBy(cargos, ({ accion }: { accion: any }) => accion)

    if (socios && result) {
      const data = socios.filter(socio => socio.accion?.includes('D') ? false : true).map((socio) => {

        //cuota mantenimiento
        const deudaSocio = deuda(result[socio.accion])
        const total_divisa = deudaSocio.reduce((acc, cv) => acc + cv.divisa, 0)

        //cargos
        const cargos = result2[socio.accion]
        const cargos_cantidad = cargos?.length
        const cargos_divisa = cargos?.reduce((acc: any, cv: any) => acc + cv.divisa, 0)

        return {
          // info_personal: socio,
          accion: socio.accion,
          cedula: socio.cedula,
          celular: socio.celular,
          e_mail: socio.e_mail,
          nombre: socio.nombre,
          telefonos: socio.telefonos,
          // cuotas_man: result[socio.accion],
          ultimo_pago: fechaMasCercana(result[socio.accion]),
          // deuda: deudaSocio,
          cant_cuotas_vencidas: deudaSocio.length,
          total_divisa,
          cargos_divisa,
          cargos_cantidad,
          deuda_total: (cargos_divisa ? cargos_divisa : 0) + (total_divisa ? total_divisa : 0)
        }
      })
      res.json(data)
    }

  }

}
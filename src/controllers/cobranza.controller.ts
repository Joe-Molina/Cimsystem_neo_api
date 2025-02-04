import { CobranzsaModel } from "../models/cobranza.model"
import { deuda } from "../services/deuda"
import { fechaMasCercana } from "../services/fechaMasCercana"
import nodemailer from 'nodemailer'

export class Cobranza {

  static async sentMail(req: any, res: any) {

    const socios = req.body.data

    try {
      const enviarCorreo = async (data: any) => {

        const text = `Estimado/a Socio/a 
      ${data.nombre}:
  
  Reciba nuestros cordiales  saludos, en nombre del Depto. de Cobranzas de CASA DE ITALIA DE MARACAY. Le escribimos el dia de hoy para hacerle un amable recordatorio en relación a sus cuentas pendientes(vencidas) con nuestra Asociación, bajo el Nro. De Acción ${data.accion}
  
  El monto total pendiente,  asciende a $${data.deuda_total.toFixed(2)} USD, su pago equivalente en Bolívares (tasa BCV) al cambio del dia, correspondiente a ${data.cant_cuotas_vencidas} cuota(s) vencida(s).
  
  Es importante acotar, que debe asegurarse que todas las cuotas por diferencia(aumentos) estén canceladas, aunque es nuestro deber informarle.
  
  Es muy importante recibir oportunamente sus pagos, eso nos permite retribui en mantenimientos constantes y demás obligaciones de la asociación. 
  
  Cualquier información adicional puede solicitarla via WhatsApp al teléfono 0412-7863830, a la presente dirección de correo, en recepción hasta las 10pm o en nuestras oficinas administrativas hasta las 5pm.
  
  En caso de hacer pago móvil o transferencias debe enviarlas igualmente por esta vía para el debido registro y posterior emisión de su factura.
  
  Es para nosotros un placer poder recibirle. Confiamos en su absoluta disposición y contamos con su aporte a la brevedad. 
  
  Agradecemos además su atención.
  
  Maryelin Ruiz
  Departamento de cobranzas
      `
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
          to: `joedodaniljr123@gmail.com`, // Destinatario
          cc: 'cobranzas@casaitaliamaracay.com',
          subject: 'Recordatorio de pagos de su accion en la CASA DE ITALIA DE MARACAY',
          text,
          html: `
            <p>Estimado/a Socio/a </p>
            <p>${data.nombre}:</p>
    
    <p>Reciba nuestros cordiales  saludos, en nombre del Depto. de Cobranzas de CASA DE ITALIA DE MARACAY. Le escribimos el dia de hoy para hacerle un amable recordatorio en relación a sus cuentas pendientes(vencidas) con nuestra Asociación, bajo el Nro. De Acción ${data.accion}</p>
    
    <p>El monto total pendiente,  asciende a $${data.deuda_total.toFixed(2)} USD, su pago equivalente en Bolívares (tasa BCV) al cambio del dia, correspondiente a ${data.cant_cuotas_vencidas} cuota(s) vencida(s).</p>
    
    <p>Es importante acotar, que debe asegurarse que todas las cuotas por diferencia(aumentos) estén canceladas, aunque es nuestro deber informarle.</p>
    
    <p>Es muy importante recibir oportunamente sus pagos, eso nos permite retribuir en mantenimientos constantes y demás obligaciones de la asociación. </p>
    
    <p>Cualquier información adicional puede solicitarla via WhatsApp al teléfono 0412-7863830, a la presente dirección de correo, en recepción hasta las 10pm o en nuestras oficinas administrativas hasta las 5pm.</p>
    
    <p>En caso de hacer pago móvil o transferencias debe enviarlas igualmente por esta vía para el debido registro y posterior emisión de su factura.</p>
    
    <p>Es para nosotros un placer poder recibirle. Confiamos en su absoluta disposición y contamos con su aporte a la brevedad. </p>
    
    <p>Agradecemos además su atención.</p>
    
    <p>Maryelin Ruiz</p>
    <p>Departamento de cobranzas</p>
            `
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

      const resultados = await enviarCorreos(socios)

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
import express from 'express';
import { prisma } from './libs/prisma';

const app = express();

app.use(express.json());

const PORT = 3000;







app.get('/api/', async (req, res) => {
  const data = await prisma.data_mante.findMany({
    where: {
      accion: '00009'
    }
  })

  const deuda_socios = data.reduce((acc: any, el) => {
    const { accion, mes_cuota, marca, monto } = el

    if (!acc[accion]) {
      acc[accion] = {
        accion,
        cuotas: [],
        total_deuda: 0,
        meses_vencidos: 0,
      }
    }

    if (!marca) acc[accion].meses_vencidos++

    acc[accion].total_deuda += monto

    acc[accion].cuotas.push({ mes_cuota, marca, monto })


    return acc
  }, {})


  res.json(deuda_socios)
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
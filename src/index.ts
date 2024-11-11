import express from 'express';
import cors from 'cors';

import cumples from './routers/cumple_socios.routes';
import cuotas from './routers/cuotas_socios.routes'
import socios from './routers/socios.routes'
import facturas from './routers/facturas.routes'

const PORT = process.env.PORT ?? 3000;
const app = express();

app.use(express.json());
app.use(cors());

app.use('/cumples', cumples)
app.use('/cuotas', cuotas)
app.use('/socios', socios)
app.use('/facturas', facturas)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
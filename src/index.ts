import express from 'express';
import cors from 'cors';

import cumples from './routers/cumple_socios.routes';
import cuotas from './routers/cuotas_socios.routes'
import socios from './routers/socios.routes'

const app = express();

app.use(express.json());
app.use(cors());
const PORT = 3000;

app.use('/cumples', cumples)
app.use('/cuotas', cuotas)
app.use('/socios', socios)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
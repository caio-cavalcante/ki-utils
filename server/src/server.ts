import 'dotenv/config';
import express from 'express'
import type { Request, Response } from 'express'
import journalRoutes from './routes/journal.routes'
import cors from 'cors';

const app = express();
const PORT = 3333;

app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
    res.json({message: 'Hello World from the backend!'})
})

app.use('/journal', journalRoutes) 

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})
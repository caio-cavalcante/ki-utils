import express from 'express'
import type { Request, Response } from 'express'

const app = express();
const PORT = 3333;

app.get('/', (req: Request, res: Response) => {
    res.json({message: 'Hello World from the backend!'})
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})
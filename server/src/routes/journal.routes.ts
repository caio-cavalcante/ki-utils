import express, { Router } from 'express';
import { PrismaClient } from '../generated/prisma';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { content, mood } = req.body;

        if (!content) {
            res.status(400).json({ message: "Content is required" });
            return;
        }

        const newJournalEntry = await prisma.journalEntry.create({
            data: {
                content,
                mood,
            },
        });

        res.status(201).json(newJournalEntry)
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: error.message || "Internal Server Error"});
    }
});

router.get('/', async (req, res) => {
    try {
        const journalEntries = await prisma.journalEntry.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });

        res.status(200).json(journalEntries);
    } catch (error: string | any) {
        console.error(error);
        res.status(500).json({ message: error.message || "Internal Server Error" });
    }
});

export default router;

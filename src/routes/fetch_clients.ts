import express from "express";
import { Client } from "../entities/Client";

const router = express.Router();

router.get('/api/client', async (req, res) => {
    const clients = await Client.find({
        select: ['first_name', 'last_name'],
        relations: ['transactions']
    });

    return res.json(clients);
});

export {
    router as fetchClientRouter
}
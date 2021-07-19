import { createConnection } from "typeorm";
import dotenv from "dotenv";
import express from "express";
import { Client } from "./entities/Client";
import { Banker } from "./entities/Banker";
import { Transaction } from './entities/Transaction';
import { createClientRouter } from "./routes/create_client";
import { createBankerRouter } from "./routes/create_banker";
import { createTransactionRouter } from "./routes/create_transaction";
import { connectBankerToClientRouter } from "./routes/connect_banker_to_client";
import { deleteClientRouter } from "./routes/delete_client";
import { fetchClientRouter } from "./routes/fetch_clients";

dotenv.config();

const app = express();

const main = async () => {
    try {
        const connection = await createConnection({
            type: "postgres",
            host: process.env.DB_HOST!,
            port: +process.env.DB_PORT!,
            username: process.env.DB_USERNAME!,
            password: process.env.DB_PASSWORD!,
            database: process.env.DB_DATABASE!,
            entities: [
                Client,
                Banker,
                Transaction
            ],
            synchronize: true
        }); 
        console.log('Connected to Postgres');
        app.use(express.json());
        app.use(createClientRouter);
        app.use(createBankerRouter);
        app.use(createTransactionRouter);
        app.use(connectBankerToClientRouter);
        app.use(deleteClientRouter);
        app.use(fetchClientRouter);

        app.listen(8000, () => {
            console.log('Now running on port 8000');
        });
    } catch (error) {
        console.error(error);
        throw new Error('Unable to connect to Postgres');
    }
}

main();
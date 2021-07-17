import { createConnection } from "typeorm";
import dotenv from "dotenv";
import { Client } from "./entities/Client";
import { Banker } from "./entities/Banker";
import { Transaction } from './entities/Transaction';

dotenv.config();

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
    } catch (error) {
        console.error(error);
        throw new Error('Unable to connect to Postgres');
    }
}

main();
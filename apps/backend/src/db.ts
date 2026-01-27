import "reflect-metadata";
import { DataSource } from "typeorm";
import { SportsArticle } from "./entity";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "admin",
    password: "password",
    database: "sports_db",
    synchronize: true,
    logging: false,
    entities: [SportsArticle],
    migrations: [],
    subscribers: [],
});

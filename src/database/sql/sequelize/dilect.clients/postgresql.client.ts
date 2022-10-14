import { Logger } from "../../../../common/logger";
import { DbConfig } from "../datatbase.config";
//import { Client } from 'pg';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const mysql = require('mysql2');

export class MysqlClient {
    static async dropDb() {
        try {
            const config = DbConfig.config;
            const query = `DROP DATABASE IF EXISTS ${config.database}`;
            await MysqlClient.executeQuery(query);
        } catch (error) {
            Logger.instance().log(error.message);
        }
    }
    
    static async executeQuery(query: string) {
        try {
            const config = DbConfig.config;
            const client = new mysql({
                user: config.username,
                host: config.host,
                password: config.password,
                port: 3306,
            });

            await client.connect();
            await client.query(query);
            await client.end();
        } catch (err) {
            Logger.instance().log(err.message);
        }
    }

    public static createDb = async () => {
        try {
            const config = DbConfig.config;
            const query = `CREATE DATABASE ${config.database}`;
            await MysqlClient.executeQuery(query);
        } catch (error) {
            Logger.instance().log(error.message);
        }
    };
}

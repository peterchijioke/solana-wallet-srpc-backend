
import { DataSource } from 'typeorm';

import dotenv from "dotenv"

dotenv.config()




const {DB_USERNAME,DB_NAME,DB_PASSWORD,DB_HOST,DB_PORT,DB_TYPE}=process.env


export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: DB_TYPE as any ,
        host: DB_HOST,
        port: Number(DB_PORT),
        username: DB_USERNAME,
        password: DB_PASSWORD,
        database: DB_NAME,
        entities: [
            __dirname + './*.entity{.ts,.js}',
        ],
        synchronize: true,
      });
      return dataSource.initialize();
    },
  },
];

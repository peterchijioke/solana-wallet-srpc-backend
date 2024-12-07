
import { DataSource } from 'typeorm';


import * as dotenv from 'dotenv';
import { join } from 'path';
import { Config } from 'src/config';
dotenv.config();





const {DB_USERNAME,DB_NAME,DB_PASSWORD,DB_HOST,DB_PORT,DB_TYPE}=Config


export const databaseProviders = [
  {
   provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type:DB_TYPE as any ,
        host: DB_HOST,
        port: Number(DB_PORT),
        username: DB_USERNAME,
        password: DB_PASSWORD,
        database: DB_NAME,
       entities: [join(__dirname, './entity/*.entity{.ts,.js}')],
        synchronize: true, //remove in production
      });
      return dataSource.initialize();
    },
  },
];

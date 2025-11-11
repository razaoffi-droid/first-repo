import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Student } from './students/entities/student.entity';
dotenv.config();

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Student],
  synchronize: true, // dev only
});

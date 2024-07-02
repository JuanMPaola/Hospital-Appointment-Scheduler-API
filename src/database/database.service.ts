import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client } from 'pg';

@Injectable()
export class DatabaseService implements OnModuleInit {
    private client: Client;

    async onModuleInit() {
        this.client = new Client({
            host: 'localhost', 
            port: 5432,        
            user: 'postgres', 
            password: 'asdasd123',
            database: 'Hospital',
        });

        await this.client.connect();
    }

    // Function to create Tables if not exists, and to active UUID generative function.
    async createTables() {
        const activeUUIDQuery = `
        CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
      `;

        const createTablesQuery = `
        CREATE TABLE IF NOT EXISTS patient (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          name VARCHAR,
          age INTEGER,
          email VARCHAR,
          phone VARCHAR,
          born TIMESTAMP,
          username VARCHAR,
          password VARCHAR
        );

        CREATE TABLE IF NOT EXISTS doctor (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          name VARCHAR,
          email VARCHAR,
          username VARCHAR,
          password VARCHAR
        );

        CREATE TABLE IF NOT EXISTS specialties (
          id SERIAL PRIMARY KEY,
          title VARCHAR
        );

        CREATE TABLE IF NOT EXISTS doctor_specialties (
          specialty_id INTEGER,
          doctor_id UUID,
          PRIMARY KEY (specialty_id, doctor_id),
          FOREIGN KEY (specialty_id) REFERENCES specialties(id),
          FOREIGN KEY (doctor_id) REFERENCES doctor(id)
        );

        CREATE TABLE IF NOT EXISTS appointment (
          id SERIAL PRIMARY KEY,
          day DATE,
          starts_at TIMESTAMP,
          ends_at TIMESTAMP,
          doctor_id UUID,
          patient_id UUID,
          status VARCHAR,
          FOREIGN KEY (doctor_id) REFERENCES doctor(id),
          FOREIGN KEY (patient_id) REFERENCES patient(id)
        );

        CREATE TABLE IF NOT EXISTS days (
          id SERIAL PRIMARY KEY,
          day VARCHAR
        );

        CREATE TABLE IF NOT EXISTS time_range (
          id SERIAL PRIMARY KEY,
          time_range VARCHAR
        );

        CREATE TABLE IF NOT EXISTS doctor_availability (
          id SERIAL PRIMARY KEY,
          doctor_id UUID,
          day_id INTEGER,
          time_range_id INTEGER,
          FOREIGN KEY (doctor_id) REFERENCES doctor(id),
          FOREIGN KEY (day_id) REFERENCES days(id),
          FOREIGN KEY (time_range_id) REFERENCES time_range(id)
        );
          `;


        await this.client.query(activeUUIDQuery);
        await this.client.query(createTablesQuery);
        console.log('Tables created successfully');
    }

    //??
    async query(text: string, params?: any[]) {
        return this.client.query(text, params);
    }
}
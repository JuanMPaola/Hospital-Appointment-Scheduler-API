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
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name VARCHAR NOT NULL,
        email VARCHAR NOT NULL UNIQUE,
        password VARCHAR NOT NULL,
        role VARCHAR
      );
  
      CREATE TABLE IF NOT EXISTS patients (
        user_id UUID PRIMARY KEY,
        age INTEGER,
        phone VARCHAR,
        born TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      );
  
      CREATE TABLE IF NOT EXISTS doctors (
        user_id UUID PRIMARY KEY,
        FOREIGN KEY (user_id) REFERENCES users(id)
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
        FOREIGN KEY (doctor_id) REFERENCES doctors(user_id)
      );
  
      CREATE TABLE IF NOT EXISTS appointments (
        id SERIAL PRIMARY KEY,
        day DATE,
        starts_at TIMESTAMP,
        ends_at TIMESTAMP,
        doctor_id UUID,
        patient_id UUID,
        status VARCHAR,
        FOREIGN KEY (doctor_id) REFERENCES doctors(user_id),
        FOREIGN KEY (patient_id) REFERENCES patients(user_id)
      );
  
      CREATE TABLE IF NOT EXISTS days (
        id SERIAL PRIMARY KEY,
        day VARCHAR(20) NOT NULL
      );
  
      CREATE TABLE IF NOT EXISTS time_range (
        id SERIAL PRIMARY KEY,
        start_time TIME NOT NULL,
        end_time TIME NOT NULL
      );
  
      CREATE TABLE IF NOT EXISTS doctor_availability (
        id SERIAL PRIMARY KEY,
        doctor_id UUID,
        day_id INTEGER,
        time_range_id INTEGER,
        FOREIGN KEY (doctor_id) REFERENCES doctors(user_id),
        FOREIGN KEY (day_id) REFERENCES days(id),
        FOREIGN KEY (time_range_id) REFERENCES time_range(id)
      );
    `;

    const insertBasicInfoQuery = `
      DO $$
      BEGIN
       IF NOT EXISTS (SELECT 1 FROM days) THEN
          INSERT INTO days (day) VALUES 
            ('Monday'),
            ('Tuesday'),
            ('Wednesday'),
            ('Thursday'),
            ('Friday'),
            ('Saturday'),
            ('Sunday');
        END IF;
      
        IF NOT EXISTS (SELECT 1 FROM time_range) THEN
          INSERT INTO time_range (start_time, end_time) VALUES
                  ('08:00', '08:30'),
                  ('08:30', '09:00'),
                  ('09:00', '09:30'),
                  ('09:30', '10:00'),
                  ('10:00', '10:30'),
                  ('10:30', '11:00'),
                  ('11:00', '11:30'),
                  ('11:30', '12:00'),
                  ('12:00', '12:30'),
                  ('12:30', '13:00'),
                  ('13:00', '13:30'),
                  ('13:30', '14:00'),
                  ('14:00', '14:30'),
                  ('14:30', '15:00'),
                  ('15:00', '15:30'),
                  ('15:30', '16:00'),
                  ('16:00', '16:30'),
                  ('16:30', '17:00'),
                  ('17:00', '17:30'),
                  ('17:30', '18:00'),
                  ('18:00', '18:30'),
                  ('18:30', '19:00'),
                  ('19:00', '19:30'),
                  ('19:30', '20:00'),
                  ('20:00', '20:30'),
                  ('20:30', '21:00'),
                  ('21:00', '21:30'),
                  ('21:30', '22:00');
        END IF;
      END $$;
    `;

    const insertSpecialtiesQuery = `
    INSERT INTO specialties (title) VALUES
      ('Anesthesiology'),
      ('Cardiology'),
      ('Dermatology'),
      ('Emergency Medicine'),
      ('Family Medicine'),
      ('Internal Medicine'),
      ('Medical Genetics'),
      ('Neurology'),
      ('Nuclear Medicine'),
      ('Obstetrics and Gynecology'),
      ('Ophthalmology'),
      ('Orthopedic Surgery'),
      ('Otolaryngology (ENT)'),
      ('Pathology'),
      ('Pediatrics'),
      ('Physical Medicine and Rehabilitation'),
      ('Plastic Surgery'),
      ('Psychiatry'),
      ('Radiation Oncology'),
      ('Radiology'),
      ('Surgery'),
      ('Urology');
    `
      
    const deleteTablesQuery = `
      DROP TABLE IF EXISTS doctor_availability;
      DROP TABLE IF EXISTS time_range;
      DROP TABLE IF EXISTS days;
      DROP TABLE IF EXISTS appointments;
      DROP TABLE IF EXISTS doctor_specialties;
      DROP TABLE IF EXISTS specialties;
      DROP TABLE IF EXISTS doctors;
      DROP TABLE IF EXISTS patients;
      DROP TABLE IF EXISTS users;
   `;
  

    await this.client.query(activeUUIDQuery);
    await this.client.query(createTablesQuery);
    await this.client.query(insertBasicInfoQuery);
    await this.client.query(insertSpecialtiesQuery);
    console.log('Tables created successfully');

      // Query to reset DB
      //await this.client.query(deleteTablesQuery);
  }

  //Function to make queries outside the class
  async query(text: string, params?: any[]) {
    return this.client.query(text, params);
  }
}
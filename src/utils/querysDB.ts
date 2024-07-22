export const activeUUIDQuery = `
        CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
      `;

export const createTablesQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name VARCHAR NOT NULL,
        email VARCHAR NOT NULL UNIQUE,
        password VARCHAR NOT NULL,
        role VARCHAR NOT NULL
      );
  
      CREATE TABLE IF NOT EXISTS patients (
        user_id UUID PRIMARY KEY,
        age INTEGER NOT NULL,
        phone VARCHAR NOT NULL,
        born TIMESTAMP NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id)
      );
  
      CREATE TABLE IF NOT EXISTS doctors (
        user_id UUID PRIMARY KEY,
        FOREIGN KEY (user_id) REFERENCES users(id)
      );
  
      CREATE TABLE IF NOT EXISTS specialties (
        id SERIAL PRIMARY KEY,
        title VARCHAR NOT NULL
      );

        CREATE TABLE IF NOT EXISTS doctor_specialties (
        specialty_id INTEGER NOT NULL,
        doctor_id UUID NOT NULL,
        PRIMARY KEY (specialty_id, doctor_id),
        FOREIGN KEY (specialty_id) REFERENCES specialties(id),
        FOREIGN KEY (doctor_id) REFERENCES doctors(user_id)
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
        doctor_id UUID NOT NULL,
        day_id INTEGER NOT NULL,
        time_range_id INTEGER NOT NULL,
        FOREIGN KEY (doctor_id) REFERENCES doctors(user_id),
        FOREIGN KEY (day_id) REFERENCES days(id),
        FOREIGN KEY (time_range_id) REFERENCES time_range(id)
      );

      CREATE TABLE IF NOT EXISTS appointments (
        id SERIAL PRIMARY KEY,
        date DATE NOT NULL,
        time_range_id INTEGER NOT NULL,
        doctor_id UUID NOT NULL,
        patient_id UUID NOT NULL,
        status VARCHAR NOT NULL,
        FOREIGN KEY (doctor_id) REFERENCES doctors(user_id),
        FOREIGN KEY (patient_id) REFERENCES patients(user_id),
        FOREIGN KEY (time_range_id) REFERENCES time_range(id)
      );
    `;

export const insertBasicInfoQuery = `
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

export const insertSpecialtiesQuery = `
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
      
export const deleteTablesQuery = `
      DROP TABLE IF EXISTS doctor_availability;
      DROP TABLE IF EXISTS days;
      DROP TABLE IF EXISTS appointments;
      DROP TABLE IF EXISTS time_range;
      DROP TABLE IF EXISTS doctor_specialties;
      DROP TABLE IF EXISTS specialties;
      DROP TABLE IF EXISTS doctors;
      DROP TABLE IF EXISTS patients;
      DROP TABLE IF EXISTS users;
   `;

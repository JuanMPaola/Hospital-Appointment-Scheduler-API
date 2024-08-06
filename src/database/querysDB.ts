export const activeUUIDQuery = `
        CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
      `;

export const createTablesQuery = `
            DO $$
      BEGIN
          IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
              CREATE TYPE user_role AS ENUM ('admin', 'doctor', 'patient');
          END IF;
      END $$;
      
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'specialty_title') THEN
        CREATE TYPE specialty_title AS ENUM (
            'Anesthesiology',
            'Cardiology',
            'Dermatology',
            'Emergency Medicine',
            'Family Medicine',
            'Internal Medicine',
            'Medical Genetics',
            'Neurology',
            'Nuclear Medicine',
            'Obstetrics and Gynecology',
            'Ophthalmology',
            'Orthopedic Surgery',
            'Otolaryngology (ENT)',
            'Pathology',
            'Pediatrics',
            'Physical Medicine and Rehabilitation',
            'Plastic Surgery',
            'Psychiatry',
            'Radiation Oncology',
            'Radiology',
            'Surgery',
            'Urology'
        );
    END IF;
END $$;
      
      DO $$
      BEGIN
          IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'day_enum') THEN
              CREATE TYPE day_enum AS ENUM ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday');
          END IF;
      END $$;

      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role user_role NOT NULL
      );
    
      CREATE TABLE IF NOT EXISTS patients (
        user_id UUID PRIMARY KEY,
        age INTEGER NOT NULL,
        phone VARCHAR(15) NOT NULL,
        born DATE NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id)
      );
    
      CREATE TABLE IF NOT EXISTS doctors (
        user_id UUID PRIMARY KEY,
        FOREIGN KEY (user_id) REFERENCES users(id)
      );
    
      CREATE TABLE IF NOT EXISTS specialties (
        id SERIAL PRIMARY KEY,
        title specialty_title NOT NULL
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
        day day_enum NOT NULL
      );
    
      CREATE TABLE IF NOT EXISTS time_range (
        id SERIAL PRIMARY KEY,
        time_range VARCHAR(11) NOT NULL
      );
    
      CREATE TABLE IF NOT EXISTS doctor_weekly_availability (
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
        doctor_id UUID NOT NULL,
        patient_id UUID NOT NULL,
        date DATE NOT NULL,
        day_id INTEGER NOT NULL,
        time_range_id INTEGER NOT NULL,
        status VARCHAR(255) DEFAULT 'pending',
        FOREIGN KEY (doctor_id) REFERENCES doctors(user_id),
        FOREIGN KEY (patient_id) REFERENCES patients(user_id),
        FOREIGN KEY (day_id) REFERENCES days(id),
        FOREIGN KEY (time_range_id) REFERENCES time_range(id)
      );
    `;

    export const insertBasicInfoQuery = `
    DO $$
    BEGIN
     -- Insert days if they don't already exist
     IF NOT EXISTS (SELECT 1 FROM days) THEN
        INSERT INTO days (day) VALUES 
          ('Sunday'),  
          ('Monday'),
          ('Tuesday'),
          ('Wednesday'),
          ('Thursday'),
          ('Friday'),
          ('Saturday');
      END IF;
    
      -- Insert time ranges if they don't already exist
      IF NOT EXISTS (SELECT 1 FROM time_range) THEN
        INSERT INTO time_range (time_range) VALUES
        ('00:00-00:30'), ('00:30-01:00'), ('01:00-01:30'), ('01:30-02:00'),
        ('02:00-02:30'), ('02:30-03:00'), ('03:00-03:30'), ('03:30-04:00'),
        ('04:00-04:30'), ('04:30-05:00'), ('05:00-05:30'), ('05:30-06:00'),
        ('06:00-06:30'), ('06:30-07:00'), ('07:00-07:30'), ('07:30-08:00'),
        ('08:00-08:30'), ('08:30-09:00'), ('09:00-09:30'), ('09:30-10:00'),
        ('10:00-10:30'), ('10:30-11:00'), ('11:00-11:30'), ('11:30-12:00'),
        ('12:00-12:30'), ('12:30-13:00'), ('13:00-13:30'), ('13:30-14:00'),
        ('14:00-14:30'), ('14:30-15:00'), ('15:00-15:30'), ('15:30-16:00'),
        ('16:00-16:30'), ('16:30-17:00'), ('17:00-17:30'), ('17:30-18:00'),
        ('18:00-18:30'), ('18:30-19:00'), ('19:00-19:30'), ('19:30-20:00'),
        ('20:00-20:30'), ('20:30-21:00'), ('21:00-21:30'), ('21:30-22:00'),
        ('22:00-22:30'), ('22:30-23:00'), ('23:00-23:30'), ('23:30-00:00');
      END IF;

      -- Insert specialties if they don't already exist
      IF NOT EXISTS (SELECT 1 FROM specialties) THEN
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
      END IF;
    END $$;
  `;
      
  export const deleteTablesQuery = `
  DROP TABLE IF EXISTS appointments;
  DROP TABLE IF EXISTS doctor_availability;
  DROP TABLE IF EXISTS doctor_specialties;
  DROP TABLE IF EXISTS doctor_weekly_availability;
  DROP TABLE IF EXISTS days;
  DROP TABLE IF EXISTS doctors;
  DROP TABLE IF EXISTS time_range;
  DROP TABLE IF EXISTS specialties;
  DROP TABLE IF EXISTS patients;
  DROP TABLE IF EXISTS users;
  DROP TYPE IF EXISTS user_role;
  DROP TYPE IF EXISTS specialty_title;
  DROP TYPE IF EXISTS day_enum;
  `;

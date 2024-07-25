# Hospital Appointment Scheduler

# Content

- [Description](../README.MD#description)
- [Technical requirements](../README.MD#technical-requirements)
- [Database Documentation](documentation/database.md)
    - [Structure](#structure)
    - [Tables](#tables)
    - [Relations](#relations)
- [API Documentation](#api-documentation)
    - [Patients](#patients)
    - [Doctors](#doctors)
    - [Appointments](#appointments)
- [Install](../README.MD#install)
- [Run](../README.MD#run)

# Structure

This document provides a detailed overview of the database structure used in the project.

![Captura de pantalla 2024-07-25 140005](https://github.com/user-attachments/assets/0e235693-414c-40f0-aac1-0767c633ad88)

# Tables

## Users

This table stores all user information, including patients, doctors, and admins.

| Parameter | Type | Description |
| --- | --- | --- |
| id | uuid | Unique identifier for the user. |
| name | varchar | Name of the user. |
| email | varchar | Email address of the user. |
| password | varchar | Password for user authentication. |
| role | enum | Role of the user. Possible values: 'doctor', 'patient', 'admin'. |

```sql
CREATE TABLE users (
  id uuid PRIMARY KEY,
  name varchar,
  email varchar,
  password varchar,
  role enum('doctor', 'patient', 'admin')
);
```
<br>

## Patients
This table extends the users table to include additional information specific to patients.

| Parameter | Type | Description |
| --- | --- | --- |
| user_id | uuid | Unique identifier for the user, references users table. |
| age | integer | Age of the patient. |
| phone | varchar | Phone number of the patient. |
| born | timestamp | Birth date of the patient. |

```sql
CREATE TABLE patients (
  user_id uuid PRIMARY KEY,
  age integer,
  phone varchar,
  born timestamp,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

<br>

## Doctors
This table extends the users table to include additional information specific to doctors.

| Parameter | Type | Description |
| --- | --- | --- |
| user_id | uuid | Unique identifier for the user, references users table. |
```sql
CREATE TABLE doctors (
  user_id uuid PRIMARY KEY,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```
<br>

## Specialties

This table contains the different specialties that doctors can have.

| Parameter | Type | Description |
| --- | --- | --- |
| id | integer | Unique identifier for the specialty. |
| title | enum | The title of the specialty. Possible values include: 'Anesthesiology', 'Cardiology', 'Dermatology'. |

```sql
CREATE TABLE specialties (
  id integer PRIMARY KEY,
  title enum('Anesthesiology', 'Cardiology', 'Dermatology')
);
```

<br>

## Doctor_Specialties
This table maps doctors to their specialties, allowing each doctor to have multiple specialties.

| Parameter | Type | Description |
| --- | --- | --- |
| doctor_id | uuid | Unique identifier for the doctor. References the `user_id` in the `doctors` table. |
| specialty_id | integer | Unique identifier for the specialty. References the `id` in the `specialties` table. |

```sql
CREATE TABLE doctor_specialties (
  doctor_id uuid,
  specialty_id integer,
  PRIMARY KEY (doctor_id, specialty_id),
  FOREIGN KEY (doctor_id) REFERENCES doctors(user_id),
  FOREIGN KEY (specialty_id) REFERENCES specialties(id)
);
```

<br>

## Doctor_Availability
This table tracks the availability of doctors, specifying which days and time ranges they are available.

| Parameter | Type | Description |
| --- | --- | --- |
| id | integer | Primary key for the availability record. |
| doctor_id | uuid | Unique identifier for the doctor. References the `user_id` in the `doctors` table. |
| day_id | integer | Identifier for the day of the week. References the `id` in the `days` table. |
| time_range_id | integer | Identifier for the time range. References the `id` in the `time_range` table. |
| available | boolean | Indicates whether the doctor is available during the specified day and time range. |

```sql
CREATE TABLE doctor_availability (
  id serial PRIMARY KEY,
  doctor_id uuid,
  day_id integer,
  time_range_id integer,
  available boolean,
  FOREIGN KEY (doctor_id) REFERENCES doctors(user_id),
  FOREIGN KEY (day_id) REFERENCES days(id),
  FOREIGN KEY (time_range_id) REFERENCES time_range(id)
);
```

<br>

## Days
This table lists the days of the week, which are referenced in the `doctor_availability` table to specify the availability of doctors on particular days.

| Parameter | Type | Description |
| --- | --- | --- |
| id | integer | Primary key for the day. |
| day | enum | Day of the week (e.g., 'Monday', 'Tuesday', etc.). |

```sql
CREATE TABLE days (
  id serial PRIMARY KEY,
  day day_of_week_enum
);
```

<br>

## Time Range
This table lists the time ranges during which appointments can be scheduled. It is referenced in the `appointments` and `doctor_availability` tables to specify the time slots for appointments and availability.

| Parameter | Type | Description |
| --- | --- | --- |
| id | integer | Primary key for the time range. |
| time_range | enum | Time range (e.g., '08:00-09:00', '09:00-10:00', etc.). |

```sql
CREATE TABLE time_range (
  id serial PRIMARY KEY,
  time_range time_range_enum
);
```

<br>

## Appointments
This table tracks the appointments scheduled between doctors and patients. It includes details such as the doctor and patient involved, the date of the appointment, and its status.

| Parameter | Type | Description |
| --- | --- | --- |
| id | integer | Primary key for the appointment. |
| doctor_id | uuid | Foreign key referencing the `doctors` table, identifying the doctor involved in the appointment. |
| patient_id | uuid | Foreign key referencing the `patients` table, identifying the patient involved in the appointment. |
| date | date | Date of the appointment. |
| time_range_id | integer | Foreign key referencing the `time_range` table, specifying the time range for the appointment. |
| status | varchar | Status of the appointment (e.g., 'scheduled', 'completed', 'canceled'). |

```sql
CREATE TABLE appointments (
  id serial PRIMARY KEY,
  doctor_id uuid REFERENCES doctors(user_id),
  patient_id uuid REFERENCES patients(user_id),
  date date NOT NULL,
  time_range_id integer REFERENCES time_range(id),
  status varchar
);
```
<br>

# Relations

This section outlines the types of relationships between the tables in the database schema and explains their purpose.

### Users and Patients
- **`patients.user_id`** → **`users.id`**
    - **Type:** One-to-One
    - **Explanation:** Each patient is uniquely associated with a single user account. This relationship provides additional patient-specific details beyond the basic user information.

### Users and Doctors
- **`doctors.user_id`** → **`users.id`**
    - **Type:** One-to-One
    - **Explanation:** Each doctor is also uniquely associated with a single user account. This relationship ensures that doctor-specific details extend from the user profile.

### Appointments and Doctors
- **`appointments.doctor_id`** → **`doctors.user_id`**
    - **Type:** Many-to-One
    - **Explanation:** Multiple appointments can be scheduled with a single doctor. This relationship allows tracking of all appointments for each doctor.

### Appointments and Patients
- **`appointments.patient_id`** → **`patients.user_id`**
    - **Type:** Many-to-One
    - **Explanation:** Multiple appointments can be scheduled for a single patient. This relationship ensures that all appointments related to a specific patient are easily retrievable.

### Doctor_Specialties and Doctors
- **`doctor_specialties.doctor_id`** → **`doctors.user_id`**
    - **Type:** Many-to-One
    - **Explanation:** Each entry in `doctor_specialties` associates a doctor with a specific specialty. This relationship enables doctors to have multiple specialties while linking them to a specific doctor.

### Doctor_Specialties and Specialties
- **`doctor_specialties.specialty_id`** → **`specialties.id`**
    - **Type:** Many-to-One
    - **Explanation:** Each specialty can be associated with multiple doctors. This relationship facilitates the mapping of doctors to the specialties they offer.

### Doctor_Availability and Doctors
- **`doctor_availability.doctor_id`** → **`doctors.user_id`**
    - **Type:** Many-to-One
    - **Explanation:** Multiple availability records can exist for each doctor, specifying when the doctor is available. This relationship supports detailed scheduling of doctor availability.

### Doctor_Availability and Days
- **`doctor_availability.day_id`** → **`days.id`**
    - **Type:** Many-to-One
    - **Explanation:** Each availability record is linked to a specific day of the week. This relationship is used to define availability based on the days of the week.

### Doctor_Availability and Time_Range
- **`doctor_availability.time_range_id`** → **`time_range.id`**
    - **Type:** Many-to-One
    - **Explanation:** Each availability record is linked to a specific time range. This relationship specifies the available time slots for each doctor.

### Appointments and Time_Range
- **`appointments.time_range_id`** → **`time_range.id`**
    - **Type:** Many-to-One
    - **Explanation:** Each appointment is scheduled within a specific time range. This relationship ensures that appointments can be mapped to defined time slots.


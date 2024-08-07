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

![Captura de pantalla 2024-08-07 123145](https://github.com/user-attachments/assets/ba1af370-828a-424a-b746-34c24e0b52f8)

# Tables

## Users
This table stores all user information, including patients, doctors, and admins.

| Parameter | Type | Description |
| --- | --- | --- |
| `id` | uuid | Unique identifier for the user. |
| `name` | varchar(255) | Name of the user. |
| `email` | varchar(255) | Email address of the user. |
| `password` | varchar(255) | Password for user authentication. |
| `role` | user_role | Role of the user. Possible values: `admin`, `doctor`, `patient`. |

```sql
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role user_role NOT NULL
);
```

<br>

## Patients
This table extends the `users` table to include additional information specific to patients.

| Parameter | Type | Description |
| --- | --- | --- |
| `user_id` | uuid | Unique identifier for the user, references `users` table. |
| `age` | integer | Age of the patient. |
| `phone` | varchar(15) | Phone number of the patient. |
| `born` | date | Birth date of the patient. |

```sql
CREATE TABLE IF NOT EXISTS patients (
  user_id UUID PRIMARY KEY,
  age INTEGER NOT NULL,
  phone VARCHAR(15) NOT NULL,
  born DATE NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

<br>

## Doctors
This table extends the `users` table to include additional information specific to doctors.

| Parameter | Type | Description |
| --- | --- | --- |
| `user_id` | uuid | Unique identifier for the user, references `users` table. |

```sql
CREATE TABLE IF NOT EXISTS doctors (
  user_id UUID PRIMARY KEY,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```
<br>

## Specialties
This table contains the different specialties that doctors can have.

| Parameter | Type | Description |
| --- | --- | --- |
| `id` | integer | Unique identifier for the specialty. |
| `title` | specialty_title | The title of the specialty. Possible values include: `Anesthesiology`, `Cardiology`, `Dermatology`, `Emergency Medicine`, `Family Medicine`, `Internal Medicine`, `Medical Genetics`, `Neurology`, `Nuclear Medicine`, `Obstetrics and Gynecology`, `Ophthalmology`, `Orthopedic Surgery`, `Otolaryngology (ENT)`, `Pathology`, `Pediatrics`, `Physical Medicine and Rehabilitation`, `Plastic Surgery`, `Psychiatry`, `Radiation Oncology`, `Radiology`, `Surgery`, `Urology`. |

```sql
CREATE TABLE IF NOT EXISTS specialties (
  id SERIAL PRIMARY KEY,
  title specialty_title NOT NULL
);
```
<br>

## Doctor_Specialties
This table maps doctors to their specialties, allowing each doctor to have multiple specialties.

| Parameter | Type | Description |
| --- | --- | --- |
| `specialty_id` | integer | Unique identifier for the specialty. References the `id` in the `specialties` table. |
| `doctor_id` | uuid | Unique identifier for the doctor. References the `user_id` in the `doctors` table. |
```sql
CREATE TABLE IF NOT EXISTS doctor_specialties (
  specialty_id INTEGER NOT NULL,
  doctor_id UUID NOT NULL,
  PRIMARY KEY (specialty_id, doctor_id),
  FOREIGN KEY (specialty_id) REFERENCES specialties(id),
  FOREIGN KEY (doctor_id) REFERENCES doctors(user_id)
);
```
<br>

## Days
This table lists the days of the week.

| Parameter | Type | Description |
| --- | --- | --- |
| `id` | integer | Primary key for the day. |
| `day` | day_enum | Day of the week (e.g., `Monday`, `Tuesday`, etc.). |
```sql
CREATE TABLE IF NOT EXISTS days (
  id SERIAL PRIMARY KEY,
  day day_enum NOT NULL
);
```
<br>

## Time Range
This table lists the time ranges during which appointments can be scheduled. 
Time ranges are totally 48, being each one duration of 30 minutes.

| Parameter | Type | Description |
| --- | --- | --- |
| `id` | integer | Primary key for the time range. |
| `time_range` | varchar(11) | Time range (e.g., `08:00-08:30`, `08:30-09:00`, etc.). |
```sql
CREATE TABLE IF NOT EXISTS time_range (
  id SERIAL PRIMARY KEY,
  time_range VARCHAR(11) NOT NULL
);
```
<br>

## Doctor_Weekly_Availability
This table tracks the weekly availability of doctors, specifying which days and time ranges they are available.

| Parameter | Type | Description |
| --- | --- | --- |
| `id` | integer | Primary key for the availability record. |
| `doctor_id` | uuid | Unique identifier for the doctor. References the `user_id` in the `doctors` table. |
| `day_id` | integer | Identifier for the day of the week. References the `id` in the `days` table. |
| `time_range_id` | integer | Identifier for the time range. References the `id` in the `time_range` table. |
| `available` | boolean | Indicates whether the doctor is available during the specified day and time range. |
```sql
CREATE TABLE IF NOT EXISTS doctor_weekly_availability (
  id SERIAL PRIMARY KEY,
  doctor_id UUID NOT NULL,
  day_id INTEGER NOT NULL,
  time_range_id INTEGER NOT NULL,
  available BOOLEAN,
  FOREIGN KEY (doctor_id) REFERENCES doctors(user_id),
  FOREIGN KEY (day_id) REFERENCES days(id),
  FOREIGN KEY (time_range_id) REFERENCES time_range(id)
);
```
<br>

## Appointments
This table tracks the appointments scheduled between doctors and patients. It includes details such as the doctor and patient involved, the date of the appointment, and its status.

| Parameter | Type | Description |
| --- | --- | --- |
| `id` | integer | Primary key for the appointment. |
| `doctor_id` | uuid | Foreign key referencing the `doctors` table, identifying the doctor involved in the appointment. |
| `patient_id` | uuid | Foreign key referencing the `patients` table, identifying the patient involved in the appointment. |
| `date` | date | Date of the appointment. |
| `day_id` | integer | Foreign key referencing the `days` table, specifying the day of the appointment. |
| `time_range_id` | integer | Foreign key referencing the `time_range` table, specifying the time range for the appointment. |
| `status` | varchar(255) | Status of the appointment (e.g., `pending`, `confirmed`, `canceled`). |
```sql
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

### Doctor_Weekly_Availability and Doctors
- **`doctor_weekly_availability.doctor_id`** → **`doctors.user_id`**
    - **Type:** Many-to-One
    - **Explanation:** Multiple availability records can exist for each doctor, specifying when the doctor is available. This relationship supports detailed scheduling of doctor availability.

### Doctor_Weekly_Availability and Days
- **`doctor_weekly_availability.day_id`** → **`days.id`**
    - **Type:** Many-to-One
    - **Explanation:** Each availability record is linked to a specific day of the week. This relationship is used to define availability based on the days of the week.

### Doctor_Weekly_Availability and Time_Range
- **`doctor_weekly_availability.time_range_id`** → **`time_range.id`**
    - **Type:** Many-to-One
    - **Explanation:** Each availability record is linked to a specific time range. This relationship specifies the available time slots for each doctor.

### Appointments and Time_Range
- **`appointments.time_range_id`** → **`time_range.id`**
    - **Type:** Many-to-One
    - **Explanation:** Each appointment is scheduled within a specific time range. This relationship ensures that appointments can be mapped to defined time slots.

### Appointments and Days
- **`appointments.day_id`** → **`days.id`**
    - **Type:** Many-to-One
    - **Explanation:** Each appointment is scheduled on a specific day. This relationship ensures that appointments are associated with specific days of the week.

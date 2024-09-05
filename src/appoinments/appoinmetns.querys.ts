// Query to insert data into appointment table
export const createAppointmentQuery = `
INSERT INTO appointments (doctor_id, patient_id, date, day_id, time_range_id, status)
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING *
`;

// Query to get all appointments
export const bringAllAppointmentsQuery = `
SELECT * FROM appointments 
`;

// Query to get allappointments of a user
export const findAppointmentsByUserIdQuery = `
SELECT
    a.id,
    a.date,
    a.status,
    u_doctor.name AS doctor_name,
    u_doctor.email AS doctor_email,
    u_patient.name AS patient_name,
    u_patient.email AS patient_email,
    u_doctor.id AS doctor_id,
    u_patient.id AS patient_id,
    dr.day AS day,
    tr.time_range AS time_range
FROM appointments a
LEFT JOIN users u_doctor ON a.doctor_id = u_doctor.id
LEFT JOIN users u_patient ON a.patient_id = u_patient.id
LEFT JOIN days dr ON a.day_id = dr.id
LEFT JOIN time_range tr ON a.time_range_id = tr.id
WHERE a.patient_id = $1 OR a.doctor_id = $1
`;

export const deleteAppointmentById = `
DELETE FROM appointments
WHERE id = $1
RETURNING *;
`;

// Query to check if the doctor has an appointment at that time on the specified day
export const findSpecificAppointmentDoctorQuery = `
SELECT * FROM appointments
WHERE doctor_id = $1 AND date = $2 AND time_range_id = $3
`;

// Query to check if the patient has an appointment at that time on the specified day
export const findSpecificAppointmentPatientQuery = `
SELECT * FROM appointments
WHERE patient_id = $1 AND date = $2 AND time_range_id = $3
`;

// Query to delet all appointments of a user
export const deleteAppointmentsByUserIdQuery = `
DELETE FROM appointments
WHERE patient_id = $1 OR doctor_id = $1;
`;

// Query to update appointment status
export const updateAppointmentStatusQuery = `
UPDATE appointments
SET status = 'canceled'
WHERE id = $1
RETURNING *;
`;

// Query to update appointment
export const updateAppointmentQuery = `
UPDATE appointments
SET doctor_id = $1, date = $2, day_id = $3, time_range_id = $4
WHERE id = $5
RETURNING *;
`;

// Find by id
export const findAppointmentByIdQuery = `
SELECT
    a.id,
    a.date,
    a.status,
    u_doctor.name AS doctor_name,
    u_doctor.email AS doctor_email,
    u_patient.name AS patient_name,
    u_patient.email AS patient_email,
    u_doctor.id AS doctor_id,
    u_patient.id AS patient_id,
    dr.day AS day,
    tr.time_range AS time_range
FROM appointments a
LEFT JOIN users u_doctor ON a.doctor_id = u_doctor.id
LEFT JOIN users u_patient ON a.patient_id = u_patient.id
LEFT JOIN days dr ON a.day_id = dr.id
LEFT JOIN time_range tr ON a.time_range_id = tr.id
WHERE a.id = $1;
`;

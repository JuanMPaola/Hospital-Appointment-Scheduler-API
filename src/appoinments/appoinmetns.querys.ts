// Query to insert data into appointment table
export const createAppointmentQuery = `
INSERT INTO appointments (doctor_id, patient_id, date, day_id, time_range_id, status)
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING *
`

// Query to get all appointments
export const bringAllAppointmentsQuery = `
SELECT * FROM appointments
`

// Query to get allappointments of a user
export const findAppointmentsByUserIdQuery = `
SELECT * FROM appointments
WHERE patient_id = $1 OR doctor_id = $1
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
SET status = $1
WHERE id = $2
RETURNING *;
`;

// Query to update appointment
export const updateAppointmentQuery = `
UPDATE appointments
SET date = $1, time_range_id = $2
WHERE id = $3
RETURNING *;
`;
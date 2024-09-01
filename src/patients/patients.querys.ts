// Query to insert data into patients table
export const createPatientQuery = `
  INSERT INTO patients (user_id, age, phone, born)
  VALUES ($1, $2, $3, $4)
  RETURNING *;
`;

// Query to get all patients
export const getAllPaitentsQuery = ` 
SELECT u.id, u.email, u.name, p.phone, p.age, p.born
FROM patients p
JOIN users u ON u.id = p.user_id
`;

// Query to find a patient by id
export const getPatientByIdQuery = `
SELECT 
u.id, 
u.email, 
u.name, 
p.phone, 
p.age, 
p.born,
COALESCE(json_agg(json_build_object(
    'date', a.date,
    'time_range_id', a.time_range_id,
    'doctor_id', a.doctor_id,
    'status', a.status
)) FILTER (WHERE a.id IS NOT NULL), '[]') AS appointments 
FROM patients p
INNER JOIN users u ON p.user_id = u.id
LEFT JOIN appointments a ON p.user_id = a.patient_id
WHERE p.user_id = $1
GROUP BY u.id, u.email, u.name, p.phone, p.age, p.born;`;

export const deletePatientQuery = `
DELETE FROM patients 
WHERE user_id = $1 
RETURNING *;
     `;

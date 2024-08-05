// Insert into doctors table using the user_id
export const createDoctorQuery = `
INSERT INTO doctors (user_id)
VALUES ($1)
RETURNING *;
`;

// Query to get all doctors
export const findAllDoctorsQuery = `
SELECT 
u.id, 
u.name, 
u.email, 
COALESCE(json_agg(s.title),'[]') AS specialties 
FROM users u 
JOIN doctor_specialties ds ON u.id = ds.doctor_id
JOIN specialties s ON ds.specialty_id = s.id
WHERE u.id IN (SELECT user_id FROM doctors)
GROUP BY u.id, u.name, u.email;
`

// Find doctor by id
export const findDoctorByIdQuery = `
SELECT 
u.name,
u.email,
array_agg(DISTINCT ds.specialty_id) AS specialties,
jsonb_object_agg(da.day_id, da.time_ranges) AS weekly_availability
FROM users u
JOIN doctors d ON u.id = d.user_id
JOIN doctor_specialties ds ON d.user_id = ds.doctor_id
LEFT JOIN (
 SELECT 
   doctor_id,
   day_id,
   jsonb_agg(time_range_id ORDER BY time_range_id) AS time_ranges
 FROM doctor_weekly_availability
 GROUP BY doctor_id, day_id
) da ON d.user_id = da.doctor_id
WHERE u.id = $1
GROUP BY u.id, u.name, u.email;
`

// Get doctors by specialtie
export const findDoctorBySpecialtieQuery = `
SELECT 
    u.id,
    u.name,
    u.email
FROM users u
JOIN doctors d ON u.id = d.user_id
JOIN doctor_specialties ds ON d.user_id = ds.doctor_id
WHERE ds.specialty_id = $1
GROUP BY u.id;
`;
 
// Get week availability of a doctor
export const findeDoctorsWeekAvailability = `
SELECT jsonb_object_agg(
         day_id,
         time_ranges
       ) AS availability
FROM (
    SELECT
        dwa.day_id,
        array_agg(dwa.time_range_id ORDER BY dwa.time_range_id) AS time_ranges
    FROM doctor_weekly_availability dwa
    WHERE dwa.doctor_id = $1
    GROUP BY dwa.day_id
) subquery;
`;

export const findDoctorBySpecialtiePlusAvailabilityQuery = `
SELECT 
    u.id,
    u.name,
    u.email,
    jsonb_agg(DISTINCT jsonb_build_object('id', ds.specialty_id, 'title', s.title)) AS specialties,
    jsonb_object_agg(da.day_id, da.time_ranges) AS weekly_availability
FROM users u
JOIN doctors d ON u.id = d.user_id
JOIN doctor_specialties ds ON d.user_id = ds.doctor_id
JOIN specialties s ON ds.specialty_id = s.id
LEFT JOIN (
    SELECT 
        doctor_id,
        day_id,
        jsonb_agg(time_range_id ORDER BY time_range_id) AS time_ranges
    FROM doctor_weekly_availability
    GROUP BY doctor_id, day_id
) da ON d.user_id = da.doctor_id
WHERE ds.specialty_id = $1
GROUP BY u.id;
`;
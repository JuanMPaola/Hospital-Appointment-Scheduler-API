// Insert into doctors table using the user_id
export const createDoctorQuery = `
INSERT INTO doctors (user_id)
VALUES ($1)
RETURNING *;
`;

// Delete specialties
export const deleteDoctorSpecialtiesQuery = `
DELETE FROM doctor_specialties
WHERE doctor_id = $1;
`;

// Delete doctors weekly availability
export const deleteDoctorWeeklyAvailability = `
DELETE FROM doctor_weekly_availability
WHERE doctor_id = $1;
`;

// Deletes doctor
export const deleteDoctorQuery = `
DELETE FROM doctors
WHERE user_id = $1
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
`;

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
`;

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
export const findeDoctorsWeekAvailabilityAndAppointments = `
SELECT
    jsonb_object_agg(
        subquery.day_id,
        subquery.time_ranges
    ) AS weekly_availability,
    COALESCE(
        jsonb_agg(DISTINCT jsonb_build_object(
            'date', a.date,
            'day_id', a.day_id,
            'time_range_id', a.time_range_id
        )) FILTER (WHERE a.date IS NOT NULL AND a.status = 'pending'), '[]'::jsonb
    ) AS appointments
FROM (
    SELECT
        dwa.day_id,
        array_agg(dwa.time_range_id ORDER BY dwa.time_range_id) AS time_ranges
    FROM doctor_weekly_availability dwa
    WHERE dwa.doctor_id = $1
    GROUP BY dwa.day_id
) subquery
LEFT JOIN appointments a ON subquery.day_id = a.day_id AND a.doctor_id = $1
WHERE a.status = 'pending' OR a.status IS NULL;
`;

export const findAllDoctorDataBySpecialityQuery = `
SELECT 
    u.id,
    u.name,
    u.email,
    jsonb_object_agg(da.day_id, da.time_ranges) AS weekly_availability,
    COALESCE(
        jsonb_agg(DISTINCT jsonb_build_object(
            'date', a.date,
            'day_id', a.day_id,
            'time_range_id', a.time_range_id
        )) FILTER (WHERE a.date IS NOT NULL), '[]'
    ) AS appointments
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
LEFT JOIN appointments a ON d.user_id = a.doctor_id
WHERE ds.specialty_id = $1
GROUP BY u.id;
`;

export const findAllDoctorsBySpecialtyTitleQuery = `
SELECT 
    u.id,
    u.name,
    u.email
FROM users u
JOIN doctors d ON u.id = d.user_id
JOIN doctor_specialties ds ON d.user_id = ds.doctor_id
JOIN specialties s ON ds.specialty_id = s.id
WHERE s.title = $1
GROUP BY u.id;
`;

export function createInsertSpecialtiesQuery(doctor) {
  return `
    INSERT INTO doctor_specialties (doctor_id, specialty_id)
    VALUES ${doctor.specialties
      .map((_, index) => `($1, $${index + 2})`)
      .join(', ')}
    RETURNING *;
    `;
}

export function createInsertAvailabilityQuery(
  week_availability: { [key: number]: number[] },
  doctorId: string,
) {
  const availabilityEntries = Object.entries(week_availability);
  const valuesArray: any[] = [];
  let valuesString = '';
  availabilityEntries.forEach(([dayId, timeRanges]) => {
    timeRanges.forEach((timeRangeId) => {
      valuesString += `($1, $${valuesArray.length + 2}, $${valuesArray.length + 3}), `;
      valuesArray.push(dayId, timeRangeId);
    });
  });
  // Remove the trailing comma and space
  valuesString = valuesString.slice(0, -2);

  // Insert the doctorId at the beginning of the valuesArray
  valuesArray.unshift(doctorId);
  return {
    insertAvailabilityQuery: `
      INSERT INTO doctor_weekly_availability (doctor_id, day_id, time_range_id)
      VALUES ${valuesString}
      RETURNING *;
    `,
    valuesArray: valuesArray,
  };
}

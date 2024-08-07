// Query to get users by email
export const getByEmailQuery = `
SELECT * FROM users 
WHERE email = $1;
`;

// Query to get a user by id
export const getUserById = `
SELECT * FROM users
WHERE id = 1$;
`

// Query to get all users
export const getAllUsersQuery = `
SELECT * FROM users;
`;

// Query to get users role
export const getRoleQuery = `
SELECT role FROM users
WHERE id = $1
`

// Query to delete user form users table
export const deleteUserQuery = `
DELETE FROM users
WHERE id = $1
RETURNING *;
`;

// Query to insert into users table (returns ID)
export const createUserQuery = `
INSERT INTO users (name, email, password, role)
VALUES ($1, $2, $3, $4)
RETURNING id;
`;

export const updateUserQuery = `
UPDATE users
SET name = $1,
    email = $2,
    password = $3,
    role = $4
WHERE id = $5
RETURNING *;
`
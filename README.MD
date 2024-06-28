# Hospital Appointment Scheduler

# Content

1. [Description](#description)
2. [Technical requirements](#technical-requirements)
3. [Database Structure](#database-structure)
4. [API Documentation](#api-documentation)
    - [Patients](#patients)
    - [Doctors](#doctors)
    - [Appointments](#appointments)
5. [Install](#install)
6. [Run](#run)

# 1. Description

This project is a Hospital Appointment Scheduler API. It helps patients to book appointments with doctors based on the doctor's availability and specialty with the following functionalities:

- Create patient profiles
- Create appointments
- Get doctors (all or by specialty)
- Update appointment (48 hours in advance)
- Delete appointment (cancel)

# 2. Technical requirements

- TypeScript
- NestJS
- PostgreSQL
- Docker

# 3. Database Structure

![DB](https://github.com/JuanMPaola/Hospital-Appointment-Scheduler-API/assets/137726036/766abab8-135e-433b-8483-36213e218aa0)

# 4. API Documentation

### Base URL
	http://localhost:3000/api/v1

## Patients

### POST

 - #### <span style="font-family:&quot;SFMono-Regular&quot;, Menlo, Consolas, &quot;PT Mono&quot;, &quot;Liberation Mono&quot;, Courier, monospace;line-height:normal;background:rgba(135,131,120,.15);color:C574E5;border-radius:4px;font-size:100%;padding:0.2em 0.4em" data-token-index="1" spellcheck="false" class="notion-enable-hover">/post/patient</span>   Create a patient (user)
	This endpoint is basically a registration endpoint, allowing patients to create a "profile".<br>
  All the information of the table patient in the dabatabase is mandatory to succefully post.

	### Table picture

	#### Example:

	#### Request
		POST http://localhost:3000/api/v1/post/patient

		Body
			{
				"name": "John Doe",
				"age": 30,
				"email": "john.doe@example.com",
				"phone": "123-456-7890",
				"born": "1994-05-20T14:30:00Z"
			}

	#### Response
		status 200
		Patient created

### GET

 - #### <span style="font-family:&quot;SFMono-Regular&quot;, Menlo, Consolas, &quot;PT Mono&quot;, &quot;Liberation Mono&quot;, Courier, monospace;line-height:normal;background:rgba(135,131,120,.15);color:C574E5;border-radius:4px;font-size:100%;padding:0.2em 0.4em" data-token-index="1" spellcheck="false" class="notion-enable-hover">/get/patient</span>  Retrieve all patients

	This endpoint retrieves a list of all registered patients. <br>
	 No parameters are required for this request.

	#### Example:

	#### Request

		GET http://localhost:3000/api/v1/get/patient

	#### Response
		status 200
		PATIENTS EXAMPLES

 - #### <span style="font-family:&quot;SFMono-Regular&quot;, Menlo, Consolas, &quot;PT Mono&quot;, &quot;Liberation Mono&quot;, Courier, monospace;line-height:normal;background:rgba(135,131,120,.15);color:C574E5;border-radius:4px;font-size:100%;padding:0.2em 0.4em" data-token-index="1" spellcheck="false" class="notion-enable-hover">/get/patient/:id</span>  Retrieve a patient by ID
	
	This endpoint retrieves the details of a specific patient by their ID. <br>
	The request must include the patient's ID as a parameter.
	
	#### Example
	#### Request
		GET http://localhost:3000/api/v1/get/patient/550e8400-e29b-41d4-a716-446655440000
	
	#### Response
			{
				"name": "John Doe",
				"age": 30,
				"email": "john.doe@example.com",
				"phone": "123-456-7890",
				"born": "1994-05-20T14:30:00Z"
			}


### PUT

- #### <span style="font-family:&quot;SFMono-Regular&quot;, Menlo, Consolas, &quot;PT Mono&quot;, &quot;Liberation Mono&quot;, Courier, monospace;line-height:normal;background:rgba(135,131,120,.15);color:C574E5;border-radius:4px;font-size:100%;padding:0.2em 0.4em" data-token-index="1" spellcheck="false" class="notion-enable-hover">/put/patient/:id</span>  Update a specific patient's information

    #### Example:

    #### Request

        PUT http://localhost:3000/api/v1/put/patient/550e8400-e29b-41d4-a716-446655440000

        Body
        {
            "name": "John Doe",
            "age": 31,
            "email": "john.newemail@example.com",
            "phone": "123-456-7891",
            "born": "1994-05-20T14:30:00Z"
        }

    #### Response
        status 200
        Patient updated

### DELETE

- #### <span style="font-family:&quot;SFMono-Regular&quot;, Menlo, Consolas, &quot;PT Mono&quot;, &quot;Liberation Mono&quot;, Courier, monospace;line-height:normal;background:rgba(135,131,120,.15);color:C574E5;border-radius:4px;font-size:100%;padding:0.2em 0.4em" data-token-index="1" spellcheck="false" class="notion-enable-hover">/delete/patient/:id</span>  Delete a specific patient

    #### Example:

    #### Request

        DELETE http://localhost:3000/api/delete/patient/550e8400-e29b-41d4-a716-446655440000

    #### Response
        status 200
        Patient deleted

## Doctors

### POST

- #### <span style="font-family:&quot;SFMono-Regular&quot;, Menlo, Consolas, &quot;PT Mono&quot;, &quot;Liberation Mono&quot;, Courier, monospace;line-height:normal;background:rgba(135,131,120,.15);color:C574E5;border-radius:4px;font-size:100%;padding:0.2em 0.4em" data-token-index="1" spellcheck="false" class="notion-enable-hover">/post/doctor</span>   Create a doctor profile

    This endpoint allows doctors to create a "profile". <br>
    All the information of the table doctor in the database is mandatory to successfully post.

    ### Table picture

    #### Example:

    #### Request

        POST http://localhost:3000/api/post/doctor

        Body
        {
            "name": "Dr. Smith",
            "email": "dr.smith@example.com",
            "specialties": [1, 2]
        }

    #### Response
        status 200
        Doctor profile created

### GET

- #### <span style="font-family:&quot;SFMono-Regular&quot;, Menlo, Consolas, &quot;PT Mono&quot;, &quot;Liberation Mono&quot;, Courier, monospace;line-height:normal;background:rgba(135,131,120,.15);color:C574E5;border-radius:4px;font-size:100%;padding:0.2em 0.4em" data-token-index="1" spellcheck="false" class="notion-enable-hover">/get/doctor</span>  Retrieve all doctors

    This endpoint retrieves a list of all doctors. <br>
    No parameters are required for this request.

    #### Example:

    #### Request

        GET http://localhost:3000/api/get/doctor

    #### Response
        status 200
        [
            {
                "id": "123e4567-e89b-12d3-a456-426614174001",
                "name": "Dr. Smith",
                "email": "dr.smith@example.com",
                "specialties": [
                    {
                        "id": 1,
                        "title": "Cardiology"
                    },
                    {
                        "id": 2,
                        "title": "Neurology"
                    }
                ]
            },
            {
                "id": "123e4567-e89b-12d3-a456-426614174002",
                "name": "Dr. Johnson",
                "email": "dr.johnson@example.com",
                "specialties": [
                    {
                        "id": 3,
                        "title": "Orthopedics"
                    }
                ]
            }
        ]

- #### <span style="font-family:&quot;SFMono-Regular&quot;, Menlo, Consolas, &quot;PT Mono&quot;, &quot;Liberation Mono&quot;, Courier, monospace;line-height:normal;background:rgba(135,131,120,.15);color:C574E5;border-radius:4px;font-size:100%;padding:0.2em 0.4em" data-token-index="1" spellcheck="false" class="notion-enable-hover">/get/doctor/:id</span>  Retrieve a doctor by ID

    This endpoint retrieves the details of a specific doctor by their ID. <br>
    The request must include the doctor's ID as a parameter.

    #### Example:

    #### Request

        GET http://localhost:3000/api/get/doctor/123e4567-e89b-12d3-a456-426614174001

    #### Response
        status 200
        {
            "id": "123e4567-e89b-12d3-a456-426614174001",
            "name": "Dr. Smith",
            "email": "dr.smith@example.com",
            "specialties": [
                {
                    "id": 1,
                    "title": "Cardiology"
                },
                {
                    "id": 2,
                    "title": "Neurology"
                }
            ]
        }

- #### <span style="font-family:&quot;SFMono-Regular&quot;, Menlo, Consolas, &quot;PT Mono&quot;, &quot;Liberation Mono&quot;, Courier, monospace;line-height:normal;background:rgba(135,131,120,.15);color:C574E5;border-radius:4px;font-size:100%;padding:0.2em 0.4em" data-token-index="1" spellcheck="false" class="notion-enable-hover">/get/doctors/specialty/:id</span>  Retrieve doctors by specialty

    This endpoint retrieves a list of doctors based on the given specialty ID. <br>
    The request must include the specialty's ID as a parameter.

    #### Example:

    #### Request

        GET http://localhost:3000/api/get/doctors/specialty/1

    #### Response
        status 200
        [
            {
                "id": "123e4567-e89b-12d3-a456-426614174001",
                "name": "Dr. Smith",
                "email": "dr.smith@example.com",
                "specialties": [
                    {
                        "id": 1,
                        "title": "Cardiology"
                    }
                ]
            },
            {
                "id": "123e4567-e89b-12d3-a456-426614174003",
                "name": "Dr. Brown",
                "email": "dr.brown@example.com",
                "specialties": [
                    {
                        "id": 1,
                        "title": "Cardiology"
                    }
                ]
            }
        ]

### PUT

- #### <span style="font-family:&quot;SFMono-Regular&quot;, Menlo, Consolas, &quot;PT Mono&quot;, &quot;Liberation Mono&quot;, Courier, monospace;line-height:normal;background:rgba(135,131,120,.15);color:C574E5;border-radius:4px;font-size:100%;padding:0.2em 0.4em" data-token-index="1" spellcheck="false" class="notion-enable-hover">/put/doctor/:id<span> Update a doctor profile

    This endpoint allows updating the profile of a specific doctor by their ID. <br>
    The request must include the doctor's ID as a parameter, and the body should contain the updated details.

    #### Example:

    #### Request

        PUT http://localhost:3000/api/v1/put/doctor/123e4567-e89b-12d3-a456-426614174001

        Body
        {
            "name": "Dr. Smith Updated",
            "email": "dr.smith.updated@example.com",
            "specialties": [1, 3]
        }

    #### Response
        status 200
        Doctor profile updated

### DELETE

- #### <span style="font-family:&quot;SFMono-Regular&quot;, Menlo, Consolas, &quot;PT Mono&quot;, &quot;Liberation Mono&quot;, Courier, monospace;line-height:normal;background:rgba(135,131,120,.15);color:C574E5;border-radius:4px;font-size:100%;padding:0.2em 0.4em" data-token-index="1" spellcheck="false" class="notion-enable-hover">/delete/doctor/:id<span> Delete a doctor profile

    This endpoint allows deleting a specific doctor profile by their ID. <br>
    The request must include the doctor's ID as a parameter.

    #### Example:

    #### Request

        DELETE http://localhost:3000/api/v1/delete/doctor/123e4567-e89b-12d3-a456-426614174001

    #### Response
        status 200
        Doctor profile deleted

## Appointments

### POST

- #### <span style="font-family:&quot;SFMono-Regular&quot;, Menlo, Consolas, &quot;PT Mono&quot;, &quot;Liberation Mono&quot;, Courier, monospace;line-height:normal;background:rgba(135,131,120,.15);color:C574E5;border-radius:4px;font-size:100%;padding:0.2em 0.4em" data-token-index="1" spellcheck="false" class="notion-enable-hover">/post/appointment</span>  Create an appointment

    This endpoint allows the creation of an appointment between a patient and a doctor. <br>
    All the information of the table appointment in the database is mandatory to successfully post.

    ### Table picture

    #### Example:

    #### Request

        POST http://localhost:3000/api/v1/post/appointment

        Body
        {
            "day": "2024-06-10",
            "starts_at": "2024-06-10T09:00:00Z",
            "ends_at": "2024-06-10T09:30:00Z",
            "doctor_id": "123e4567-e89b-12d3-a456-426614174001",
            "patient_id": "123e4567-e89b-12d3-a456-426614174000",
            "status": "scheduled"
        }

    #### Response
        status 200
        Appointment created

### GET

- #### <span style="font-family:&quot;SFMono-Regular&quot;, Menlo, Consolas, &quot;PT Mono&quot;, &quot;Liberation Mono&quot;, Courier, monospace;line-height:normal;background:rgba(135,131,120,.15);color:C574E5;border-radius:4px;font-size:100%;padding:0.2em 0.4em" data-token-index="1" spellcheck="false" class="notion-enable-hover">/get/appointment</span>  Retrieve all appointments

    This endpoint retrieves a list of all appointments.
    No parameters are required for this request.

    #### Example:

    #### Request

        GET http://localhost:3000/api/v1/get/appointment

    #### Response
        status 200
        [
            {
                "id": 1,
                "day": "2024-06-10",
                "starts_at": "2024-06-10T09:00:00Z",
                "ends_at": "2024-06-10T09:30:00Z",
                "doctor_id": "123e4567-e89b-12d3-a456-426614174001",
                "patient_id": "123e4567-e89b-12d3-a456-426614174000",
                "status": "scheduled"
            },
            {
                "id": 2,
                "day": "2024-06-11",
                "starts_at": "2024-06-11T10:00:00Z",
                "ends_at": "2024-06-11T10:30:00Z",
                "doctor_id": "123e4567-e89b-12d3-a456-426614174002",
                "patient_id": "123e4567-e89b-12d3-a456-426614174001",
                "status": "scheduled"
            }
        ]


### PUT

- #### <span style="font-family:&quot;SFMono-Regular&quot;, Menlo, Consolas, &quot;PT Mono&quot;, &quot;Liberation Mono&quot;, Courier, monospace;line-height:normal;background:rgba(135,131,120,.15);color:C574E5;border-radius:4px;font-size:100%;padding:0.2em 0.4em" data-token-index="1" spellcheck="false" class="notion-enable-hover">/put/appointment/:id</span> Update an appointment

    This endpoint allows updating the details of a specific appointment by its ID. <br>
    The request must include the appointment ID as a parameter, and the body should contain the updated details.

    #### Example:

    #### Request

        PUT http://localhost:3000/api/v1/put/appointment/1

        Body
        {
            "day": "2024-06-10",
            "starts_at": "2024-06-10T09:00:00Z",
            "ends_at": "2024-06-10T09:30:00Z",
            "doctor_id": "123e4567-e89b-12d3-a456-426614174001",
            "patient_id": "123e4567-e89b-12d3-a456-426614174000",
            "status": "rescheduled"
        }

    #### Response
        status 200
        Appointment updated

### DELETE

- #### <span style="font-family:&quot;SFMono-Regular&quot;, Menlo, Consolas, &quot;PT Mono&quot;, &quot;Liberation Mono&quot;, Courier, monospace;line-height:normal;background:rgba(135,131,120,.15);color:C574E5;border-radius:4px;font-size:100%;padding:0.2em 0.4em" data-token-index="1" spellcheck="false" class="notion-enable-hover">/delete/appointment/:id</span> Delete an appointment

    This endpoint allows deleting a specific appointment by its ID. <br>
    The request must include the appointment ID as a parameter.

    #### Example:

    #### Request

        DELETE http://localhost:3000/api/v1/delete/appointment/1

    #### Response
        status 200
        Appointment deleted

## 5. Install

(steps to install the project)

## 6. Run

(steps to run the project)

# Hospital Appointment Scheduler

## Content

1. Description
2. Technical requirements
3. Database Structure
4. Base URL
5. API Documentation
6. Install
7. Run

## 1. Description

This project is a Hospital Appointment Scheduler API. It helps patients to book appointments with doctors based on the doctor's availability and specialty with the following functionalities:

- Create patient profiles
- Create appointments
- Get doctors (all or by specialty)
- Update appointment (48 hours in advance)
- Delete appointment (cancel)

## 2. Technical requirements

- TypeScript
- NestJS
- PostgreSQL
- Docker

## 3. Database Structure

https://github.com/JuanMPaola/Hospital-Appointment-Scheduler-API/assets/137726036/48197c68-7bfa-4f6c-8f75-84514d49fbef

## 4. Base URL
	http://localhost:3000

## 5. API Documentation

## 5.1 POST endpoints

 - #### <span style="font-family:&quot;SFMono-Regular&quot;, Menlo, Consolas, &quot;PT Mono&quot;, &quot;Liberation Mono&quot;, Courier, monospace;line-height:normal;background:rgba(135,131,120,.15);color:C574E5;border-radius:4px;font-size:100%;padding:0.2em 0.4em" data-token-index="1" spellcheck="false" class="notion-enable-hover">api/post/patient</span>   Create a patient (user)
  - This endpoint is basically a registration endpoint, allowing patients (users) to create a "profile".
  - According to the database structure, the information in the request must be as follows:

	| Parameter | Type | Required | Description |
	| --- | --- | --- | --- |
	| name | string | Yes | The name of the user. |
	| age | integer | Yes | The age of the user. |
	| email | string | Yes | The email of the user. |
	| phone | string | Yes | The phone number of the user. |
	| born | timestamp | Yes | The birth date and time of the user. |

#### Example:

##### Request
	POST http://localhost:3000/api/post/patient

	Body
		{
			"name": "John Doe",
			"age": 30,
			"email": "john.doe@example.com",
			"phone": "123-456-7890",
			"born": "1994-05-20T14:30:00Z"
		}

##### Response
	status 200
	Patient created

- #### <span style="font-family:&quot;SFMono-Regular&quot;, Menlo, Consolas, &quot;PT Mono&quot;, &quot;Liberation Mono&quot;, Courier, monospace;line-height:normal;background:rgba(135,131,120,.15);color:C574E5;border-radius:4px;font-size:100%;padding:0.2em 0.4em" data-token-index="1" spellcheck="false" class="notion-enable-hover"> api/post/doctor</span>  -  Create a doctor profile
  - This endpoint allows doctors to create a "profile".
  - According to the database structure, the information in the request must be as follows:

	| Parameter | Type | Required | Description |
	| --- | --- | --- | --- |
	| name | string | Yes | The name of the doctor. |
	| email | string | Yes | The email of the doctor. |
	| specialties | array of integers | Yes | The IDs of the specialties of the doctor. |



#### Example:

##### Request
	POST http://localhost:3000/api/post/doctor
	
	Body
		{
			"name": "Dr. Smith",
			"email": "dr.smith@example.com",
			"specialties": [1, 2]
		}

##### Response
	status 200
	Doctor profile created

- #### <span style="font-family:&quot;SFMono-Regular&quot;, Menlo, Consolas, &quot;PT Mono&quot;, &quot;Liberation Mono&quot;, Courier, monospace;line-height:normal;background:rgba(135,131,120,.15);color:C574E5;border-radius:4px;font-size:100%;padding:0.2em 0.4em" data-token-index="1" spellcheck="false" class="notion-enable-hover">api/post/appointment</span> - Create an appointment
  - This endpoint allows the creation of an appointment between a patient and a doctor.
  - According to the database structure, the information in the request must be as follows:

	| Parameter | Type | Required | Description |
	| --- | --- | --- | --- |
	| day | date | Yes | The day of the appointment. |
	| starts_at | timestamp | Yes | The start time of the appointment. |
	| ends_at | timestamp | Yes | The end time of the appointment. |
	| doctor_id | uuid | Yes | The UUID of the doctor. |
	| patient_id | uuid | Yes | The UUID of the patient. |
	| status | string | Yes | The status of the appointment. |

#### Example:

##### Request

	POST http://localhost:3000/api/post/doctor

	Body
	{
		"day": "2024-06-10",
		"starts_at": "2024-06-10T09:00:00Z",
		"ends_at": "2024-06-10T09:30:00Z",
		"doctor_id": "123e4567-e89b-12d3-a456-426614174001",
		"patient_id": "123e4567-e89b-12d3-a456-426614174000",
		"status": "scheduled"
	}

##### Response
	status 200
	Appointment created

## 5.2 GET endpoints

- #### <span style="font-family:&quot;SFMono-Regular&quot;, Menlo, Consolas, &quot;PT Mono&quot;, &quot;Liberation Mono&quot;, Courier, monospace;line-height:normal;background:rgba(135,131,120,.15);color:C574E5;border-radius:4px;font-size:100%;padding:0.2em 0.4em" data-token-index="1" spellcheck="false" class="notion-enable-hover">api/get/doctor</span>  - Retrieve all doctors
  - This endpoint retrieves a list of all doctors.
  - No parameters are required for this request.

#### Example:

##### Request

	GET http://localhost:3000/api/get/doctor
	Host: yourapi.com

##### Response
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

- #### <span style="font-family:&quot;SFMono-Regular&quot;, Menlo, Consolas, &quot;PT Mono&quot;, &quot;Liberation Mono&quot;, Courier, monospace;line-height:normal;background:rgba(135,131,120,.15);color:C574E5;border-radius:4px;font-size:100%;padding:0.2em 0.4em" data-token-index="1" spellcheck="false" class="notion-enable-hover">api/get/doctor:id</span>  - Retrieve a doctor by ID
  - This endpoint retrieves the details of a specific doctor by their ID.
  - The request must include the doctor's ID as a parameter.

#### Example:

##### Request

	GET http://localhost:3000/api/get/doctor/123e4567-e89b-12d3-a456-426614174001

##### Response
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

- #### <span style="font-family:&quot;SFMono-Regular&quot;, Menlo, Consolas, &quot;PT Mono&quot;, &quot;Liberation Mono&quot;, Courier, monospace;line-height:normal;background:rgba(135,131,120,.15);color:C574E5;border-radius:4px;font-size:100%;padding:0.2em 0.4em" data-token-index="1" spellcheck="false" class="notion-enable-hover">api/get/doctors/specialty/:id</span> - Retrieve doctors by specialty
  - This endpoint retrieves a list of doctors based on the given specialty ID.
  - The request must include the specialty's ID as a parameter.

#### Example:

##### Request

	GET http://localhost:3000/api/get/doctors/specialty/1

##### Response
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

### 5.3 UPDATE endpoints

(define update endpoints here)

## 6. Install

(steps to install the project)

## 7. Run

(steps to run the project)

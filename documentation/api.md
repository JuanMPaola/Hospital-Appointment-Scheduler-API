# Hospital Appointment Scheduler

# Content

- [Description](../README.MD#description)
- [Technical requirements](../README.MD#technical-requirements)
- [Database Documentation](database.md)
    - [Structure](database.md#structure)
    - [Tables](database.md#tables)
    - [Relations](database.md#relations)
- [API Documentation](/api.md)
- [Install](../README.MD#install)
- [Run](../README.MD#run)


# Swagger
The API for the Hospital Appointment Scheduler is documented using Swagger. You can view and interact with the API documentation by running the application and navigating to the following URL:
### Documentation URL
    http://localhost:3000/apidocs

# Authorize

Many of the API endpoints are protected and require authentication. To access these endpoints, follow these steps:

- In Auth endpoints register a User.

- Log In: Use the credentials you registered with to log in.

- Obtain Access Token: After logging in, you will receive an access token.

- Authorize in Swagger:

    - Click on the Authorize button, typically found in the top-right corner of the Swagger UI.
    - Enter your access token in the input field and click the Authorize button.

Once authorized, you will have access to all protected endpoints in the Swagger documentation.


## <span style="font-family: SFMono-Regular, Menlo, Consolas, 'PT Mono', 'Liberation Mono', Courier, monospace; color: #E64C91; font-size: 1.5em;"> Patients

### <span style=" color: #C574E5" >**POST**

- #### <span style="font-family: SFMono-Regular, Menlo, Consolas, 'PT Mono', 'Liberation Mono', Courier, monospace; background: rgba(135,131,120,.15); color: #C574E5; border-radius: 4px; padding: 0.2em 0.4em;">/post/patient</span> Create a patient profile
    This endpoint is basically a registration endpoint, allowing patients to create a "profile". <br>
    All the information in the table patient in the database is mandatory to successfully post.

    ![Captura de pantalla 2024-06-28 150809](https://github.com/JuanMPaola/Hospital-Appointment-Scheduler-API/assets/137726036/c12103b0-d154-4c56-b7a1-5de48ea56d45)

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

### <span style=" color: #C574E5" > **GET**

- #### <span style="font-family: SFMono-Regular, Menlo, Consolas, 'PT Mono', 'Liberation Mono', Courier, monospace; background: rgba(135,131,120,.15); color: #C574E5; border-radius: 4px; padding: 0.2em 0.4em;">/get/patient</span> Retrieve all patients

    This endpoint retrieves a list of all registered patients. <br>
    No parameters are required for this request.

    #### Example:

    #### Request

        GET http://localhost:3000/api/v1/get/patient

    #### Response
        status 200
        [
            {
                "id": "550e8400-e29b-41d4-a716-446655440000",
                "name": "John Doe",
                "age": 30,
                "email": "john.doe@example.com",
                "phone": "123-456-7890",
                "born": "1994-05-20T14:30:00Z"
            },
            {
                "id": "550e8400-e29b-41d4-a716-446655440001",
                "name": "Jane Smith",
                "age": 25,
                "email": "jane.smith@example.com",
                "phone": "987-654-3210",
                "born": "1999-04-15T08:20:00Z"
            },
            {
                "id": "550e8400-e29b-41d4-a716-446655440002",
                "name": "Alice Johnson",
                "age": 40,
                "email": "alice.johnson@example.com",
                "phone": "555-123-4567",
                "born": "1984-12-10T12:00:00Z"
            }
        ]

- #### <span style="font-family: SFMono-Regular, Menlo, Consolas, 'PT Mono', 'Liberation Mono', Courier, monospace; background: rgba(135,131,120,.15); color: #C574E5; border-radius: 4px; padding: 0.2em 0.4em;">/get/patient/:id</span> Retrieve a patient by ID

    This endpoint retrieves the details of a specific patient by their ID. <br>
    The request must include the patient's ID as a parameter.

    #### Example
    #### Request
        GET http://localhost:3000/api/v1/get/patient/550e8400-e29b-41d4-a716-446655440000

    #### Response
        status 200
        {
            "id": "550e8400-e29b-41d4-a716-446655440000",
            "name": "John Doe",
            "age": 30,
            "email": "john.doe@example.com",
            "phone": "123-456-7890",
            "born": "1994-05-20T14:30:00Z"
        }

### <span style=" color: #C574E5" > **PUT**

- #### <span style="font-family: SFMono-Regular, Menlo, Consolas, 'PT Mono', 'Liberation Mono', Courier, monospace; background: rgba(135,131,120,.15); color: #C574E5; border-radius: 4px; padding: 0.2em 0.4em;">/put/patient/:id</span> Update a patient profile
    This endpoint allows updating the profile of a specific patient by their ID. <br>
    The request must include the patient's ID as a parameter, and the body should contain the updated details.

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

### <span style=" color: #C574E5" > **DELETE**

- #### <span style="font-family: SFMono-Regular, Menlo, Consolas, 'PT Mono', 'Liberation Mono', Courier, monospace; background: rgba(135,131,120,.15); color: #C574E5; border-radius: 4px; padding: 0.2em 0.4em;">/delete/patient/:id</span> Delete a specific patient

    This endpoint allows deleting a specific patient profile by their ID. <br>
    The request must include the patient's ID as a parameter.

    #### Example:

    #### Request

        DELETE http://localhost:3000/api/v1/delete/patient/550e8400-e29b-41d4-a716-446655440000

    #### Response
        status 200
        Patient deleted
        
<br>
<br>
<br>

## <span style="font-family: SFMono-Regular, Menlo, Consolas, 'PT Mono', 'Liberation Mono', Courier, monospace; color: #E64C91; font-size: 1.5em;"> Doctors </span>

### <span style=" color: #C574E5" > **POST**

- #### <span style="font-family: SFMono-Regular, Menlo, Consolas, 'PT Mono', 'Liberation Mono', Courier, monospace; background: rgba(135,131,120,.15); color: #C574E5; border-radius: 4px; padding: 0.2em 0.4em;"> /post/doctor</span> Create a doctor profile
    This endpoint allows creating a new doctor profile. <br>
    All the information in the doctor table in the database is mandatory to successfully post.

    ### Table picture

    #### Example:

    #### Request

        POST http://localhost:3000/api/v1/post/doctor

        Body
        {
            "name": "Dr. Jane Doe",
            "specialty": "Cardiology",
            "email": "dr.jane.doe@example.com",
            "phone": "123-456-7890",
            "license_number": "MD123456"
        }

    #### Response
        status 200
        Doctor created

### <span style=" color: #C574E5" > **GET**

- #### <span style="font-family: SFMono-Regular, Menlo, Consolas, 'PT Mono', 'Liberation Mono', Courier, monospace; background: rgba(135,131,120,.15); color: #C574E5; border-radius: 4px; padding: 0.2em 0.4em;"> /get/doctor</span> Retrieve all doctors

    This endpoint retrieves a list of all registered doctors. <br>
    No parameters are required for this request.

    #### Example:

    #### Request

        GET http://localhost:3000/api/v1/get/doctor

    #### Response
        status 200
        [
            {
                "id": "550e8400-e29b-41d4-a716-446655440000",
                "name": "Dr. John Doe",
                "specialty": "Cardiology",
                "email": "dr.john.doe@example.com",
                "phone": "123-456-7890",
                "license_number": "MD123456"
            },
            {
                "id": "550e8400-e29b-41d4-a716-446655440001",
                "name": "Dr. Jane Smith",
                "specialty": "Neurology",
                "email": "dr.jane.smith@example.com",
                "phone": "987-654-3210",
                "license_number": "MD654321"
            },
            {
                "id": "550e8400-e29b-41d4-a716-446655440002",
                "name": "Dr. Alice Johnson",
                "specialty": "Pediatrics",
                "email": "dr.alice.johnson@example.com",
                "phone": "555-123-4567",
                "license_number": "MD987654"
            }
        ]

- #### <span style="font-family: SFMono-Regular, Menlo, Consolas, 'PT Mono', 'Liberation Mono', Courier, monospace; background: rgba(135,131,120,.15); color: #C574E5; border-radius: 4px; padding: 0.2em 0.4em;">/get/doctor/:id</span> Retrieve a doctor by ID

    This endpoint retrieves the details of a specific doctor by their ID. <br>
    The request must include the doctor's ID as a parameter.

    #### Example
    #### Request
        GET http://localhost:3000/api/v1/get/doctor/550e8400-e29b-41d4-a716-446655440000

    #### Response
        status 200
        {
            "id": "550e8400-e29b-41d4-a716-446655440000",
            "name": "Dr. John Doe",
            "specialty": "Cardiology",
            "email": "dr.john.doe@example.com",
            "phone": "123-456-7890",
            "license_number": "MD123456"
        }

### <span style=" color: #C574E5" > **PUT**

- #### <span style="font-family: SFMono-Regular, Menlo, Consolas, 'PT Mono', 'Liberation Mono', Courier, monospace; background: rgba(135,131,120,.15); color: #C574E5; border-radius: 4px; padding: 0.2em 0.4em;">/put/doctor/:id</span> Update a doctor profile
    This endpoint allows updating the profile of a specific doctor by their ID. <br>
    The request must include the doctor's ID as a parameter, and the body should contain the updated details.

    #### Example:

    #### Request

        PUT http://localhost:3000/api/v1/put/doctor/550e8400-e29b-41d4-a716-446655440000

        Body
        {
            "name": "Dr. John Doe",
            "specialty": "Cardiology",
            "email": "dr.john.newemail@example.com",
            "phone": "123-456-7891",
            "license_number": "MD123456"
        }

    #### Response
        status 200
        Doctor updated

### <span style=" color: #C574E5" > **DELETE**

- #### <span style="font-family: SFMono-Regular, Menlo, Consolas, 'PT Mono', 'Liberation Mono', Courier, monospace; background: rgba(135,131,120,.15); color: #C574E5; border-radius: 4px; padding: 0.2em 0.4em;">/delete/doctor/:id</span> Delete a specific doctor

    This endpoint allows deleting a specific doctor profile by their ID. <br>
    The request must include the doctor's ID as a parameter.

    #### Example:

    #### Request

        DELETE http://localhost:3000/api/v1/delete/doctor/550e8400-e29b-41d4-a716-446655440000

    #### Response
        status 200
        Doctor deleted

## <span style="font-family: SFMono-Regular, Menlo, Consolas, 'PT Mono', 'Liberation Mono', Courier, monospace; color: #E64C91; font-size: 1.5em;"> Appointments

### <span style=" color: #C574E5" > **POST**

- #### <span style="font-family: SFMono-Regular, Menlo, Consolas, 'PT Mono', 'Liberation Mono', Courier, monospace; background: rgba(135,131,120,.15); color: #C574E5; border-radius: 4px; padding: 0.2em 0.4em;">/post/appointment</span> Create an appointment
    This endpoint allows creating a new appointment for a patient with a specific doctor. <br>
    All the information in the appointment table in the database is mandatory to successfully post.

    ![Captura de pantalla 2024-06-28 150846](https://github.com/JuanMPaola/Hospital-Appointment-Scheduler-API/assets/137726036/5ed11622-9481-4f7f-b1f2-06ea4db8eeb1)

    #### Example:

    #### Request

        POST http://localhost:3000/api/v1/post/appointment

        Body
        {
            "patient_id": "550e8400-e29b-41d4-a716-446655440000",
            "doctor_id": "550e8400-e29b-41d4-a716-446655440000",
            "date": "2024-07-15T10:00:00Z",
            "reason": "Routine check-up"
        }

    #### Response
        status 200
        Appointment created

### <span style=" color: #C574E5" > **GET**

- #### <span style="font-family: SFMono-Regular, Menlo, Consolas, 'PT Mono', 'Liberation Mono', Courier, monospace; background: rgba(135,131,120,.15); color: #C574E5; border-radius: 4px; padding: 0.2em 0.4em;">/get/appointment</span> Retrieve all appointments

    This endpoint retrieves a list of all appointments. <br>
    No parameters are required for this request.

    #### Example:

    #### Request

        GET http://localhost:3000/api/v1/get/appointment

    #### Response
        status 200
        [
            {
                "id": "550e8400-e29b-41d4-a716-446655440000",
                "patient_id": "550e8400-e29b-41d4-a716-446655440000",
                "doctor_id": "550e8400-e29b-41d4-a716-446655440000",
                "date": "2024-07-15T10:00:00Z",
                "reason": "Routine check-up"
            },
            {
                "id": "550e8400-e29b-41d4-a716-446655440001",
                "patient_id": "550e8400-e29b-41d4-a716-446655440001",
                "doctor_id": "550e8400-e29b-41d4-a716-446655440001",
                "date": "2024-07-16T14:30:00Z",
                "reason": "Consultation"
            }
        ]

- #### <span style="font-family: SFMono-Regular, Menlo, Consolas, 'PT Mono', 'Liberation Mono', Courier, monospace; background: rgba(135,131,120,.15); color: #C574E5; border-radius: 4px; padding: 0.2em 0.4em;">/get/appointment/:id</span> Retrieve an appointment by ID

    This endpoint retrieves the details of a specific appointment by its ID.<br>
    The request must include the appointment ID as a parameter.

    #### Example
    #### Request
        GET http://localhost:3000/api/v1/get/appointment/550e8400-e29b-41d4-a716-446655440000

    #### Response
        status 200
        {
            "id": "550e8400-e29b-41d4-a716-446655440000",
            "patient_id": "550e8400-e29b-41d4-a716-446655440000",
            "doctor_id": "550e8400-e29b-41d4-a716-446655440000",
            "date": "2024-07-15T10:00:00Z",
            "reason": "Routine check-up"
        }

### <span style=" color: #C574E5" > **PUT**

- #### <span style="font-family: SFMono-Regular, Menlo, Consolas, 'PT Mono', 'Liberation Mono', Courier, monospace; background: rgba(135,131,120,.15); color: #C574E5; border-radius: 4px; padding: 0.2em 0.4em;">/put/appointment/:id</span> Update an appointment
    This endpoint allows updating an existing appointment by its ID. <br>
    Appointments can only be updated 48 hours in advance. <br>
    The request must include the appointment ID as a parameter, and the body should contain the updated details.

    #### Example:

    #### Request

        PUT http://localhost:3000/api/v1/put/appointment/550e8400-e29b-41d4-a716-446655440000

        Body
        {
            "patient_id": "550e8400-e29b-41d4-a716-446655440000",
            "doctor_id": "550e8400-e29b-41d4-a716-446655440000",
            "date": "2024-07-16T10:00:00Z",
            "reason": "Updated reason"
        }

    #### Response
        status 200
        Appointment updated

### <span style=" color: #C574E5" > **DELETE**

- #### <span style="font-family: SFMono-Regular, Menlo, Consolas, 'PT Mono', 'Liberation Mono', Courier, monospace; background: rgba(135,131,120,.15); color: #C574E5; border-radius: 4px; padding: 0.2em 0.4em;">/delete/appointment/:id</span> Delete an appointment

    This endpoint allows deleting a specific appointment by its ID. <br>
    The request must include the appointment ID as a parameter.

    #### Example:

    #### Request

        DELETE http://localhost:3000/api/v1/delete/appointment/550e8400-e29b-41d4-a716-446655440000

    #### Response
        status 200
        Appointment deleted

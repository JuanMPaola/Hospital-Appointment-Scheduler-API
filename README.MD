# Hospital Appointment Scheduler

# Content

- [Description](#description)
- [Technical requirements](#technical-requirements)
- [Database Documentation](documentation/database.md)
    - [Structure](documentation/database.md#structure)
    - [Tables](documentation/database.md#tables)
    - [Relations](documentation/database.md#relations)
- [API Documentation](documentation/api.md)
- [Install](#install)
- [Run](#run)

# Description

This project is a Hospital Appointment Scheduler API. It helps patients book appointments with doctors based on the doctor's availability and specialty with the following functionalities:

- Create patient profiles
- Create doctor profiles
- See patients registred
- See doctors availables (all or by specialty)
- Set appointments (Earlier for tomorrow)
- Update appointment 
- Delete profiles or appointments
and others..

# Technical Requirements


<p align="center">
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="TypeScript" width="40" height="40"/>
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nestjs/nestjs-original-wordmark.svg" alt="NestJS" width="40" height="40"/>
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original-wordmark.svg" alt="Docker" width="40" height="40"/>
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original-wordmark.svg" alt="PostgreSQL" width="40" height="40"/>
</p>

# Install

To install this project, follow these steps:

1. Clone the repository:
    ```
    git clone https://github.com/JuanMPaola/Hospital-Appointment-Scheduler-API.git
    ```
2. Navigate to the project directory:
    ```
    cd Hospital-Appointment-Scheduler-API
    ```
3. Install dependencies:
    ```
    npm install
    ```

# Run

To run this project, follow these steps:

1. Ensure PostgreSQL is running on your local machine.
2. Run the application:
    ```
    npm run start:dev
    ```
3. The API will be available at:
    ```
    http://localhost:3000/api/v1
    ```

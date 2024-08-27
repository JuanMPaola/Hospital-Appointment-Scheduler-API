# Hospital Appointment Scheduler

# Content

- [Description](#description)
- [Technology Stack](#technology-stack)
- [Install and Run](#installation-and-running-the-project)
- [Database Documentation](documentation/database.md)
    - [Structure](documentation/database.md#structure)
    - [Tables](documentation/database.md#tables)
    - [Relations](documentation/database.md#relations)
- [API Documentation](documentation/api.md)


# Description

This project is a Hospital Appointment Scheduler API. It helps patients book appointments with doctors based on the doctor's availability and specialty with the following functionalities:

- Create patient profiles
- Create doctor profiles
- See patients registred
- See doctors availables (All or by specialty)
- Set appointments (Anytime or nearest starting from tomorrow)
- Update or cancel appointments 
- Delete profiles or appointments
and others..

# Technology Stack

This project is built with the following technologies:

<p>
  <a href="https://skillicons.dev" title="TypeScript">
    <img src="https://skillicons.dev/icons?i=typescript" width="48" alt="TypeScript">
  </a>
  <a href="https://skillicons.dev" title="NestJS">
    <img src="https://skillicons.dev/icons?i=nestjs" width="48" alt="NestJS">
  </a>
  <a href="https://skillicons.dev" title="PostgreSQL">
    <img src="https://skillicons.dev/icons?i=postgres" width="48" alt="PostgreSQL">
  </a>
  <a href="https://skillicons.dev" title="Docker">
    <img src="https://skillicons.dev/icons?i=docker" width="48" alt="Docker">
  </a>
  <a href="https://skillicons.dev" title="Jest">
    <img src="https://skillicons.dev/icons?i=jest" width="48" alt="Jest">
  </a>
</p>



# Installation and Running the Project

You have two options to run this project: **using Docker** (recommended) or **running it locally**.

## Option 1: Run with Docker (Recommended)

1. Ensure Docker and Docker Compose are installed on your machine.

2. Clone the repository:
    ```bash
    git clone https://github.com/JuanMPaola/Hospital-Appointment-Scheduler-API.git
    ```

3. Navigate to the project directory:
    ```bash
    cd Hospital-Appointment-Scheduler-API
    ```

4. Run the application with Docker Compose:
    ```bash
    docker compose up
    ```

5. The API will be available at:
    ```
    http://localhost:3000/api/v1
    ```

## Option 2: Run Locally

1. Ensure PostgreSQL is running on your local machine.

2. Clone the repository:
    ```bash
    git clone https://github.com/JuanMPaola/Hospital-Appointment-Scheduler-API.git
    ```

3. Navigate to the project directory:
    ```bash
    cd Hospital-Appointment-Scheduler-API
    ```

4. Install dependencies:
    ```bash
    npm install
    ```

5. Set up the environment variables by creating a `.env` file in the root directory:
    ```env
    DATABASE_URL=postgres://<your_postgres_user>:<your_postgres_password>@localhost:5432/<your_database_name>
    ```

6. Run the application:
    ```bash
    npm run start:dev
    ```

7. The API will be available in swagger at:
    ```
    http://localhost:3000/apidocs
    ```
    And the base url is:
    ```
    http://localhost:3000/api/v1
    ```

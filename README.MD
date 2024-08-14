# Hospital Appointment Scheduler

# Content

- [Description](#description)
- [Technology Stack](#technology-stack)
- [Install](#install)
- [Run](#run)
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
- See doctors availables (all or by specialty)
- Set appointments (Earlier for tomorrow)
- Update appointment 
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

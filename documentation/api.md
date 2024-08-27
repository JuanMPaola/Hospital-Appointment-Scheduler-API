# Hospital Appointment Scheduler

# Content

- [Description](../README.md#description)
- [Technology Stack](../README.md#technology-stack)
- [Install and Run](../README.md#installation-and-running-the-project)
- [Database Documentation](database.md)
    - [Structure](database.md#structure)
    - [Tables](database.md#tables)
    - [Relations](database.md#relations)
- [API Documentation](#content)

# Swagger
The API for the Hospital Appointment Scheduler is documented using Swagger. You can view documentation and interact with the API by running the application and navigating to the following URL:
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
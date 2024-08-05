# Event Management API

## Table of Contents

- [Introduction](#introduction)
- [Setup](#setup)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Seeding the Database](#seeding-the-database)
  - [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)
  - [Events](#events)
  - [Venues](#venues)
  - [Marketing](#marketing)
- [Testing](#testing)
  - [Manual Testing](#manual-testing)
  - [Automated Testing](#automated-testing)
- [Database](#database)
- [Postman Collection](#postman-collection)
- [Test Report](#test-report)

## Introduction

This API is designed for managing events, including creating events, booking venues, and marketing events. It uses MongoDB as the database and follows RESTful principles.

## Setup

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- MongoDB Atlas account
- Visual Studio Code (VS Code)

### Installation

1. **Clone the repository**:
   - Open your terminal or command prompt.
   - Run the following command to clone the repository:
     ```bash
     git clone https://github.com/necla87/mongoDB_API_Test.git
     cd MONGODB_API_TEST
     ```

2. **Open the project in VS Code**:
   - Open VS Code.
   - Go to `File` > `Open Folder...` and select the `MONGODB_API_TEST` folder.

3. **Install dependencies**:
   - Open the integrated terminal in VS Code (View > Terminal).
   - Run the following command to install the required dependencies:
     ```bash
     npm install
     ```

### Configuration

1. **Create a `config.js` file**:
   - In the root directory of the project, create a file named `config.js`.
   - Add the following content to `config.js`:
     ```javascript
     const config = {
       mongodbUri: 'mongodb+srv://neclasaglam87:necla4820@cluster0.hem47xr.mongodb.net/PVT23?retryWrites=true&w=majority',
       port: 3000
     };

     export default config;
     ```

### Seeding the Database

1. **Seed the database with initial data**:
   - In the integrated terminal in VS Code, run the following command:
     ```bash
     npm run seed
     ```

### Running the Server

1. **Start the server**:
   - In the integrated terminal in VS Code, run the following command:
     ```bash
     npm start
     ```
   - You should see a message indicating that the server is running on the specified port (e.g., `Server running on port 3000`).

## API Endpoints

### Events

- **GET /api/events**
  - **Description**: Retrieve all events.
  - **Response**: 200 OK, array of event objects.
  - **Example**:
    ```json
    [
      {
        "_id": "60b8d5f5b5e4a12c6c8f1234",
        "name": "Test Event",
        "date": "2023-12-12T00:00:00.000Z",
        "location": "Test Location",
        "description": "Test Description",
        "attendees": 100
      }
    ]
    ```

- **POST /api/events**
  - **Description**: Create a new event.
  - **Request Body**:
    ```json
    {
      "name": "Test Event",
      "date": "2023-12-12",
      "location": "Test Location",
      "description": "Test Description",
      "attendees": 100
    }
    ```
  - **Response**: 201 Created, event object.
  - **Example**:
    ```json
    {
      "_id": "60b8d5f5b5e4a12c6c8f1234",
      "name": "Test Event",
      "date": "2023-12-12T00:00:00.000Z",
      "location": "Test Location",
      "description": "Test Description",
      "attendees": 100
    }
    ```

- **GET /api/events/:id**
  - **Description**: Retrieve a single event by ID.
  - **Response**: 200 OK, event object.
  - **Example**:
    ```json
    {
      "_id": "60b8d5f5b5e4a12c6c8f1234",
      "name": "Test Event",
      "date": "2023-12-12T00:00:00.000Z",
      "location": "Test Location",
      "description": "Test Description",
      "attendees": 100
    }
    ```

- **PUT /api/events/:id**
  - **Description**: Update an event by ID.
  - **Request Body**:
    ```json
    {
      "name": "Updated Event",
      "date": "2023-12-13",
      "location": "Updated Location",
      "description": "Updated Description",
      "attendees": 150
    }
    ```
  - **Response**: 200 OK, updated event object.
  - **Example**:
    ```json
    {
      "_id": "60b8d5f5b5e4a12c6c8f1234",
      "name": "Updated Event",
      "date": "2023-12-13T00:00:00.000Z",
      "location": "Updated Location",
      "description": "Updated Description",
      "attendees": 150
    }
    ```

- **DELETE /api/events/:id**
  - **Description**: Delete an event by ID.
  - **Response**: 200 OK, deletion confirmation.
  - **Example**:
    ```json
    {
      "message": "Event deleted"
    }
    ```

### Venues

- **GET /api/venues**
  - **Description**: Retrieve all venues.
  - **Response**: 200 OK, array of venue objects.
  - **Example**:
    ```json
    [
      {
        "_id": "60b8d5f5b5e4a12c6c8f9876",
        "name": "Conference Hall",
        "location": "City Center",
        "capacity": 500,
        "availability": ["2023-12-12T00:00:00.000Z", "2023-12-13T00:00:00.000Z"]
      }
    ]
    ```

- **POST /api/venues**
  - **Description**: Create a new venue.
  - **Request Body**:
    ```json
    {
      "name": "Conference Hall",
      "location": "City Center",
      "capacity": 500,
      "availability": ["2023-12-12", "2023-12-13"]
    }
    ```
  - **Response**: 201 Created, venue object.
  - **Example**:
    ```json
    {
      "_id": "60b8d5f5b5e4a12c6c8f9876",
      "name": "Conference Hall",
      "location": "City Center",
      "capacity": 500,
      "availability": ["2023-12-12T00:00:00.000Z", "2023-12-13T00:00:00.000Z"]
    }
    ```

- **GET /api/venues/:id**
  - **Description**: Retrieve a single venue by ID.
  - **Response**: 200 OK, venue object.
  - **Example**:
    ```json
    {
      "_id": "60b8d5f5b5e4a12c6c8f9876",
      "name": "Conference Hall",
      "location": "City Center",
      "capacity": 500,
      "availability": ["2023-12-12T00:00:00.000Z", "2023-12-13T00:00:00.000Z"]
    }
    ```

- **PUT /api/venues/:id**
  - **Description**: Update a venue by ID.
  - **Request Body**:
    ```json
    {
      "name": "Updated Hall",
      "location": "Downtown",
      "capacity": 600,
      "availability": ["2023-12-14", "2023-12-15"]
    }
    ```
  - **Response**: 200 OK, updated venue object.
  - **Example**:
    ```json
    {
      "_id": "60b8d5f5b5e4a12c6c8f9876",
      "name": "Updated Hall",
      "location": "Downtown",
      "capacity": 600,
      "availability": ["2023-12-14T00:00:00.000Z", "2023-12-15T00:00:00.000Z"]
    }
    ```

- **DELETE /api/venues/:id**
  - **Description**: Delete a venue by ID.
  - **Response**: 200 OK, deletion confirmation.
  - **Example**:
    ```json
    {
      "message": "Venue deleted"
    }
    ```

### Marketing

- **GET /api/marketing**
  - **Description**: Retrieve all marketing campaigns.
  - **Response**: 200 OK, array of marketing campaign objects.
  - **Example**:
    ```json
    [
      {
        "_id": "60b8d5f5b5e4a12c6c8f4321",
        "campaignName": "New Year Promo",
        "event": "60b8d5f5b5e4a12c6c8f1234",
        "channels": ["email", "social media"],
        "budget": 1000,
        "startDate": "2023-12-01T00:00:00.000Z",
        "endDate": "2023-12-31T00:00:00.000Z"
      }
    ]
    ```

- **POST /api/marketing**
  - **Description**: Create a new marketing campaign.
  - **Request Body**:
    ```json
    {
      "campaignName": "New Year Promo",
      "event": "60b8d5f5b5e4a12c6c8f1234",
      "channels": ["email", "social media"],
      "budget": 1000,
      "startDate": "2023-12-01",
      "endDate": "2023-12-31"
    }
    ```
  - **Response**: 201 Created, marketing campaign object.
  - **Example**:
    ```json
    {
      "_id": "60b8d5f5b5e4a12c6c8f4321",
      "campaignName": "New Year Promo",
      "event": "60b8d5f5b5e4a12c6c8f1234",
      "channels": ["email", "social media"],
      "budget": 1000,
      "startDate": "2023-12-01T00:00:00.000Z",
      "endDate": "2023-12-31T00:00:00.000Z"
    }
    ```

- **GET /api/marketing/:id**
  - **Description**: Retrieve a single marketing campaign by ID.
  - **Response**: 200 OK, marketing campaign object.
  - **Example**:
    ```json
    {
      "_id": "60b8d5f5b5e4a12c6c8f4321",
      "campaignName": "New Year Promo",
      "event": "60b8d5f5b5e4a12c6c8f1234",
      "channels": ["email", "social media"],
      "budget": 1000,
      "startDate": "2023-12-01T00:00:00.000Z",
      "endDate": "2023-12-31T00:00:00.000Z"
    }
    ```

- **PUT /api/marketing/:id**
  - **Description**: Update a marketing campaign by ID.
  - **Request Body**:
    ```json
    {
      "campaignName": "Updated Promo",
      "event": "60b8d5f5b5e4a12c6c8f1234",
      "channels": ["email", "social media"],
      "budget": 1500,
      "startDate": "2023-12-02",
      "endDate": "2023-12-30"
    }
    ```
  - **Response**: 200 OK, updated marketing campaign object.
  - **Example**:
    ```json
    {
      "_id": "60b8d5f5b5e4a12c6c8f4321",
      "campaignName": "Updated Promo",
      "event": "60b8d5f5b5e4a12c6c8f1234",
      "channels": ["email", "social media"],
      "budget": 1500,
      "startDate": "2023-12-02T00:00:00.000Z",
      "endDate": "2023-12-30T00:00:00.000Z"
    }
    ```

- **DELETE /api/marketing/:id**
  - **Description**: Delete a marketing campaign by ID.
  - **Response**: 200 OK, deletion confirmation.
  - **Example**:
    ```json
    {
      "message": "Marketing campaign deleted"
    }
    ```

## Testing

### Manual Testing
- Use Postman to test each endpoint.
- Verify the status codes, response formats, and data correctness.

1. **8. HTTP**
   *Manually verify HTTP method handling for various endpoints, ensuring correct status codes and responses for each method.*

2. **9. Verify and Handle the Updates**
   *Manually test the API's handling of updates to records, ensuring that changes are accurately reflected and persisted.*

3. **GET 1. All Venues**
   *Fetch a list of all available venues. This manual test confirms that the data is returned correctly and in the expected format.*

4. **GET 2. JSON**
   *Ensure that the API consistently returns JSON-formatted responses for GET requests, maintaining data integrity.*

5. **POST 3. Invalid**
   *Manually test the API's response to invalid data submissions, verifying proper error handling and messaging.*

6. **GET 4. Filtering**
   *Manually validate the API's filtering capabilities, ensuring accurate results based on specified filters.*

7. **GET 5. Pagination**
   *Manually check the implementation of pagination, ensuring that data is divided into pages appropriately.*

8. **POST 6. Special Characters**
   *Manually verify that the API can correctly handle special characters and non-English text in input and response data.*

9. **POST 7. Multiple Requests**
   *Manually assess the API's performance under concurrent requests, ensuring stability and data consistency.*

### Automated Testing
- Run the automated tests with Postman:
- use the Collection Runner to execute the tests.

 **8. HTTP Methods**
   *Test the correct handling of various HTTP methods (GET, POST, PUT, DELETE) across all endpoints. This includes verifying status codes, data formats, and response content.*

 **9. Handle the Updates for Events**
   *Ensure that the API correctly processes updates to existing events, including modifications to event details and verifying the changes in subsequent responses.*

 **GET 1. All Events**
   *Fetch a list of all available events. This test confirms that the API returns the expected data format and content.*

 **GET 2. JSON Format**
   *Validate that the API returns responses in JSON format for GET requests, ensuring data consistency and format compliance.*

 **GET 3. Invalid Request**
   *Test the API's error handling by making invalid requests. This includes verifying that the API returns appropriate error codes and messages.*

 **GET 4. Filtering**
   *Check the API's ability to filter events based on specified criteria. This test verifies that the correct subset of data is returned when filters are applied.*

 **GET 5. Pagination**
   *Test the API's implementation of pagination, ensuring that responses are correctly segmented into pages when a large dataset is requested.*

 **POST 6. Special Characters**
   *Verify that the API handles special characters and non-English text correctly in both input and output data.*

 **POST 7. Multiple Requests**
   *Assess the API's ability to manage concurrent requests. This test ensures that multiple requests are processed correctly and without data inconsistency.*

### Database
MongoDB Atlas URL: 'mongodb+srv://neclasaglam87:necla4820@cluster0.hem47xr.mongodb.net/PVT23?retryWrites=true&w=majority',

### Postman Collection
Public Postman Collection:

https://www.postman.com/science-pilot-52329232/workspace/pvt/collection/33840924-c00cc16e-fd1a-4404-8d3a-e779f37fc0c3?action=share&creator=33840924


https://elements.getpostman.com/redirect?entityId=33840924-c00cc16e-fd1a-4404-8d3a-e779f37fc0c3&entityType=collection



### Test Report
Refer to the TEST_REPORT.md file in the repository for details on the testing process and results.
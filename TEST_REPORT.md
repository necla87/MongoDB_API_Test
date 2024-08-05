# Event Management API Documentation

## Automated Tests

### 8. HTTP Methods
- **GET All Events**  
  URL: `http://localhost:3000/api/events`  
  *Retrieves all events.*

- **POST New Event**  
  URL: `http://localhost:3000/api/events`  
  Body (raw JSON):  
  ```json
  {
    "name": "Sample Event",
    "date": "2025-01-01",
    "location": "Sample Location",
    "description": "Sample Description",
    "attendees": 100
  }
  ```  
  *Creates a new event.*

- **PUT Update Event**  
  URL: `http://localhost:3000/api/events/{{eventId}}`  
  Body (raw JSON):  
  ```json
  {
    "name": "Updated Event",
    "date": "2025-01-01",
    "location": "Updated Location",
    "description": "Updated Description",
    "attendees": 150
  }
  ```  
  *Updates an existing event.*

- **DELETE Event**  
  URL: `http://localhost:3000/api/events/{{eventId}}`  
  *Deletes an event.*

### 9. Handle the Updates for Events
- **PUT Update Event**  
  URL: `http://localhost:3000/api/events/665643adafd4bf43ecc1ae78`  
  Body (raw JSON):  
  ```json
  {
    "name": "Updated Event",
    "date": "2025-01-01",
    "location": "Updated Location",
    "description": "Updated Description",
    "attendees": 150
  }
  ```  
  *Updates the specified event.*

- **GET Verify Update**  
  URL: `http://localhost:3000/api/events/665643adafd4bf43ecc1ae78`  
  *Verifies the event update.*

### Additional Tests
- **GET 1.All Events**  
  URL: `http://localhost:3000/api/events`  
  *Retrieves all events.*

- **GET 3.Invalid Request**  
  URL: `http://localhost:3000/api/events/invalid-id`  
  Body (raw JSON):  
  ```json
  {
    "name": "Test Event",
    "date": "2023-12-12",
    "location": "Test Location",
    "description": "Test Description",
    "attendees": 100
  }
  ```  
  *Tests response to an invalid request.*

- **GET 4.Filtering**  
  URL: `http://localhost:3000/api/events?name=Updated Event`  
  Query Params:  
  - `name`: Updated Event  
  Body (raw JSON):  
  ```json
  {
    "name": "Updated Event",
    "date": "2023-12-13",
    "location": "Updated Location",
    "description": "Updated Description",
    "attendees": 150
  }
  ```  
  *Tests filtering by event name.*

- **GET 5.Pagination**  
  URL: `http://localhost:3000/api/events?page=1&limit=5`  
  Query Params:  
  - `page`: 1  
  - `limit`: 5  
  *Tests pagination.*

- **POST 6.Special Characters**  
  URL: `http://localhost:3000/api/events`  
  Body (raw JSON):  
  ```json
  {
    "name": "Special Event with é, ç, ü",
    "date": "2023-12-12T00:00:00.000Z",
    "location": "Test Location",
    "description": "Test Description with non-English characters: á, é, í, ó, ú",
    "attendees": 100
  }
  ```  
  *Tests handling of special characters.*

- **POST 7.Multiple Requests**  
  URL: `http://localhost:3000/api/events`  
  Body (raw JSON):  
  ```json
  {
    "name": "Concurrent Event",
    "date": "2025-01-01T00:00:00.000Z",
    "location": "Concurrent Location",
    "description": "Testing concurrent requests",
    "attendees": 50
  }
  ```  
  *Tests handling of multiple simultaneous requests.*

## Manual Tests

### 8. HTTP Methods
- **GET Venues**  
  URL: `http://localhost:3000/api/venues`  
  *Retrieves all venues.*

- **POST New Venue**  
  URL: `http://localhost:3000/api/venues`  
  Body (raw JSON):  
  ```json
  {
    "name": "New Venue",
    "location": "Test City",
    "capacity": 200,
    "availability": ["2024-09-01T00:00:00.000Z", "2024-10-01T00:00:00.000Z"]
  }
  ```  
  *Creates a new venue.*

- **PUT Update Venue**  
  URL: `http://localhost:3000/api/venues/66ad7148c35fa9ba91bafbad`  
  Body (raw JSON):  
  ```json
  {
    "name": "Updated Venue Name",
    "location": "Updated Location",
    "capacity": 400
  }
  ```  
  *Updates a venue.*

- **DELETE Venue**  
  URL: `http://localhost:3000/api/venues/66ad7148c35fa9ba91bafbad`  
  *Deletes a venue.*

### 9. Verify and Handle Updates
- **POST Create a Venue**  
  URL: `http://localhost:3000/api/venues`  
  Body (raw JSON):  
  ```json
  {
    "name": "Test Venue",
    "location": "Test Location",
    "capacity": 100,
    "availability": ["2024-12-01T00:00:00.000Z"]
  }
  ```  
  *Creates a venue.*

- **PUT Update the Venue**  
  URL: `http://localhost:3000/api/venues/66ad7262c35fa9ba91bafbb2`  
  Body (raw JSON):  
  ```json
  {
    "name": "Updated Venue Name",
    "location": "Updated Location",
    "capacity": 200,
    "availability": ["2024-12-15T00:00:00.000Z"]
  }
  ```  
  *Updates a venue.*

- **GET Verify Update**  
  URL: `http://localhost:3000/api/venues/66ad7262c35fa9ba91bafbb2`  
  *Verifies the venue update.*

### Additional Tests
- **GET 1.All Venues**  
  URL: `http://localhost:3000/api/venues`  
  *Retrieves all venues.*

- **GET 2.JSON Data**  
  URL: `http://localhost:3000/api/marketing`  
  *Retrieves marketing data in JSON format.*

- **POST 3.Invalid Marketing Campaign**  
  URL: `http://localhost:3000/api/marketing`  
  Body (raw JSON):  
  ```json
  {
    "campaignName": "Incomplete Campaign"
  }
  ```  
  *Tests API response to incomplete data.*

- **GET 4.Filtered Marketing Campaigns**  
  URL: `http://localhost:3000/api/marketing/?campaignName=Updated`  
  Query Params:  
  - `campaignName`: Updated  
  *Tests filtering by campaign name.*

- **GET 5.Paginated Marketing Campaigns**  
  URL: `http://localhost:3000/api/marketing/?page=1&limit=2`  
  Query Params:  
  - `page`: 1  
  - `limit`: 2  
  *Tests pagination.*

- **6.POST Special Characters**  
  URL: `http://localhost:3000/api/venues`  
  Body (raw JSON):  
  ```json
  {
    "name": "豪华会议室",
    "location": "Москва",
    "capacity": 100,
    "availability": ["2024-08-01T00:00:00.000Z", "2024-08-02T00:00:00.000Z"]
  }
  ```  
  *Tests handling of special characters and non-English text.*

- **7.POST Multiple Requests**  
  URL: `http://localhost:3000/api/venues`  
  Body (raw JSON):  
  ```json
  {
    "name": "Grand Hall",
    "location": "Central City",
    "capacity": 500,
    "availability": [
      "2024-12-15T00:00:00.000Z",
      "2025-01-10T00:00:00.000Z"
    ]
  }
  ```  
  *Tests handling of multiple simultaneous requests.*

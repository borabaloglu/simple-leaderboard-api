# Leaderboard API

## 1. Setting Up

To set up the API, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/borabaloglu/simple-leaderboard-api.git
   cd simple-leaderboard-api
   ```

2. **Install Dependencies**:
   Ensure you have Node.js installed. Then, run:
   ```bash
   npm install
   ```

3. **Environment Variables**:
   Create a `.env.development` and `.env.production` file in the root directory and set the necessary environment variables. You can refer to `.env.example` for the required variables.

## 2. Running Locally

To run the API locally, follow these steps:

1. **Start the Application**:
   Use the following command to start the application in development mode:
   ```bash
   npm run start:dev
   ```

2. **Access the API**:
   The API will be available at `http://localhost:3000`. You can use tools like Postman or curl to interact with the endpoints.

## 3. Running on Docker

To run the API using Docker, follow these steps:

1. **Build the Docker Image**:
   In the root directory of the project, run:
   ```bash
   docker-compose build
   ```

2. **Start the Docker Containers**:
   Use the following command to start the application and its dependencies (MongoDB and Redis):
   ```bash
   docker-compose up -d
   ```

3. **Access the API**:
   The API will be available at `http://localhost:3000`. You can interact with it using Postman or curl.

## 4. Dump Data

The `scripts/dump-data.ts` script is used to generate dummy data for the API.

To dump data into the API:

1. **Ensure API is Running**:
   Make sure the API is running locally or in Docker before proceeding.

2. **Run the Script**:
   Execute the following command:
   ```bash
   npx ts-node scripts/dump-data.ts
   ```

This script will:
- Create 10 test users (testuser0 through testuser9)
- Generate 10 random scores for each user
- Submit the scores to the leaderboard

You can verify the data by checking the leaderboard endpoints after running the script.

## 5. Explanation for Postman Collection

The Postman collection provides a structured way to test and interact with the API endpoints. Here's what you need to know:

- **Importing the Collection**: You can import the Postman collection file (`simple-leaderboard.postman_collection.json`) into Postman. This will create a set of predefined requests for each API endpoint.

- **Environment Variables**: The collection uses `{{baseUrl}}` and `{{accessToken}}` variables for dynamic values.

- **Authentication**: The collection has sign up and sign in requests for generating access token. Both requests set the `accessToken` variable which can be used in the `Authorization` tab in request settings.

- **Testing Endpoints**: Each request in the collection is organized by functionality (Auth and Leaderboard). You can easily send requests, view responses, and test the API's behavior.


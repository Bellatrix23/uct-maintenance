# UCT Maintenance Application

A full-stack web application designed to manage maintenance requests for the University of Cape Town (UCT). This project is intended for educational purposes and demonstrates the use of the MERN stack (MongoDB, Express.js, React.js, Node.js) for building a maintenance management system.

## **Table of Contents**

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## **Project Overview**

The UCT Maintenance Application allows users to submit, update, and track maintenance requests within the University of Cape Town. This application is built for demonstration and educational purposes, showcasing CRUD operations, responsive design, and integration of frontend and backend technologies.

## **Features**

- Submit maintenance jobs with details such as description, location, and priority.
- View a list of jobs ordered by status and submission date.
- Edit job details and update job statuses.
- Batch update statuses of multiple jobs simultaneously.
- Archive jobs to remove them from the active list without deleting them.
- Filter jobs by status (e.g., Submitted, In Progress, Completed) and priority (e.g., High, Medium, Low).

## **Technologies Used**

- **Frontend:** React.js, Bootstrap for UI components
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose for data modeling
- **Other:** Axios for HTTP requests, CSS for styling

## **Installation**

Follow these steps to set up the project locally:

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/Bellatrix23/uct-maintenance.git
   ```

2. **Navigate to the Project Directory:**

   ```bash
   cd uct-maintenance
   ```

3. **Install Backend Dependencies:**

   ```bash
   cd backend
   npm install
   ```

4. **Install Frontend Dependencies:**

   ```bash
   cd ../frontend
   npm install
   ```

5. **Set Up Environment Variables:**

   Create a `.env` file in the `backend` directory and add your environment variables. Here’s an example:

   ```env
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   ```

6. **Run the Application:**

   Open two terminals: one for the backend and one for the frontend.

   - **Backend:**

     ```bash
     cd backend
     npm start
     ```

   - **Frontend:**

     ```bash
     cd ../frontend
     npm start
     ```

7. **Access the Application:**

   Open your browser and navigate to `http://localhost:3000`.

## **Usage**

- **Submit a Job:** Use the job form to create a new maintenance request by entering the description, location, and priority.
- **View Jobs:** See all submitted jobs in the list, filtered and sorted by status and date.
- **Edit Jobs:** Click the "Edit Job" button to modify details of a specific job.
- **Batch Update:** Select multiple jobs and use the "Mark All As..." dropdown to update their statuses.
- **Archive Jobs:** Remove jobs from the active list without deleting them permanently.
- **Filter Jobs:** Use the dropdowns to filter jobs by status and priority.

## **Project Structure**

```
uct-maintenance/
│
├── backend/              # Backend code
│   ├── controllers/      # Controllers for handling requests
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── .env              # Environment variables file
│   └── server.js         # Main server file
│
├── frontend/             # Frontend code
│   ├── public/           # Public assets
│   ├── src/              # Source code
│   │   ├── components/   # React components
│   │   ├── App.js        # Main App component
│   │   └── App.css       # Styling file
│   └── package.json      # Frontend dependencies
│
└── README.md             # Project documentation
```

## **API Endpoints**

### **Jobs Endpoints**

- **GET /api/jobs** - Retrieve all jobs.
- **POST /api/jobs** - Create a new job.
- **PUT /api/jobs/:id** - Update a job's details.
- **PATCH /api/jobs/:id/archive** - Archive a job.
- **PATCH /api/jobs/batch-update** - Update the status of multiple jobs.

## **Contributing**

Contributions are welcome! If you’d like to contribute to the project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a Pull Request.

## **License**

This project is licensed under the MIT License. See the LICENSE file for more information.

## **Disclaimer**

This project is purely for educational purposes and is not affiliated with or endorsed by the University of Cape Town or any of its departments. All content, including logos and names, is used under the assumption of fair use for learning and demonstration.

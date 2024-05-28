<h1>Room Management System</h1>
<p>This project is a Room Management System that allows users to perform CRUD (Create, Read, Update, Delete) operations on room data. The system is built using Node.js, Express, React, PostgreSQL, Bootstrap, and JavaScript. It also includes authentication and registration functionalities.</p>
<br />
<h2>Table of Contents</h2><br />

<ul>
<li>Features</li>
<li>Technologies Used</li>
<li>Installation</li>
<li>Usage</li>
<li>API Endpoints</li>
<li>Screenshots</li>
<li>Contributing</li>
<li>License</li>
</ul><br />
<ul><li><a target="_new" rel="noreferrer" href="#features">Features</a></li><li><a target="_new" rel="noreferrer" href="#technologies-used">Technologies Used</a></li><li><a target="_new" rel="noreferrer" href="#installation">Installation</a></li><li><a target="_new" rel="noreferrer" href="#usage">Usage</a></li><li><a target="_new" rel="noreferrer" href="#api-endpoints">API Endpoints</a></li><li><a target="_new" rel="noreferrer" href="#screenshots">Screenshots</a></li><li><a target="_new" rel="noreferrer" href="#contributing">Contributing</a></li><li><a target="_new" rel="noreferrer" href="#license">License</a></li></ul>
<h2>Features</h2><br />
<ul>
User Authentication and Registration
Create, Read, Update, Delete (CRUD) operations for room data
Search and filter rooms
Sorting room data
Responsive design with Bootstrap
Technologies Used
Backend: Node.js, Express
Frontend: React, JavaScript, Bootstrap
Database: PostgreSQL
Authentication: JSON Web Tokens (JWT)
HTTP Client: Axios
Installation
Prerequisites
Node.js
PostgreSQL
NPM (Node Package Manager)
Backend Setup
Clone the repository:

bash
Copy code
git clone https://github.com/sarwaraminy/full-stack-node-react.git
cd room-management-system
Install backend dependencies:

bash
Copy code
cd backend
npm install
Set up PostgreSQL database and configure environment variables in .env file:

env
Copy code
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=your_db_host
DB_PORT=your_db_port
DB_DATABASE=your_db_name
JWT_SECRET=your_jwt_secret
Run the backend server:

bash
Copy code
npm start
Frontend Setup
Navigate to the frontend directory and install dependencies:

bash
Copy code
cd frontend
npm install
Configure environment variables in .env file:

env
Copy code
REACT_APP_SERVER_ADDRESS=http://localhost:8000
Run the frontend development server:

bash
Copy code
npm start
Usage
Register a new user account.
Log in with the registered account.
Perform CRUD operations on room data:
Create a new room
View the list of rooms
Update room details
Delete a room
Use the search functionality to filter rooms.
Click on column headers to sort the room data.
API Endpoints
Authentication
POST /auth/register: Register a new user
POST /auth/login: Log in a user
Rooms
GET /rooms: Retrieve a list of all rooms
POST /room/add: Add a new room
PUT /room/edit/:roomNumber: Update room details by room number
DELETE /room/delete/:roomId: Delete a room by room ID
Screenshots
Login Page

Room List

Edit Room

Contributing
Fork the repository
Create your feature branch (git checkout -b feature/fooBar)
Commit your changes (git commit -am 'Add some fooBar')
Push to the branch (git push origin feature/fooBar)
Create a new Pull Request
License
This project is licensed under the MIT License - see the LICENSE file for details.
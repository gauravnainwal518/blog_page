# blog page 

This is a full-stack blog editor web application built using the MERN stack. It allows users to register, log in, create, edit, and manage blog posts through a clean, responsive UI. Rich text editing is supported via TinyMCE.

## Tech Stack

### Frontend
- React.js
- React Router
- Tailwind CSS
- Context API
- TinyMCE (Rich Text Editor)

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- dotenv for environment variables

## Folder Structure
root/
├── frontend/ # React-based frontend
│ └── .env # Contains TinyMCE API Key
├── backend/ # Express-based backend
│ └── .env # Contains MongoDB URI, JWT secret, etc.

## Setup Instructions

### Prerequisites

- Node.js and npm installed
- A MongoDB Atlas cluster (free tier is sufficient)

### 1. Clone the Repository

```bash
git clone https://github.com/gauravnainwal518/blog_page

### 2. backend setup
cd blog-backend
npm install
//Create a .env file in the backend/ directory with the following variables
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
//Start the backend server:
npm run dev

### 3. frontend setup
cd blog_frontend
npm install
//create a .env file 
VITE_TINYMCE_API_KEY=your_tinymce_api_key   (//You can get a free TinyMCE API key from https://www.tiny.cloud/)
//start the frontend server:
npm run dev









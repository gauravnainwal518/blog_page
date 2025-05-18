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
- MongoDB atlas free tier
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

# Step into the backend directory
cd blog-backend

# Install backend dependencies
npm install

# Create a .env file
 .env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret

# Run the backend server
npm run dev
# Go to the frontend directory
cd blog_frontend

# Install frontend dependencies
npm install

# Create .env file
 .env
VITE_TINYMCE_API_KEY=your_tinymce_api_key (Get a free API key from https://www.tiny.cloud/)

# Run the frontend development server
npm run dev









Blog Project

A modern and responsive blog application built with React and Vite, where users can create accounts, securely log in, read blog posts, and create, edit, and manage their own content.

🔗 Live Demo: https://blog-project-7vvk-theta.vercel.app/

✨ Features

🔐 User Sign Up & Login

🚪 Secure Logout & Session Management

📝 Create, edit, and manage blog posts

📖 View individual blog posts

✍️ Rich-text editing with TinyMCE

☁️ Appwrite authentication, database & storage

🧠 Redux Toolkit for state management

🛣️ React Router for navigation

📱 Responsive design with Tailwind CSS

⚡ Fast development with Vite

▲ Deployed on Vercel

🛠️ Tech Stack

Frontend: React, Vite

Styling: Tailwind CSS

State Management: Redux Toolkit

Routing: React Router

Backend: Appwrite

Editor: TinyMCE

Deployment: Vercel

🚀 Getting Started

Prerequisites

Node.js & npm

Appwrite project

TinyMCE API key

Installation

git clone <repository-url>
cd <repository-folder>
npm install

Environment Variables

Create a .env file in the project root:

VITE_REACT_APP_APPWRITE_URL=
VITE_APPWRITE_PROJECT_ID=
VITE_APPWRITE_DATABASE_ID=
VITE_APPWRITE_COLLECTION_ID=
VITE_APPWRITE_BUCKET_ID=
VITE_TINYMCE_API_KEY=

Add the corresponding values from your Appwrite and TinyMCE accounts.

Run Locally

npm run dev

Production Build

npm run build
npm run preview

🔒 Security

Keep your .env file and API keys private. Never commit secrets to GitHub.

For deployment, add the same environment variables to your hosting provider and configure your deployed domain in TinyMCE if required.

📚 What I Learned

This project helped me gain practical experience with React, authentication, CRUD operations, Appwrite, Redux Toolkit, rich-text editors, environment variables, Git/GitHub, and Vercel deployment.

👨‍💻 Author

Mantra Gupta
CSE — Data Science

⭐ If you like the project, consider giving the repository a star!

# KAD Software Frontend

Modern web application for KAD Software Company built with Next.js and Tailwind CSS.

## Tech Stack

- Next.js 14
- React 18
- Tailwind CSS
- Firebase Authentication
- Framer Motion
- Chart.js

## Prerequisites

- Node.js 18+
- Firebase project credentials

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
NEXT_PUBLIC_FIREBASE_DATABASE_URL=your_firebase_database_url
```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create the `.env.local` file with required variables

3. Start the development server:
```bash
npm run dev
```

## Features

- 🔐 Secure Authentication with Firebase
- 📊 Interactive Admin Dashboard
- 📝 Project Questionnaire System
- 💬 Real-time Notifications
- 🎨 Modern UI with Animations
- 📱 Fully Responsive Design

## Project Structure

```
src/
├── components/     # Reusable components
├── contexts/       # React contexts
├── hooks/         # Custom hooks
├── pages/         # Next.js pages
├── services/      # API services
├── styles/        # Global styles
└── types/         # TypeScript types
```

## Deployment on Render

1. Create a new Static Site on Render
2. Connect your GitHub repository
3. Configure build settings:
   - Build Command: `npm run build`
   - Publish Directory: `out`
4. Add environment variables in Render's dashboard
5. Set the following environment variables:
   - `NODE_VERSION=18.x`
   - All Firebase configuration variables

## Build for Production

```bash
npm run build
```

This will create an optimized production build in the `out` directory.

## Styling

The project uses Tailwind CSS with a custom configuration:

- Custom color palette
- Custom animations
- Responsive breakpoints
- Form styling

## Authentication

Authentication is handled through Firebase Authentication with the following features:

- Email/Password authentication
- Protected routes
- Admin role management
- Persistent sessions 
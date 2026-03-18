# Link Sharing App

A full-stack-style React + Firebase app for building and sharing a social profile with platform links.

## Live Demo

You can view the live version of the application here: [Link-Sharing App](https://link-sharing-app-mu.vercel.app)

## Features

- User authentication and account creation
- Profile customization (name, email, profile image)
- Link CRUD with drag-and-drop ordering
- Platform-specific URL validation
- Shareable public profile page
- Responsive layout for mobile and desktop

## Run locally

1. Install dependencies:
   - `npm install`
2. Start development server:
   - `npm run dev`

## Environment variables

Create a `.env` file with Firebase values:

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `VITE_MEASUREMENT_ID`

Optional demo-account variables for one-click showcase login:

- `VITE_DEMO_EMAIL`
- `VITE_DEMO_PASSWORD`

When demo credentials are configured, the login page exposes a "Try Demo Account" button. On first login, demo profile details and sample links are seeded automatically.

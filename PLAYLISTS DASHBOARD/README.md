# Spotify Network Dashboard

A beautiful web application to manage and explore playlists from multiple Spotify users in your network. Built with React, TypeScript, Node.js, and the Spotify Web API.

## Features

🎵 **User Management**: Add Spotify users by URL or user ID  
📊 **Beautiful Dashboard**: View user profiles with follower counts and playlist statistics  
🎨 **Playlist Gallery**: Browse all playlists with covers, metadata, and track counts  
🔄 **Real-time Updates**: Refresh user data to get the latest playlists  
📱 **Responsive Design**: Works perfectly on all screen sizes  
🎯 **Network Overview**: See total users, playlists, and followers at a glance  

## Setup Instructions

### 1. Get Spotify API Credentials

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Log in with your Spotify account
3. Click "Create App"
4. Fill in the app details:
   - App name: "Spotify Network Dashboard"
   - App description: "Dashboard for managing Spotify playlists"
   - Redirect URI: `http://localhost:3000` (not used but required)
5. Copy your **Client ID** and **Client Secret**

### 2. Configure Environment

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your Spotify credentials:
   ```
   SPOTIFY_CLIENT_ID=your_client_id_here
   SPOTIFY_CLIENT_SECRET=your_client_secret_here
   PORT=3001
   ```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Application

Option 1 - Start both frontend and backend together:
```bash
npm run dev:full
```

Option 2 - Start them separately:

Terminal 1 (Backend):
```bash
npm run server
```

Terminal 2 (Frontend):
```bash
npm run dev
```

### 5. Use the Dashboard

1. Open your browser to `http://localhost:5173`
2. Add Spotify users by pasting their profile URLs like:
   - `https://open.spotify.com/user/31bm2tm4bfh4zodxlh4ssmzh5qr4`
   - Or just the user ID: `31bm2tm4bfh4zodxlh4ssmzh5qr4`
3. View all playlists from your network in one place!

## How to Find Spotify User URLs

1. Open Spotify (web or desktop app)
2. Go to a user's profile
3. Click the "..." menu
4. Select "Share" → "Copy link to profile"
5. Paste the URL into the dashboard

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Lucide Icons
- **Backend**: Node.js, Express
- **API**: Spotify Web API
- **Build Tool**: Vite

## API Endpoints

- `GET /api/users` - Get all tracked users
- `POST /api/users` - Add a new user
- `DELETE /api/users/:userId` - Remove a user
- `POST /api/users/:userId/refresh` - Refresh user data

## Troubleshooting

**"Failed to load users"**: Make sure the backend server is running on port 3001

**"Invalid client credentials"**: Check your Spotify Client ID and Secret in the `.env` file

**"User not found"**: Verify the Spotify user ID or URL is correct and the profile is public

**CORS errors**: Make sure both frontend (port 5173) and backend (port 3001) are running

## Contributing

Feel free to submit issues and enhancement requests!
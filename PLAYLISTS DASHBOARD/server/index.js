const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Store for users and their data
let users = [];
let spotifyToken = null;
let tokenExpiry = null;

// Get Spotify access token
async function getSpotifyToken() {
  if (spotifyToken && tokenExpiry && Date.now() < tokenExpiry) {
    return spotifyToken;
  }

  try {
    const response = await axios.post('https://accounts.spotify.com/api/token', 
      'grant_type=client_credentials',
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64')}`
        }
      }
    );

    spotifyToken = response.data.access_token;
    tokenExpiry = Date.now() + (response.data.expires_in * 1000);
    return spotifyToken;
  } catch (error) {
    console.error('Error getting Spotify token:', error.response?.data || error.message);
    throw error;
  }
}

// Extract user ID from Spotify URL
function extractUserIdFromUrl(url) {
  const match = url.match(/user\/([a-zA-Z0-9]+)/);
  return match ? match[1] : url;
}

// Get user profile from Spotify
async function getUserProfile(userId) {
  const token = await getSpotifyToken();
  
  try {
    const response = await axios.get(`https://api.spotify.com/v1/users/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error.response?.data || error.message);
    throw error;
  }
}

// Get user playlists from Spotify
async function getUserPlaylists(userId) {
  const token = await getSpotifyToken();
  
  try {
    const response = await axios.get(`https://api.spotify.com/v1/users/${userId}/playlists?limit=50`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data.items;
  } catch (error) {
    console.error('Error fetching user playlists:', error.response?.data || error.message);
    throw error;
  }
}

// API Routes
app.get('/api/users', (req, res) => {
  res.json(users);
});

app.post('/api/users', async (req, res) => {
  try {
    const { userInput } = req.body;
    const userId = extractUserIdFromUrl(userInput);
    
    // Check if user already exists
    if (users.find(user => user.id === userId)) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Get user profile and playlists
    const profile = await getUserProfile(userId);
    const playlists = await getUserPlaylists(userId);

    const user = {
      id: userId,
      display_name: profile.display_name,
      followers: profile.followers.total,
      images: profile.images,
      external_urls: profile.external_urls,
      playlists: playlists,
      addedAt: new Date().toISOString()
    };

    users.push(user);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/users/:userId', (req, res) => {
  const { userId } = req.params;
  users = users.filter(user => user.id !== userId);
  res.json({ success: true });
});

app.post('/api/users/:userId/refresh', async (req, res) => {
  try {
    const { userId } = req.params;
    const userIndex = users.findIndex(user => user.id === userId);
    
    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Refresh user data
    const profile = await getUserProfile(userId);
    const playlists = await getUserPlaylists(userId);

    users[userIndex] = {
      ...users[userIndex],
      display_name: profile.display_name,
      followers: profile.followers.total,
      images: profile.images,
      playlists: playlists
    };

    res.json(users[userIndex]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Make sure to set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET in your .env file');
});
import { SpotifyUser } from '../types/spotify';

const API_BASE = 'http://localhost:3001/api';

export const api = {
  async getUsers(): Promise<SpotifyUser[]> {
    const response = await fetch(`${API_BASE}/users`);
    if (!response.ok) throw new Error('Failed to fetch users');
    return response.json();
  },

  async addUser(userInput: string): Promise<SpotifyUser> {
    const response = await fetch(`${API_BASE}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to add user');
    }
    
    return response.json();
  },

  async removeUser(userId: string): Promise<void> {
    const response = await fetch(`${API_BASE}/users/${userId}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) throw new Error('Failed to remove user');
  },

  async refreshUser(userId: string): Promise<SpotifyUser> {
    const response = await fetch(`${API_BASE}/users/${userId}/refresh`, {
      method: 'POST',
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to refresh user');
    }
    
    return response.json();
  },
};
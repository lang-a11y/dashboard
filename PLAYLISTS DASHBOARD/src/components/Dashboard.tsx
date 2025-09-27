import React, { useState, useEffect } from 'react';
import { SpotifyUser } from '../types/spotify';
import { api } from '../services/api';
import { UserCard } from './UserCard';
import { PlaylistCard } from './PlaylistCard';
import { AddUserForm } from './AddUserForm';
import { Music, Grid2x2 as Grid, List, Users } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const [users, setUsers] = useState<SpotifyUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [addingUser, setAddingUser] = useState(false);
  const [refreshingUsers, setRefreshingUsers] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setError(null);
      const userData = await api.getUsers();
      setUsers(userData);
    } catch (err) {
      setError('Failed to load users. Make sure the server is running.');
      console.error('Error loading users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (userInput: string) => {
    try {
      setAddingUser(true);
      setError(null);
      const newUser = await api.addUser(userInput);
      setUsers(prev => [...prev, newUser]);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setAddingUser(false);
    }
  };

  const handleRemoveUser = async (userId: string) => {
    try {
      await api.removeUser(userId);
      setUsers(prev => prev.filter(user => user.id !== userId));
    } catch (err) {
      setError('Failed to remove user');
    }
  };

  const handleRefreshUser = async (userId: string) => {
    try {
      setRefreshingUsers(prev => new Set(prev).add(userId));
      setError(null);
      const updatedUser = await api.refreshUser(userId);
      setUsers(prev => prev.map(user => user.id === userId ? updatedUser : user));
    } catch (err: any) {
      setError(err.message);
    } finally {
      setRefreshingUsers(prev => {
        const newSet = new Set(prev);
        newSet.delete(userId);
        return newSet;
      });
    }
  };

  const allPlaylists = users.flatMap(user => 
    user.playlists.map(playlist => ({ ...playlist, userName: user.display_name }))
  );

  const totalFollowers = users.reduce((sum, user) => sum + user.followers, 0);
  const totalPlaylists = allPlaylists.length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your Spotify network...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Music className="w-12 h-12 text-green-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">Spotify Network Dashboard</h1>
          </div>
          <p className="text-gray-600 text-lg">
            Manage and explore playlists from your Spotify network
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-3xl font-bold text-gray-800">{users.length}</div>
            <div className="text-gray-600">Users</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <Music className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-3xl font-bold text-gray-800">{totalPlaylists}</div>
            <div className="text-gray-600">Playlists</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-3xl font-bold text-gray-800">{totalFollowers.toLocaleString()}</div>
            <div className="text-gray-600">Total Followers</div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Add User Form */}
        <AddUserForm onAddUser={handleAddUser} isLoading={addingUser} />

        {/* Users Section */}
        {users.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Network</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {users.map(user => (
                <UserCard
                  key={user.id}
                  user={user}
                  onRefresh={handleRefreshUser}
                  onRemove={handleRemoveUser}
                  isRefreshing={refreshingUsers.has(user.id)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Playlists Section */}
        {allPlaylists.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">All Playlists</h2>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid' 
                      ? 'bg-green-600 text-white' 
                      : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list' 
                      ? 'bg-green-600 text-white' 
                      : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1'
            }`}>
              {allPlaylists.map(playlist => (
                <PlaylistCard key={`${playlist.owner.id}-${playlist.id}`} playlist={playlist} />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {users.length === 0 && !loading && (
          <div className="text-center py-12">
            <Music className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No users added yet</h3>
            <p className="text-gray-500">
              Add your first Spotify user to start building your network dashboard
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
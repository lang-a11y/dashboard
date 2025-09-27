import React, { useState, useEffect } from 'react';
import { SpotifyUser } from '../types/spotify';
import { api } from '../services/api';
import { UserCard } from './UserCard';
import { PlaylistCard } from './PlaylistCard';
import { AddUserForm } from './AddUserForm';
import { NetworkStats } from './NetworkStats';
import { Music, Grid2x2 as Grid, List } from 'lucide-react';

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
      setError('Failed to load users. Make sure the server is running on port 3001.');
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
      setError(err.message || 'Failed to add user');
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
      setError(err.message || 'Failed to refresh user');
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your Spotify network...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-green-600 rounded-full mr-4">
              <Music className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Spotify Network Dashboard
            </h1>
          </div>
          <p className="text-gray-600 text-xl max-w-2xl mx-auto">
            Discover and manage playlists from your entire Spotify network in one beautiful dashboard
          </p>
        </div>

        {/* Network Stats */}
        <NetworkStats users={users} />

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 text-red-700 px-6 py-4 rounded-lg mb-8 shadow-sm">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="font-medium">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Add User Form */}
        <AddUserForm onAddUser={handleAddUser} isLoading={addingUser} />

        {/* Users Section */}
        {users.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Your Network</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-800">All Playlists ({allPlaylists.length})</h2>
              <div className="flex items-center space-x-3 bg-white rounded-lg p-1 shadow-sm">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 rounded-lg transition-all duration-200 ${
                    viewMode === 'grid' 
                      ? 'bg-green-600 text-white shadow-md' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  title="Grid view"
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 rounded-lg transition-all duration-200 ${
                    viewMode === 'list' 
                      ? 'bg-green-600 text-white shadow-md' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  title="List view"
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1'
            }`}>
              {allPlaylists.map(playlist => (
                <PlaylistCard 
                  key={`${playlist.owner.id}-${playlist.id}`} 
                  playlist={playlist} 
                  viewMode={viewMode}
                />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {users.length === 0 && !loading && (
          <div className="text-center py-20">
            <div className="p-6 bg-white rounded-full w-32 h-32 mx-auto mb-8 shadow-lg">
              <Music className="w-20 h-20 text-gray-400 mx-auto" />
            </div>
            <h3 className="text-2xl font-bold text-gray-700 mb-4">Start Building Your Network</h3>
            <p className="text-gray-500 text-lg max-w-md mx-auto">
              Add your first Spotify user to discover amazing playlists and build your music network dashboard
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
import React from 'react';
import { SpotifyUser } from '../types/spotify';
import { User, Users, RefreshCw, Trash2, ExternalLink, Music } from 'lucide-react';

interface UserCardProps {
  user: SpotifyUser;
  onRefresh: (userId: string) => void;
  onRemove: (userId: string) => void;
  isRefreshing: boolean;
}

export const UserCard: React.FC<UserCardProps> = ({ user, onRefresh, onRemove, isRefreshing }) => {
  const userImage = user.images?.[0]?.url;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            {userImage ? (
              <img
                src={userImage}
                alt={user.display_name}
                className="w-20 h-20 rounded-full object-cover shadow-lg ring-4 ring-green-100"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg ring-4 ring-green-100">
                <User className="w-10 h-10 text-white" />
              </div>
            )}
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <Music className="w-3 h-3 text-white" />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">{user.display_name}</h3>
            <p className="text-gray-500 font-medium">@{user.id}</p>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={() => onRefresh(user.id)}
            disabled={isRefreshing}
            className="p-3 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-xl transition-all disabled:opacity-50 group"
            title="Refresh playlists"
          >
            <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-300'}`} />
          </button>
          <a
            href={user.external_urls.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-xl transition-all group"
            title="Open in Spotify"
          >
            <ExternalLink className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </a>
          <button
            onClick={() => onRemove(user.id)}
            className="p-3 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all group"
            title="Remove user"
          >
            <Trash2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
          <div className="flex items-center justify-center mb-2">
            <Users className="w-5 h-5 text-blue-600 mr-1" />
          </div>
          <div className="text-2xl font-bold text-blue-800">{user.followers.toLocaleString()}</div>
          <div className="text-sm text-blue-600 font-medium">Followers</div>
        </div>
        <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
          <div className="flex items-center justify-center mb-2">
            <Music className="w-5 h-5 text-green-600 mr-1" />
          </div>
          <div className="text-2xl font-bold text-green-800">{user.playlists.length}</div>
          <div className="text-sm text-green-600 font-medium">Playlists</div>
        </div>
      </div>

      <div className="text-center">
        <div className="text-xs text-gray-500 bg-gray-50 px-3 py-2 rounded-lg">
          Added {new Date(user.addedAt).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
          })}
        </div>
      </div>
    </div>
  );
};
import React from 'react';
import { SpotifyUser } from '../types/spotify';
import { User, Users, RefreshCw, Trash2, ExternalLink } from 'lucide-react';

interface UserCardProps {
  user: SpotifyUser;
  onRefresh: (userId: string) => void;
  onRemove: (userId: string) => void;
  isRefreshing: boolean;
}

export const UserCard: React.FC<UserCardProps> = ({ user, onRefresh, onRemove, isRefreshing }) => {
  const userImage = user.images?.[0]?.url;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            {userImage ? (
              <img
                src={userImage}
                alt={user.display_name}
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
            )}
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">{user.display_name}</h3>
            <p className="text-gray-500">@{user.id}</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onRefresh(user.id)}
            disabled={isRefreshing}
            className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors disabled:opacity-50"
            title="Refresh playlists"
          >
            <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
          <a
            href={user.external_urls.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
            title="Open in Spotify"
          >
            <ExternalLink className="w-5 h-5" />
          </a>
          <button
            onClick={() => onRemove(user.id)}
            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Remove user"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-center mb-1">
            <Users className="w-4 h-4 text-gray-600 mr-1" />
          </div>
          <div className="text-2xl font-bold text-gray-800">{user.followers.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Followers</div>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-center mb-1">
            <div className="w-4 h-4 bg-green-500 rounded mr-1"></div>
          </div>
          <div className="text-2xl font-bold text-gray-800">{user.playlists.length}</div>
          <div className="text-sm text-gray-600">Playlists</div>
        </div>
      </div>

      <div className="text-xs text-gray-500">
        Added {new Date(user.addedAt).toLocaleDateString()}
      </div>
    </div>
  );
};
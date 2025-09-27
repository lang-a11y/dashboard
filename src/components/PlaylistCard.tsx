import React from 'react';
import { SpotifyPlaylist } from '../types/spotify';
import { Music, Users, ExternalLink, Lock, Globe, Clock } from 'lucide-react';

interface PlaylistCardProps {
  playlist: SpotifyPlaylist & { userName?: string };
  viewMode?: 'grid' | 'list';
}

export const PlaylistCard: React.FC<PlaylistCardProps> = ({ playlist, viewMode = 'grid' }) => {
  const playlistImage = playlist.images?.[0]?.url;

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6">
        <div className="flex items-center space-x-6">
          <div className="flex-shrink-0">
            {playlistImage ? (
              <img
                src={playlistImage}
                alt={playlist.name}
                className="w-20 h-20 rounded-lg object-cover shadow-md"
              />
            ) : (
              <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center shadow-md">
                <Music className="w-10 h-10 text-white opacity-80" />
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-bold text-xl text-gray-800 truncate pr-4">{playlist.name}</h3>
              <div className="flex items-center space-x-2 flex-shrink-0">
                {playlist.public ? (
                  <div className="p-1 bg-green-100 text-green-600 rounded-full" title="Public playlist">
                    <Globe className="w-4 h-4" />
                  </div>
                ) : (
                  <div className="p-1 bg-gray-100 text-gray-600 rounded-full" title="Private playlist">
                    <Lock className="w-4 h-4" />
                  </div>
                )}
                <a
                  href={playlist.external_urls.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  title="Open in Spotify"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
            
            {playlist.description && (
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{playlist.description}</p>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <Music className="w-4 h-4 mr-1" />
                  <span>{playlist.tracks.total} tracks</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  <span>{playlist.followers.total.toLocaleString()}</span>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                by {playlist.owner.display_name}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="relative">
        {playlistImage ? (
          <img
            src={playlistImage}
            alt={playlist.name}
            className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-56 bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
            <Music className="w-20 h-20 text-white opacity-80" />
          </div>
        )}
        
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
        
        <div className="absolute top-4 right-4">
          <a
            href={playlist.external_urls.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-black bg-opacity-60 text-white rounded-full hover:bg-opacity-80 transition-all transform hover:scale-110"
            title="Open in Spotify"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
        
        <div className="absolute top-4 left-4">
          {playlist.public ? (
            <div className="p-2 bg-green-500 bg-opacity-90 text-white rounded-full" title="Public playlist">
              <Globe className="w-4 h-4" />
            </div>
          ) : (
            <div className="p-2 bg-gray-500 bg-opacity-90 text-white rounded-full" title="Private playlist">
              <Lock className="w-4 h-4" />
            </div>
          )}
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-black bg-opacity-60 backdrop-blur-sm text-white p-3 rounded-lg">
            <h3 className="font-bold text-lg mb-1 line-clamp-1">{playlist.name}</h3>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-3">
                <div className="flex items-center">
                  <Music className="w-4 h-4 mr-1" />
                  <span>{playlist.tracks.total}</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  <span>{playlist.followers.total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-5">
        {playlist.description && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{playlist.description}</p>
        )}

        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            by <span className="font-medium text-gray-700">{playlist.owner.display_name}</span>
          </div>
          <div className="text-xs text-gray-400 flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            Updated recently
          </div>
        </div>
      </div>
    </div>
  );
};
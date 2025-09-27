import React from 'react';
import { SpotifyPlaylist } from '../types/spotify';
import { Music, Users, ExternalLink, Lock, Globe } from 'lucide-react';

interface PlaylistCardProps {
  playlist: SpotifyPlaylist;
}

export const PlaylistCard: React.FC<PlaylistCardProps> = ({ playlist }) => {
  const playlistImage = playlist.images?.[0]?.url;

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="relative">
        {playlistImage ? (
          <img
            src={playlistImage}
            alt={playlist.name}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
            <Music className="w-16 h-16 text-white opacity-80" />
          </div>
        )}
        <div className="absolute top-3 right-3">
          <a
            href={playlist.external_urls.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-all"
            title="Open in Spotify"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
        <div className="absolute top-3 left-3">
          {playlist.public ? (
            <div className="p-1 bg-green-500 text-white rounded-full" title="Public playlist">
              <Globe className="w-3 h-3" />
            </div>
          ) : (
            <div className="p-1 bg-gray-500 text-white rounded-full" title="Private playlist">
              <Lock className="w-3 h-3" />
            </div>
          )}
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2">{playlist.name}</h3>
        
        {playlist.description && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{playlist.description}</p>
        )}

        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <div className="flex items-center">
            <Music className="w-4 h-4 mr-1" />
            <span>{playlist.tracks.total} tracks</span>
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            <span>{playlist.followers.total.toLocaleString()}</span>
          </div>
        </div>

        <div className="text-xs text-gray-500">
          by {playlist.owner.display_name}
        </div>
      </div>
    </div>
  );
};
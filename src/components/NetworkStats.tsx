import React from 'react';
import { SpotifyUser } from '../types/spotify';
import { Users, Music, Heart, TrendingUp } from 'lucide-react';

interface NetworkStatsProps {
  users: SpotifyUser[];
}

export const NetworkStats: React.FC<NetworkStatsProps> = ({ users }) => {
  const totalFollowers = users.reduce((sum, user) => sum + user.followers, 0);
  const totalPlaylists = users.reduce((sum, user) => sum + user.playlists.length, 0);
  const totalTracks = users.reduce((sum, user) => 
    sum + user.playlists.reduce((playlistSum, playlist) => playlistSum + playlist.tracks.total, 0), 0
  );
  const avgPlaylistsPerUser = users.length > 0 ? Math.round(totalPlaylists / users.length) : 0;

  const stats = [
    {
      icon: Users,
      label: 'Network Users',
      value: users.length,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      icon: Music,
      label: 'Total Playlists',
      value: totalPlaylists,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    {
      icon: Heart,
      label: 'Total Followers',
      value: totalFollowers.toLocaleString(),
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600'
    },
    {
      icon: TrendingUp,
      label: 'Avg Playlists/User',
      value: avgPlaylistsPerUser,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-xl ${stat.bgColor}`}>
              <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
            </div>
            <div className={`h-2 w-16 bg-gradient-to-r ${stat.color} rounded-full`}></div>
          </div>
          <div className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</div>
          <div className="text-gray-600 font-medium">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};
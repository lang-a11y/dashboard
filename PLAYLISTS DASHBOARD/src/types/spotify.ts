export interface SpotifyImage {
  url: string;
  height: number | null;
  width: number | null;
}

export interface SpotifyUser {
  id: string;
  display_name: string;
  followers: number;
  images: SpotifyImage[];
  external_urls: {
    spotify: string;
  };
  playlists: SpotifyPlaylist[];
  addedAt: string;
}

export interface SpotifyPlaylist {
  id: string;
  name: string;
  description: string;
  images: SpotifyImage[];
  tracks: {
    total: number;
  };
  followers: {
    total: number;
  };
  external_urls: {
    spotify: string;
  };
  owner: {
    id: string;
    display_name: string;
  };
  public: boolean;
}
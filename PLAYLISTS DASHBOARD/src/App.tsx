import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [userId, setUserId] = useState("");
  const [playlists, setPlaylists] = useState([]);

  const addUser = async () => {
    try {
      const res = await axios.post("http://localhost:3001/api/users", { userId });
      alert("User added! Refresh the page to see playlists.");
    } catch (err) {
      console.error(err);
      alert("Error adding user.");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Spotify Dashboard</h1>
      <input
        type="text"
        placeholder="Spotify User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        className="border p-2 mr-2"
      />
      <button onClick={addUser} className="bg-blue-500 text-white px-4 py-2">
        Add User
      </button>

      <div className="mt-8">
        {playlists.map((pl: any) => (
          <div key={pl.id} className="mb-2">
            {pl.name} ({pl.tracks.total} tracks)
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;


// import React from 'react';
// import { Dashboard } from './components/Dashboard';
// import './App.css';

// function App() {
//   return <Dashboard />;
// }

// export default App;
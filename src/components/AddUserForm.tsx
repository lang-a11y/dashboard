import React, { useState } from 'react';
import { Plus, User, Link } from 'lucide-react';

interface AddUserFormProps {
  onAddUser: (userInput: string) => void;
  isLoading: boolean;
}

export const AddUserForm: React.FC<AddUserFormProps> = ({ onAddUser, isLoading }) => {
  const [userInput, setUserInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userInput.trim()) {
      onAddUser(userInput.trim());
      setUserInput('');
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
      <div className="flex items-center mb-6">
        <div className="p-3 bg-green-100 rounded-full mr-4">
          <User className="w-6 h-6 text-green-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Add Spotify User</h2>
          <p className="text-gray-600">Expand your network by adding new Spotify users</p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Link className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Paste Spotify user URL or user ID (e.g., 31bm2tm4bfh4zodxlh4ssmzh5qr4)"
            className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all text-lg"
            disabled={isLoading}
          />
        </div>
        
        <button
          type="submit"
          disabled={isLoading || !userInput.trim()}
          className="w-full px-6 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 transition-all font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <Plus className="w-6 h-6" />
          {isLoading ? 'Adding User...' : 'Add to Network'}
        </button>
      </form>
      
      <div className="mt-6 p-4 bg-gray-50 rounded-xl">
        <h4 className="font-semibold text-gray-700 mb-2">How to find Spotify user URLs:</h4>
        <ol className="text-sm text-gray-600 space-y-1">
          <li>1. Open Spotify (web or desktop app)</li>
          <li>2. Go to a user's profile</li>
          <li>3. Click the "..." menu → "Share" → "Copy link to profile"</li>
          <li>4. Paste the URL here</li>
        </ol>
        <div className="mt-3 p-3 bg-white rounded-lg border">
          <p className="text-xs text-gray-500 mb-1">Example URL:</p>
          <code className="text-xs text-green-600 font-mono">
            https://open.spotify.com/user/31bm2tm4bfh4zodxlh4ssmzh5qr4
          </code>
        </div>
      </div>
    </div>
  );
};
import React, { useState } from 'react';
import { Plus, User } from 'lucide-react';

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
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="flex items-center mb-4">
        <User className="w-6 h-6 text-green-600 mr-2" />
        <h2 className="text-xl font-bold text-gray-800">Add Spotify User</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Paste Spotify user URL or user ID (e.g., 31bm2tm4bfh4zodxlh4ssmzh5qr4)"
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !userInput.trim()}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
        >
          <Plus className="w-5 h-5" />
          {isLoading ? 'Adding...' : 'Add User'}
        </button>
      </form>
      
      <p className="text-sm text-gray-500 mt-3">
        You can paste a full Spotify user URL like: 
        <code className="bg-gray-100 px-2 py-1 rounded text-xs ml-1">
          https://open.spotify.com/user/31bm2tm4bfh4zodxlh4ssmzh5qr4
        </code>
      </p>
    </div>
  );
};
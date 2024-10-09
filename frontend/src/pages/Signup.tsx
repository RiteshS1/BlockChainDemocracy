// src/components/Signup.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/signup', {
        email,
        password,
      });
      console.log("Signup successful:", response.data);
      navigate('/voting'); // Redirect to the voting page after successful signup
    } catch (err: any) {
      if (err.response && err.response.status === 400) {
        setError(err.response.data.message); // Display specific error message from backend
      } else {
        setError('Signup failed. Please try again.');
      }
      console.error("Error during signup:", err);
    }
  };

  return (
    <div className="container max-w-lg mx-auto p-4 mt-10 bg-black">
      <h1 className="text-4xl font-bold mb-4 text-center text-white">Sign Up</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2 text-white" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-white"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2 text-white" htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-white"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-500 transition duration-300">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;

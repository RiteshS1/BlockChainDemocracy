import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirecting

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        password,
      });
      // Assuming the response contains a token or user info
      console.log("Login successful:", response.data);
      // Save token to local storage
      localStorage.setItem('token', response.data.token); // Adjust based on your API response
      // Redirect to the voting page after successful login
      navigate('/voting'); // Adjust the route according to your app
    } catch (err) {
      if (axios.isAxiosError(err)) {
        // Check for specific response errors
        if (err.response) {
          setError('Login failed. Please check your credentials.');
        } else {
          setError('Network error. Please try again later.');
        }
      } else {
        setError('An unexpected error occurred.');
      }
      console.error("Error during login:", err);
    }
  };

  return (
    <div className="container max-w-lg mx-auto p-4 mt-10 bg-black">
      <h1 className="text-4xl font-bold mb-4 text-center text-white">Login</h1>
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
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;

import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add logic to handle login (e.g., validation, API call)
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="container max-w-lg mx-auto p-4 mt-10 bg-black">
      <h1 className="text-4xl font-bold mb-4 text-center text-white">Login</h1>
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

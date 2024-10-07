import React from 'react';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-black text-white p-6">
      <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">Welcome to BlockChain Democracy</h1>
      <p className="text-xl md:text-2xl text-center max-w-2xl">
        Your trusted platform for decentralized voting! <br />Empowering the future of transparent and secure elections with cutting-edge blockchain technology. 
        <br /><hr />Join us and experience the power of democracy in your hands.
      </p>
    </div>
  );
};

export default Home;

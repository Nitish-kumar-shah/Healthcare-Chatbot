import React from "react";

const Header = ({ user, onLogout }) => {
  return (
    <header className="w-full max-w-4xl bg-blue-600 text-white p-4 rounded-t-xl shadow-lg flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold">Healthcare Assistant</h1>
        <p className="text-blue-100 text-sm">
          Welcome, {user.name || user.email}
        </p>
      </div>
      <button
        onClick={onLogout}
        className="bg-red-500 px-4 py-2 rounded text-sm hover:bg-red-600 transition shadow-sm"
      >
        Logout
      </button>
    </header>
  );
};

export default Header;

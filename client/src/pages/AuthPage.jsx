import React, { useState } from "react";
import { account } from "../appwriteConfig";
import { ID } from "appwrite";

const AuthPage = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const handleAuth = async () => {
    try {
      if (isRegistering) {
        await account.create(ID.unique(), email, password, "User");
      }
      await account.createEmailPasswordSession(email, password);
      const userData = await account.get();
      onLoginSuccess(userData);
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-800 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">
          Healthcare AI
        </h1>
        <p className="text-center text-gray-500 mb-8">
          {isRegistering ? "Create Account" : "Welcome Back"}
        </p>
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleAuth}
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700"
          >
            {isRegistering ? "Sign Up" : "Login"}
          </button>
          <p
            className="text-center text-sm text-gray-600 cursor-pointer hover:underline"
            onClick={() => setIsRegistering(!isRegistering)}
          >
            {isRegistering
              ? "Already have an account? Login"
              : "Need an account? Sign Up"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;

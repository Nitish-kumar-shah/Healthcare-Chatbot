// import React, { useState } from "react";
// import Header from "../components/Header";
// import ChatInterface from "../features/ChatInterface";
// import SymptomChecker from "../features/SymptomChecker";
// import { account } from "../appwriteConfig";

// const Dashboard = ({ user, setUser }) => {
//   const [activeTab, setActiveTab] = useState("chat");

//   const handleLogout = async () => {
//     await account.deleteSession("current");
//     setUser(null);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6 font-sans">
//       <Header user={user} onLogout={handleLogout} />

//       <div className="w-full max-w-4xl bg-white shadow-md flex mt-4 rounded-t-lg overflow-hidden">
//         <button
//           onClick={() => setActiveTab("chat")}
//           className={`flex-1 p-4 font-semibold ${
//             activeTab === "chat"
//               ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600"
//               : "text-gray-500 hover:bg-gray-50"
//           }`}
//         >
//           💬 Chat Assistant
//         </button>
//         <button
//           onClick={() => setActiveTab("predict")}
//           className={`flex-1 p-4 font-semibold ${
//             activeTab === "predict"
//               ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600"
//               : "text-gray-500 hover:bg-gray-50"
//           }`}
//         >
//           🩺 Check Symptoms
//         </button>
//       </div>

//       <div className="w-full max-w-4xl bg-white shadow-lg rounded-b-xl min-h-[500px] p-6 flex flex-col">
//         {activeTab === "chat" ? <ChatInterface /> : <SymptomChecker />}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

// import React, { useState } from "react";
// import ChatInterface from "../features/ChatInterface";
// import SymptomChecker from "../features/SymptomChecker";
// import { account } from "../appwriteConfig";
// import { LogOut, MessageSquare, Activity, UserCircle } from "lucide-react";

// const Dashboard = ({ user, setUser }) => {
//   const [activeTab, setActiveTab] = useState("chat");

//   const handleLogout = async () => {
//     await account.deleteSession("current");
//     setUser(null);
//   };

//   // Generate a cool avatar based on the user's name
//   const userAvatarUrl = `https://ui-avatars.com/api/?name=${
//     user.name || user.email
//   }&background=0D8ABC&color=fff&rounded=true&bold=true`;

//   return (
//     // DARK PREMIUM BACKGROUND
//     <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 font-sans text-white">
//       {/* GLASS CONTAINER */}
//       <div className="w-full max-w-6xl h-[90vh] bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
//         {/* SIDEBAR */}
//         <div className="md:w-72 bg-black/40 p-6 flex flex-col justify-between border-r border-white/10">
//           <div>
//             {/* Logo */}
//             <div className="flex items-center gap-3 mb-10">
//               <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/50">
//                 <Activity className="text-white w-6 h-6" />
//               </div>
//               <h1 className="text-2xl font-bold tracking-wide">
//                 Medi<span className="text-blue-400">Bot</span>
//               </h1>
//             </div>

//             {/* Navigation Buttons (FIXED VISIBILITY) */}
//             <nav className="space-y-4">
//               <button
//                 onClick={() => setActiveTab("chat")}
//                 className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 font-bold ${
//                   activeTab === "chat"
//                     ? "bg-blue-600 text-white shadow-lg shadow-blue-600/40 transform scale-105"
//                     : "hover:bg-white/10 text-gray-300 hover:text-white"
//                 }`}
//               >
//                 <MessageSquare className="w-5 h-5" />
//                 <span>AI Chat</span>
//               </button>

//               <button
//                 onClick={() => setActiveTab("predict")}
//                 className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 font-bold ${
//                   activeTab === "predict"
//                     ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/40 transform scale-105"
//                     : "hover:bg-white/10 text-gray-300 hover:text-white" // <--- FIXED CONTRAST HERE
//                 }`}
//               >
//                 <Activity className="w-5 h-5" />
//                 <span>Diagnose</span>
//               </button>
//             </nav>
//           </div>

//           {/* User Profile (Bottom) */}
//           <div className="mt-auto pt-6 border-t border-white/10">
//             <div className="flex items-center gap-3 mb-4 bg-white/5 p-3 rounded-xl border border-white/5">
//               {/* User Avatar Image */}
//               <img
//                 src={userAvatarUrl}
//                 alt="User"
//                 className="w-10 h-10 rounded-full border-2 border-blue-400"
//               />

//               <div className="overflow-hidden">
//                 <p className="font-bold text-white text-sm truncate">
//                   {user.name || "User"}
//                 </p>
//                 <p className="text-xs text-gray-400 truncate w-32">
//                   {user.email}
//                 </p>
//               </div>
//             </div>
//             <button
//               onClick={handleLogout}
//               className="w-full flex items-center justify-center gap-2 text-sm bg-red-500/10 text-red-400 py-2 rounded-lg hover:bg-red-500 hover:text-white transition"
//             >
//               <LogOut className="w-4 h-4" /> Sign Out
//             </button>
//           </div>
//         </div>

//         {/* MAIN CONTENT */}
//         <div className="flex-1 bg-gradient-to-br from-gray-900 to-black relative">
//           <div className="h-full p-6 relative z-10">
//             {/* Pass User Prop to Chat so it can show the photo */}
//             {activeTab === "chat" ? (
//               <ChatInterface userName={user.name || "User"} />
//             ) : (
//               <SymptomChecker />
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect } from "react";
import ChatInterface from "../features/ChatInterface";
import SymptomChecker from "../features/SymptomChecker";
import { account, storage } from "../appwriteConfig";
import { ID } from "appwrite";
import { LogOut, MessageSquare, Activity, Camera } from "lucide-react";

const BUCKET_ID = import.meta.env.VITE_APPWRITE_BUCKET_ID;

const Dashboard = ({ user, setUser }) => {
  const [activeTab, setActiveTab] = useState("chat");
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(user.prefs?.avatar || null);

  // Fallback if no photo uploaded
  const defaultAvatar = `https://ui-avatars.com/api/?name=${
    user.name || user.email
  }&background=0D8ABC&color=fff&rounded=true&bold=true`;

  const handleLogout = async () => {
    await account.deleteSession("current");
    setUser(null);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      // 1. Upload File
      const response = await storage.createFile(BUCKET_ID, ID.unique(), file);

      // 2. Get the URL (Handle both String and Object formats)
      const result = storage.getFileView(BUCKET_ID, response.$id);
      const finalUrl = result.href ? result.href : result; // <--- THE FIX IS HERE

      console.log("New Avatar URL:", finalUrl); // Check console to see if this prints

      // 3. Save to Profile
      await account.updatePrefs({ avatar: finalUrl });

      // 4. Update UI
      setAvatarUrl(finalUrl);
      setUser({ ...user, prefs: { avatar: finalUrl } });
      alert("Profile photo updated!");
    } catch (error) {
      alert("Upload failed: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 font-sans text-white">
      <div className="w-full max-w-6xl h-[90vh] bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* SIDEBAR */}
        <div className="md:w-72 bg-black/40 p-6 flex flex-col justify-between border-r border-white/10">
          <div>
            <div className="flex items-center gap-3 mb-10">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/50">
                <Activity className="text-white w-6 h-6" />
              </div>
              <h1 className="text-2xl font-bold tracking-wide">
                Munna<span className="text-blue-400">Bot</span>
              </h1>
            </div>

            <nav className="space-y-4">
              <button
                onClick={() => setActiveTab("chat")}
                className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 font-bold ${
                  activeTab === "chat"
                    ? "bg-blue-600 text-white shadow-lg"
                    : "hover:bg-white/10 text-gray-300"
                }`}
              >
                <MessageSquare className="w-5 h-5" /> <span>AI Chat</span>
              </button>
              <button
                onClick={() => setActiveTab("predict")}
                className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 font-bold ${
                  activeTab === "predict"
                    ? "bg-emerald-600 text-white shadow-lg"
                    : "hover:bg-white/10 text-gray-300"
                }`}
              >
                <Activity className="w-5 h-5" /> <span>Diagnose</span>
              </button>
            </nav>
          </div>

          {/* USER PROFILE & UPLOAD */}
          <div className="mt-auto pt-6 border-t border-white/10">
            <div className="flex items-center gap-3 mb-4 bg-white/5 p-3 rounded-xl border border-white/5 relative group">
              {/* HIDDEN INPUT FOR FILE UPLOAD */}
              <input
                type="file"
                id="avatarInput"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />

              {/* AVATAR IMAGE (CLICK TO UPLOAD) */}
              <label htmlFor="avatarInput" className="relative cursor-pointer">
                <img
                  src={avatarUrl || defaultAvatar}
                  alt="User"
                  className={`w-12 h-12 rounded-full border-2 border-blue-400 object-cover ${
                    uploading ? "opacity-50" : ""
                  }`}
                />
                {/* Camera Icon Overlay on Hover */}
                <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="w-4 h-4 text-white" />
                </div>
              </label>

              <div className="overflow-hidden">
                <p className="font-bold text-white text-sm truncate">
                  {user.name || "User"}
                </p>
                <p className="text-xs text-gray-400 truncate w-32">
                  {uploading ? "Uploading..." : "Click photo to change"}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 text-sm bg-red-500/10 text-red-400 py-2 rounded-lg hover:bg-red-500 hover:text-white transition"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="flex-1 bg-gradient-to-br from-gray-900 to-black relative">
          <div className="h-full p-6 relative z-10">
            {/* Pass avatarUrl to ChatInterface */}
            {activeTab === "chat" ? (
              <ChatInterface userName={user.name} customAvatar={avatarUrl} />
            ) : (
              <SymptomChecker />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

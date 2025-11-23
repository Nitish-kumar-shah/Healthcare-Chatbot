// import React, { useState, useEffect } from "react";
// import { account } from "./appwriteConfig.js";
// import AuthPage from "./pages/AuthPage";
// import Dashboard from "./pages/Dashboard";

// function App() {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const checkUser = async () => {
//       try {
//         const userData = await account.get();
//         setUser(userData);
//       } catch (error) {
//         setUser(null);
//       } finally {
//         setLoading(false);
//       }
//     };
//     checkUser();
//   }, []);

//   if (loading)
//     return (
//       <div className="flex justify-center items-center h-screen">
//         Loading...
//       </div>
//     );

//   return (
//     <>
//       {user ? (
//         <Dashboard user={user} setUser={setUser} />
//       ) : (
//         <AuthPage onLoginSuccess={setUser} />
//       )}
//     </>
//   );
// }

// export default App;

import React, { useState, useEffect } from "react";
import { account } from "./appwriteConfig";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import { Loader2 } from "lucide-react"; // Import spinner

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const userData = await account.get();
        setUser(userData);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkUser();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#0f172a] text-white">
        <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <>
      {user ? (
        <Dashboard user={user} setUser={setUser} />
      ) : (
        <AuthPage onLoginSuccess={setUser} />
      )}
    </>
  );
}

export default App;

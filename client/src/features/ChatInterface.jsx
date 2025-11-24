// import React, { useState, useEffect, useRef } from "react";
// import { databases, account } from "../appwriteConfig";
// import { ID, Query } from "appwrite";

// const DATABASE_ID = "69235b8c000b5678bcb9";
// const COLLECTION_ID = "chats";

// const ChatInterface = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [userId, setUserId] = useState(null);
//   const messagesEndRef = useRef(null);

//   // 1. Get User ID & Load History
//   useEffect(() => {
//     const init = async () => {
//       try {
//         const user = await account.get();
//         setUserId(user.$id);

//         // Load past messages for this user
//         const response = await databases.listDocuments(
//           DATABASE_ID,
//           COLLECTION_ID,
//           [Query.equal("userId", user.$id)] // Only show MY messages
//         );

//         // Convert Appwrite format to our format
//         const history = response.documents.map((doc) => ({
//           sender: doc.sender,
//           text: doc.text,
//         }));

//         if (history.length > 0) {
//           setMessages(history);
//         } else {
//           setMessages([
//             { sender: "bot", text: "Hello! 👋 I am your AI Health Assistant." },
//           ]);
//         }
//       } catch (error) {
//         console.error("Error loading chat:", error);
//       }
//     };
//     init();
//   }, []);

//   // Auto-scroll
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   // 2. Save Message to Appwrite
//   const saveMessageToDB = async (sender, text) => {
//     try {
//       await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
//         sender: sender,
//         text: text,
//         userId: userId,
//       });
//     } catch (error) {
//       console.error("Failed to save message:", error);
//     }
//   };

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const userText = input;
//     setInput("");

//     // UI Update (Instant)
//     setMessages((prev) => [...prev, { sender: "user", text: userText }]);

//     // Save User Message to DB
//     saveMessageToDB("user", userText);

//     setLoading(true);

//     try {
//       const response = await fetch("http://127.0.0.1:8000/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ message: userText }),
//       });
//       const data = await response.json();

//       // UI Update (Bot)
//       setMessages((prev) => [...prev, { sender: "bot", text: data.response }]);

//       // Save Bot Message to DB
//       saveMessageToDB("bot", data.response);
//     } catch (error) {
//       setMessages((prev) => [
//         ...prev,
//         { sender: "bot", text: "⚠️ Error: Server is offline." },
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col h-full bg-gray-50 rounded-xl overflow-hidden">
//       <div className="flex-1 overflow-y-auto p-6 space-y-6">
//         {messages.map((msg, idx) => (
//           <div
//             key={idx}
//             className={`flex items-end gap-3 ${
//               msg.sender === "user" ? "flex-row-reverse" : "flex-row"
//             }`}
//           >
//             <div
//               className={`w-8 h-8 rounded-full flex items-center justify-center text-sm shadow-sm flex-shrink-0 ${
//                 msg.sender === "user"
//                   ? "bg-indigo-600 text-white"
//                   : "bg-green-500 text-white"
//               }`}
//             >
//               {msg.sender === "user" ? "👤" : "🤖"}
//             </div>
//             <div
//               className={`max-w-[75%] px-5 py-3 rounded-2xl shadow-sm text-sm leading-relaxed ${
//                 msg.sender === "user"
//                   ? "bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-br-none"
//                   : "bg-white text-gray-800 border border-gray-100 rounded-bl-none"
//               }`}
//             >
//               {msg.text}
//             </div>
//           </div>
//         ))}
//         {loading && (
//           <div className="text-gray-400 text-sm ml-12">Bot is typing...</div>
//         )}
//         <div ref={messagesEndRef} />
//       </div>

//       <div className="p-4 bg-white border-t border-gray-100">
//         <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-full border border-gray-200 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
//           <input
//             type="text"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyPress={(e) => e.key === "Enter" && sendMessage()}
//             placeholder="Type your health question..."
//             className="flex-1 bg-transparent border-none focus:outline-none px-4 text-gray-700"
//           />
//           <button
//             onClick={sendMessage}
//             className="p-3 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 shadow-md"
//           >
//             ➤
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatInterface;

// --------------------------------------------------------------
// import React, { useState, useEffect, useRef } from "react";
// import { databases, account } from "../appwriteConfig";
// import { ID, Query } from "appwrite";
// import { Send, Bot, Loader2 } from "lucide-react";

// const DATABASE_ID = "69235b8c000b5678bcb9";
// const COLLECTION_ID = "chats";

// const ChatInterface = ({ userName, customAvatar }) => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [userId, setUserId] = useState(null);
//   const messagesEndRef = useRef(null);

//   // Dynamic Avatar URLs
//   const botAvatar = "https://cdn-icons-png.flaticon.com/512/4712/4712027.png";
//   // Use uploaded photo OR fallback to initials
//   const userAvatar =
//     customAvatar ||
//     `https://ui-avatars.com/api/?name=${userName}&background=random&color=fff&rounded=true`;

//   useEffect(() => {
//     const init = async () => {
//       try {
//         const user = await account.get();
//         setUserId(user.$id);
//         const response = await databases.listDocuments(
//           DATABASE_ID,
//           COLLECTION_ID,
//           [Query.equal("userId", user.$id)]
//         );
//         const history = response.documents.map((doc) => ({
//           sender: doc.sender,
//           text: doc.text,
//         }));
//         setMessages(
//           history.length > 0
//             ? history
//             : [{ sender: "bot", text: "Hello! I am your AI Health Assistant." }]
//         );
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     init();
//   }, []);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const saveMessageToDB = async (sender, text) => {
//     try {
//       await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
//         sender,
//         text,
//         userId,
//       });
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const sendMessage = async () => {
//     if (!input.trim()) return;
//     const userText = input;
//     setInput("");
//     setMessages((prev) => [...prev, { sender: "user", text: userText }]);
//     saveMessageToDB("user", userText);
//     setLoading(true);

//     try {
//       // ⚠️ ENSURE THIS URL MATCHES YOUR SERVER (Use 127.0.0.1 for local, Render URL for deployed)
//       const response = await fetch("http://127.0.0.1:8000/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ message: userText }),
//       });
//       const data = await response.json();
//       setMessages((prev) => [...prev, { sender: "bot", text: data.response }]);
//       saveMessageToDB("bot", data.response);
//     } catch (error) {
//       setMessages((prev) => [
//         ...prev,
//         { sender: "bot", text: "⚠️ Error: Server offline." },
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col h-full">
//       {/* Messages Area */}
//       <div className="flex-1 overflow-y-auto space-y-6 pr-2 custom-scrollbar">
//         {messages.map((msg, idx) => (
//           <div
//             key={idx}
//             className={`flex gap-4 ${
//               msg.sender === "user" ? "flex-row-reverse" : "flex-row"
//             }`}
//           >
//             {/* AVATAR IMAGE */}
//             <img
//               src={msg.sender === "user" ? userAvatar : botAvatar}
//               alt="avatar"
//               className="w-10 h-10 rounded-full shadow-lg border-2 border-white/20"
//             />

//             {/* Chat Bubble */}
//             <div
//               className={`max-w-[75%] px-6 py-4 rounded-2xl text-sm leading-relaxed shadow-xl ${
//                 msg.sender === "user"
//                   ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-tr-none"
//                   : "bg-white/10 backdrop-blur-md border border-white/10 text-gray-200 rounded-tl-none"
//               }`}
//             >
//               {msg.text}
//             </div>
//           </div>
//         ))}

//         {loading && (
//           <div className="flex gap-4">
//             <img src={botAvatar} className="w-10 h-10 rounded-full" alt="Bot" />
//             <div className="bg-white/10 px-6 py-4 rounded-2xl rounded-tl-none flex items-center gap-2">
//               <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></span>
//               <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-100"></span>
//               <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-200"></span>
//             </div>
//           </div>
//         )}
//         <div ref={messagesEndRef} />
//       </div>

//       {/* Input Area */}
//       <div className="mt-4 relative">
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyPress={(e) => e.key === "Enter" && sendMessage()}
//           placeholder="Ask me anything..."
//           className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-6 pr-14 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-xl"
//         />
//         <button
//           onClick={sendMessage}
//           disabled={!input.trim()}
//           className="absolute right-2 top-2 p-2 bg-blue-600 rounded-full text-white hover:bg-blue-500 transition-all shadow-lg"
//         >
//           <Send className="w-5 h-5" />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ChatInterface;

// voice----------------------------------------
import React, { useState, useEffect, useRef } from "react";
import { databases, account } from "../appwriteConfig";
import { ID, Query } from "appwrite";
import { Send, Bot, User, Mic, Volume2, StopCircle } from "lucide-react";

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

const ChatInterface = ({ userName, customAvatar }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false); // Track if bot is talking
  const messagesEndRef = useRef(null);

  const botAvatar = "https://cdn-icons-png.flaticon.com/512/4712/4712027.png";
  const userAvatar =
    customAvatar ||
    `https://ui-avatars.com/api/?name=${userName}&background=random&color=fff&rounded=true`;

  useEffect(() => {
    const init = async () => {
      try {
        const user = await account.get();
        setUserId(user.$id);
        const response = await databases.listDocuments(
          DATABASE_ID,
          COLLECTION_ID,
          [Query.equal("userId", user.$id)]
        );
        const history = response.documents.map((doc) => ({
          sender: doc.sender,
          text: doc.text,
        }));
        setMessages(
          history.length > 0
            ? history
            : [{ sender: "bot", text: "Hello! I am your AI Health Assistant." }]
        );
      } catch (error) {
        console.error(error);
      }
    };
    init();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // --- 🗣️ TEXT TO SPEECH (Manual Trigger) ---
  const speak = (text) => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  // --- 🎤 SPEECH TO TEXT ---
  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Browser does not support voice. Please use Google Chrome.");
      return;
    }
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    setIsListening(true);
    recognition.start();

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join("");
      setInput(transcript);
    };

    recognition.onerror = (event) => setIsListening(false);
    recognition.onend = () => setIsListening(false);
  };

  const saveMessageToDB = async (sender, text) => {
    try {
      await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        sender,
        text,
        userId,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userText = input;
    setInput("");
    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    saveMessageToDB("user", userText);
    setLoading(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/chathttps://healthcare-chatbot-qd7o.onrender.com/chat",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: userText }),
        }
      );
      const data = await response.json();
      setMessages((prev) => [...prev, { sender: "bot", text: data.response }]);
      saveMessageToDB("bot", data.response);
      // Removed automatic speak() call here! 🔇
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Error: Server offline." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full relative">
      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto space-y-6 pr-2 custom-scrollbar">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex gap-4 ${
              msg.sender === "user" ? "flex-row-reverse" : "flex-row"
            }`}
          >
            {/* Avatar */}
            <img
              src={msg.sender === "user" ? userAvatar : botAvatar}
              alt="avatar"
              className="w-10 h-10 rounded-full shadow-lg border-2 border-white/20"
            />

            {/* Chat Bubble Group */}
            <div
              className={`flex flex-col ${
                msg.sender === "user" ? "items-end" : "items-start"
              } max-w-[75%]`}
            >
              <div
                className={`px-6 py-4 rounded-2xl text-sm leading-relaxed shadow-xl ${
                  msg.sender === "user"
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-tr-none"
                    : "bg-white/10 backdrop-blur-md border border-white/10 text-gray-200 rounded-tl-none"
                }`}
              >
                {msg.text}
              </div>

              {/* 🔊 Speaker Button (Only for Bot) */}
              {msg.sender === "bot" && (
                <button
                  onClick={() => speak(msg.text)}
                  className="mt-2 flex items-center gap-1 text-xs text-gray-400 hover:text-blue-400 transition-colors"
                >
                  <Volume2 className="w-3 h-3" /> Read Aloud
                </button>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex gap-4">
            <img src={botAvatar} className="w-10 h-10 rounded-full" alt="Bot" />
            <div className="bg-white/10 px-6 py-4 rounded-2xl rounded-tl-none flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-100"></span>
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-200"></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="mt-4 relative flex items-center gap-2">
        <button
          onClick={startListening}
          className={`p-4 rounded-full transition-all shadow-lg ${
            isListening
              ? "bg-red-500 animate-pulse"
              : "bg-white/10 hover:bg-white/20 text-white"
          }`}
        >
          <Mic className="w-5 h-5" />
        </button>

        <div className="relative flex-1">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            placeholder={isListening ? "Listening..." : "Type your question..."}
            className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-6 pr-14 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-xl"
          />
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim()}
            className="absolute right-2 top-2 p-2 bg-blue-600 rounded-full text-white hover:bg-blue-500 transition-all shadow-lg"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;

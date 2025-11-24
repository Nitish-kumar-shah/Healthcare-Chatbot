// import React, { useState } from "react";

// const SymptomChecker = () => {
//   const [symptoms, setSymptoms] = useState("");
//   const [prediction, setPrediction] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const checkSymptoms = async () => {
//     setLoading(true);
//     const symptomList = symptoms.split(",").map((s) => s.trim());
//     try {
//       const response = await fetch("http://127.0.0.1:8000/predict", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ symptoms: symptomList }),
//       });
//       const data = await response.json();
//       setPrediction(data);
//     } catch (error) {
//       console.error("Error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center space-y-6">
//       <div className="w-full">
//         <label className="block text-gray-700 font-bold mb-2">
//           Enter Symptoms (comma separated):
//         </label>
//         <textarea
//           className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           rows="3"
//           placeholder="e.g. itching, skin_rash, stomach_pain"
//           value={symptoms}
//           onChange={(e) => setSymptoms(e.target.value)}
//         ></textarea>
//       </div>

//       <button
//         onClick={checkSymptoms}
//         disabled={loading}
//         className="w-full bg-green-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-green-700 transition disabled:bg-gray-400"
//       >
//         {loading ? "Analyzing..." : "🔍 Analyze Symptoms"}
//       </button>

//       {prediction && (
//         <div className="w-full p-6 bg-yellow-50 border-l-8 border-yellow-400 rounded-lg shadow-md animate-fade-in">
//           {prediction.error ? (
//             <p className="text-red-600 font-bold text-center">
//               {prediction.error}
//             </p>
//           ) : (
//             <>
//               <h2 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-4">
//                 Diagnosis Report
//               </h2>
//               <div className="mb-4">
//                 <p className="text-3xl text-blue-700 font-extrabold">
//                   {prediction.predicted_disease}
//                 </p>
//                 <p className="text-sm text-gray-500">
//                   Confidence: {prediction.confidence_score}
//                 </p>
//               </div>
//               <p className="text-gray-700 italic mb-4">
//                 {prediction.description}
//               </p>
//               <h4 className="font-bold text-gray-700">Precautions:</h4>
//               <ul className="list-disc ml-5 text-gray-600">
//                 {prediction.precautions.map((p, i) => (
//                   <li key={i}>{p}</li>
//                 ))}
//               </ul>
//             </>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SymptomChecker;

import React, { useState } from "react";
import { Search, AlertCircle, CheckCircle, Activity } from "lucide-react";

const SymptomChecker = () => {
  const [symptoms, setSymptoms] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkSymptoms = async () => {
    setLoading(true);
    const symptomList = symptoms.split(",").map((s) => s.trim());
    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptoms: symptomList }),
      });
      const data = await response.json();
      setPrediction(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        <div className="space-y-6">
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
            <label className="block text-blue-300 font-semibold mb-3 flex items-center gap-2">
              <Search className="w-4 h-4" /> Enter Symptoms
            </label>
            <textarea
              className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
              rows="3"
              placeholder="e.g. itching, skin_rash, stomach_pain (comma separated)"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
            ></textarea>
            <button
              onClick={checkSymptoms}
              disabled={loading || !symptoms}
              className="w-full mt-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-emerald-500/20 transition-all disabled:opacity-50"
            >
              {loading ? "Analyzing Bio-Data..." : "Run Diagnosis Analysis"}
            </button>
          </div>

          {prediction && (
            <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden animate-fade-in">
              {/* Glowing Background Effect */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

              {prediction.error ? (
                <div className="text-red-400 flex items-center gap-2 font-bold p-4 bg-red-500/10 rounded-lg border border-red-500/20">
                  <AlertCircle /> {prediction.error}
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-start mb-6 border-b border-white/10 pb-4">
                    <div>
                      <h3 className="text-gray-400 text-sm font-bold uppercase tracking-widest">
                        Diagnosis Result
                      </h3>
                      <p className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mt-1">
                        {prediction.predicted_disease}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="block text-xs text-gray-500 uppercase">
                        Confidence
                      </span>
                      <span className="inline-block bg-emerald-500/20 text-emerald-400 font-mono px-2 py-1 rounded text-sm border border-emerald-500/30">
                        {prediction.confidence_score}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-300 leading-relaxed mb-6 italic border-l-4 border-blue-500 pl-4">
                    "{prediction.description}"
                  </p>

                  <div>
                    <h4 className="text-emerald-400 font-bold mb-3 flex items-center gap-2">
                      <Activity className="w-5 h-5" /> Recommended Precautions
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {prediction.precautions.map((p, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-3 bg-white/5 p-3 rounded-lg border border-white/5"
                        >
                          <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                          <span className="text-gray-200 text-sm capitalize">
                            {p}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SymptomChecker;

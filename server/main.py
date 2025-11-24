# || .vnev server start -> source .venv/Scripts/activate ||*************************
# || for sever start ->  uvicorn main:app --reload       ||*******************************


# from fastapi import FastAPI, HTTPException
# from pydantic import BaseModel
# import tensorflow as tf
# import joblib
# import numpy as np
# import pandas as pd

# # 1. Load the Trained Model and Tools
# print("Loading model and feature data...")
# try:
#     model = tf.keras.models.load_model('healthcare_model.keras')
#     label_encoder = joblib.load('label_encoder.pkl')
#     features = joblib.load('features.pkl') # This is the list of 132 symptoms
#     print("✅ Model loaded successfully!")
# except Exception as e:
#     print(f"❌ Error loading model files: {e}")
#     print("Did you copy the .keras and .pkl files into the 'server' folder?")
#     exit()

# # 2. Initialize FastAPI
# app = FastAPI()

# # 3. Define what the User sends us
# class SymptomRequest(BaseModel):
#     symptoms: list[str] # Expects a list like ["itching", "fever"]

# @app.get("/")
# def home():
#     return {"message": "Healthcare Chatbot API is Running!"}

# @app.post("/predict")
# def predict_disease(request: SymptomRequest):
#     try:
#         # Step A: Convert user's list of strings into the 132-length vector
#         # Create a vector of all zeros (assuming no symptoms initially)
#         input_vector = pd.DataFrame(0, index=[0], columns=features)
        
#         # Mark the user's symptoms as 1
#         found_symptoms = []
#         for symptom in request.symptoms:
#             # Clean the input (strip spaces)
#             symptom = symptom.strip()
#             if symptom in features:
#                 input_vector[symptom] = 1
#                 found_symptoms.append(symptom)
#             else:
#                 print(f"Warning: Symptom '{symptom}' not found in training data.")

#         if not found_symptoms:
#             return {"error": "None of the provided symptoms match our database."}

#         # Step B: Make the Prediction
#         # Ensure correct type (float32) for TensorFlow
#         input_data = input_vector.values.astype('float32')
        
#         prediction = model.predict(input_data)
        
#         # Step C: Get the top result
#         predicted_class_index = np.argmax(prediction)
#         predicted_disease = label_encoder.inverse_transform([predicted_class_index])[0]
#         confidence = float(np.max(prediction))

#         return {
#             "predicted_disease": predicted_disease,
#             "confidence_score": f"{confidence * 100:.2f}%",
#             "symptoms_processed": found_symptoms
#         }

#     except Exception as e:
#         return {"error": str(e)}

# # Run this file with: uvicorn main:app --reload


# chat_data test api ____________________________________________________________-

# from fastapi import FastAPI, HTTPException
# from pydantic import BaseModel
# import tensorflow as tf
# import joblib
# import numpy as np
# import pandas as pd
# import spacy
# from sklearn.metrics.pairwise import cosine_similarity

# # 1. Load All Models (Disease + Chat)
# print("Loading all models... (This might take a moment)")

# # A. Disease Models
# try:
#     disease_model = tf.keras.models.load_model('healthcare_model.keras')
#     label_encoder = joblib.load('label_encoder.pkl')
#     features = joblib.load('features.pkl') 
#     print("✅ Disease Model Loaded")
# except Exception as e:
#     print(f"❌ Error loading Disease Model: {e}")

# # B. Chat Models
# try:
#     nlp = spacy.load("en_core_web_sm")
#     chat_vectors = joblib.load('chat_vectors.pkl')
#     chat_data = joblib.load('chat_data_storage.pkl')
#     print("✅ Chat Model Loaded")
# except Exception as e:
#     print(f"❌ Error loading Chat Model: {e}")

# # 2. Initialize FastAPI
# app = FastAPI()

# # 3. Define Input Formats
# class SymptomRequest(BaseModel):
#     symptoms: list[str]

# class ChatRequest(BaseModel):
#     message: str

# @app.get("/")
# def home():
#     return {"message": "Healthcare Chatbot API is Live!"}

# # --- ENDPOINT 1: DISEASE PREDICTION ---
# @app.post("/predict")
# def predict_disease(request: SymptomRequest):
#     try:
#         input_vector = pd.DataFrame(0, index=[0], columns=features)
#         found_symptoms = []
        
#         for symptom in request.symptoms:
#             symptom = symptom.strip()
#             if symptom in features:
#                 input_vector[symptom] = 1
#                 found_symptoms.append(symptom)
        
#         if not found_symptoms:
#             return {"error": "No matching symptoms found."}

#         input_data = input_vector.values.astype('float32')
#         prediction = disease_model.predict(input_data)
        
#         predicted_class_index = np.argmax(prediction)
#         predicted_disease = label_encoder.inverse_transform([predicted_class_index])[0]
#         confidence = float(np.max(prediction))

#         return {
#             "predicted_disease": predicted_disease,
#             "confidence_score": f"{confidence * 100:.2f}%",
#             "symptoms_processed": found_symptoms
#         }
#     except Exception as e:
#         return {"error": str(e)}

# # --- ENDPOINT 2: CHAT WITH DOCTOR ---
# @app.post("/chat")
# def chat_with_bot(request: ChatRequest):
#     try:
#         user_text = request.message
        
#         # 1. Convert user text to vector
#         user_vector = nlp(user_text).vector.reshape(1, -1)
        
#         # 2. Find the most similar question in our database
#         # ( compare user_vector vs ALL 100k saved vectors)
#         similarities = cosine_similarity(user_vector, chat_vectors)
        
#         # 3. Get the best match
#         closest_index = np.argmax(similarities)
#         best_score = similarities[0][closest_index]
        
#         # 4. Return answer if similarity is good enough
#         if best_score > 0.7: # 70% confidence threshold
#             answer = chat_data.iloc[closest_index]['Answer']
#             return {"response": answer, "confidence": float(best_score)}
#         else:
#             return {
#                 "response": "I'm not sure I understand. Could you describe your symptoms in more detail?",
#                 "confidence": float(best_score)
#             }

#     except Exception as e:
#         return {"error": str(e)}

# # Run with: uvicorn main:app --reload



# this is update and setup cross validation------------------------------------------------------------
# from fastapi import FastAPI, HTTPException
# from fastapi.middleware.cors import CORSMiddleware # <--- IMPORT THIS
# from pydantic import BaseModel
# import tensorflow as tf
# import joblib
# import numpy as np
# import pandas as pd
# import spacy
# from sklearn.metrics.pairwise import cosine_similarity

# # 1. Load All Models
# print("Loading all models...")
# try:
#     # Disease Model
#     disease_model = tf.keras.models.load_model('healthcare_model.keras')
#     label_encoder = joblib.load('label_encoder.pkl')
#     features = joblib.load('features.pkl') 
    
#     # Chat Model
#     nlp = spacy.load("en_core_web_sm")
#     chat_vectors = joblib.load('chat_vectors.pkl')
#     chat_data = joblib.load('chat_data_storage.pkl')
#     print("✅ All Models Loaded Successfully!")
# except Exception as e:
#     print(f"❌ Error loading models: {e}")
#     print("Please check if files exist in the server folder.")

# # 2. Initialize App
# app = FastAPI()

# # 3. ENABLE CORS (Connect Frontend to Backend)
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"], # Allows React (localhost:5173) to connect
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # 4. Define Inputs
# class SymptomRequest(BaseModel):
#     symptoms: list[str]

# class ChatRequest(BaseModel):
#     message: str

# @app.get("/")
# def home():
#     return {"message": "Healthcare Chatbot API is Live!"}

# # --- ENDPOINT 1: PREDICT DISEASE (The Specialist) ---
# @app.post("/predict")
# def predict_disease(request: SymptomRequest):
#     try:
#         input_vector = pd.DataFrame(0, index=[0], columns=features)
#         found_symptoms = []
#         for symptom in request.symptoms:
#             symptom = symptom.strip()
#             if symptom in features:
#                 input_vector[symptom] = 1
#                 found_symptoms.append(symptom)
        
#         if not found_symptoms:
#             return {"error": "No matching symptoms found."}

#         input_data = input_vector.values.astype('float32')
#         prediction = disease_model.predict(input_data)
#         predicted_class_index = np.argmax(prediction)
#         predicted_disease = label_encoder.inverse_transform([predicted_class_index])[0]
#         confidence = float(np.max(prediction))

#         return {
#             "predicted_disease": predicted_disease,
#             "confidence_score": f"{confidence * 100:.2f}%",
#             "symptoms_processed": found_symptoms
#         }
#     except Exception as e:
#         return {"error": str(e)}

# # --- ENDPOINT 2: CHAT (The Receptionist) ---
# @app.post("/chat")
# def chat_with_bot(request: ChatRequest):
#     try:
#         user_text = request.message.lower()
        
#         # --- GUARDRAIL 1: GREETINGS ---
#         if user_text in ["hi", "hello", "hey", "greetings", "sup", "what's up"]:
#             return {"response": "Hello! I am your AI Health Assistant. How can I help?", "confidence": 1.0}

#         if "name" in user_text and "your" in user_text:
#              return {"response": "I am a Healthcare Chatbot trained to help you with symptoms.", "confidence": 1.0}

#         # --- GUARDRAIL 2: TRAP SYMPTOMS ---
#         symptom_keywords = [
#             "pain", "ache", "stomach", "headache", "fever", "cough", 
#             "cold", "vomit", "rash", "skin", "itch", "swelling", 
#             "bleed", "hurt", "suffer", "flu", "disease"
#         ]
        
#         if any(word in user_text for word in symptom_keywords):
#              return {
#                 "response": "⚠️ It sounds like you are describing medical symptoms. I cannot diagnose you through chat. Please use the 'Check Symptoms' feature for an accurate diagnosis.",
#                 "confidence": 1.0
#             }

#         # --- NLP MATCHING (General Questions) ---
#         user_vector = nlp(user_text).vector.reshape(1, -1)
#         similarities = cosine_similarity(user_vector, chat_vectors)
#         closest_index = np.argmax(similarities)
#         best_score = similarities[0][closest_index]
        
#         if best_score > 0.65: 
#             answer = chat_data.iloc[closest_index]['Answer']
#             return {"response": answer, "confidence": float(best_score)}
#         else:
#             return {
#                 "response": "I'm not sure I understand. I can help with general health questions, but for diagnosis, please use the Symptom Checker.",
#                 "confidence": float(best_score)
#             }

#     except Exception as e:
#         return {"error": str(e)}


# # updated code -------------------------------------------------------------------
# from fastapi import FastAPI, HTTPException
# from fastapi.middleware.cors import CORSMiddleware
# from pydantic import BaseModel
# import tensorflow as tf
# import joblib
# import numpy as np
# import pandas as pd
# import random

# # ==========================================================
# # 1. LOAD ALL MODELS (The Brains) 🧠
# # ==========================================================
# print("Loading System Models...")

# try:
#     # --- A. LOAD DISEASE SPECIALIST (Existing) ---
#     disease_model = tf.keras.models.load_model('healthcare_model.keras')
#     disease_label_encoder = joblib.load('label_encoder.pkl')
#     disease_features = joblib.load('features.pkl') 
#     print("✅ Disease Specialist Loaded")

#     # --- B. LOAD CHATBOT (New Deep Learning Model) ---
#     chat_model = tf.keras.models.load_model('chat_model.keras')
#     chat_tokenizer = joblib.load('chat_tokenizer.pkl')
#     chat_lbl_encoder = joblib.load('chat_label_encoder.pkl')
#     chat_responses = joblib.load('chat_responses.pkl')
#     print("✅ Deep Learning Chatbot Loaded")

# except Exception as e:
#     print(f"❌ CRITICAL ERROR loading models: {e}")
#     print("Did you copy the 4 new chat files into the 'server' folder?")
#     exit()

# # ==========================================================
# # 2. SETUP SERVER
# # ==========================================================
# app = FastAPI()

# # Enable connection to React
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# class SymptomRequest(BaseModel):
#     symptoms: list[str]

# class ChatRequest(BaseModel):
#     message: str

# @app.get("/")
# def home():
#     return {"message": "Deep Learning Healthcare API is Live!"}

# # ==========================================================
# # 3. ENDPOINT: CHECK SYMPTOMS (The Specialist)
# # ==========================================================
# @app.post("/predict")
# def predict_disease(request: SymptomRequest):
#     try:
#         input_vector = pd.DataFrame(0, index=[0], columns=disease_features)
#         found_symptoms = []
#         for symptom in request.symptoms:
#             symptom = symptom.strip()
#             if symptom in disease_features:
#                 input_vector[symptom] = 1
#                 found_symptoms.append(symptom)
        
#         if not found_symptoms:
#             return {"error": "No matching symptoms found."}

#         input_data = input_vector.values.astype('float32')
#         prediction = disease_model.predict(input_data)
#         predicted_class_index = np.argmax(prediction)
#         predicted_disease = disease_label_encoder.inverse_transform([predicted_class_index])[0]
#         confidence = float(np.max(prediction))

#         return {
#             "predicted_disease": predicted_disease,
#             "confidence_score": f"{confidence * 100:.2f}%",
#             "symptoms_processed": found_symptoms
#         }
#     except Exception as e:
#         return {"error": str(e)}

# # ==========================================================
# # 4. ENDPOINT: CHAT (The Deep Learning Bot)
# # ==========================================================
# @app.post("/chat")
# def chat_with_bot(request: ChatRequest):
#     try:
#         user_text = request.message
#         max_len = 20 # MUST match the training script value
        
#         # 1. Preprocess the text (Tokenize & Pad)
#         # Convert "Hello" -> [4, 0, 0, ...]
#         seq = chat_tokenizer.texts_to_sequences([user_text])
#         padded = tf.keras.preprocessing.sequence.pad_sequences(seq, truncating='post', maxlen=max_len)
        
#         # 2. Ask the Neural Network
#         result = chat_model.predict(padded)
        
#         # 3. Find the highest probability tag
#         tag_index = np.argmax(result)
#         tag = chat_lbl_encoder.inverse_transform([tag_index])[0]
#         confidence = float(np.max(result))
        
#         print(f"User: {user_text} | Predicted Intent: {tag} | Conf: {confidence}")

#         # 4. Pick a response
#         if confidence > 0.5: # If the bot is at least 50% sure
#             response_text = random.choice(chat_responses[tag])
#             return {"response": response_text, "confidence": confidence}
#         else:
#             return {
#                 "response": "I'm not sure I understand. Try asking 'Hello' or 'I have symptoms'.", 
#                 "confidence": confidence
#             }

#     except Exception as e:
#         return {"error": str(e)}


# updated code -> descreption and precatption--------------------------
# from fastapi import FastAPI, HTTPException
# from fastapi.middleware.cors import CORSMiddleware
# from pydantic import BaseModel
# import tensorflow as tf
# import joblib
# import numpy as np
# import pandas as pd
# import random

# # ==========================================================
# # 1. LOAD ALL MODELS (The Brains) 🧠
# # ==========================================================
# print("Loading System Models...")

# try:
#     # A. Disease Specialist
#     disease_model = tf.keras.models.load_model('healthcare_model.keras')
#     disease_label_encoder = joblib.load('label_encoder.pkl')
#     disease_features = joblib.load('features.pkl') 
#     print("✅ Disease Specialist Loaded")

#     # B. Chatbot (Deep Learning)
#     chat_model = tf.keras.models.load_model('chat_model.keras')
#     chat_tokenizer = joblib.load('chat_tokenizer.pkl')
#     chat_lbl_encoder = joblib.load('chat_label_encoder.pkl')
#     chat_responses = joblib.load('chat_responses.pkl')
#     print("✅ Deep Learning Chatbot Loaded")

#     # C. LOAD KNOWLEDGE BASE (CSV Files) 📚
#     # These contain the "Textbook" info about diseases
#     description_df = pd.read_csv('symptom_Description.csv')
#     precaution_df = pd.read_csv('symptom_precaution.csv')
#     print("✅ Medical Knowledge Base Loaded")

# except Exception as e:
#     print(f"❌ CRITICAL ERROR: {e}")
#     print("Missing files! Make sure 'symptom_Description.csv' and 'symptom_precaution.csv' are in the server folder.")
#     exit()

# # Helper Function to get details
# def get_disease_info(disease_name):
#     # Get Description
#     desc = description_df[description_df['Disease'] == disease_name]['Description']
#     desc = desc.values[0] if len(desc) > 0 else "No description available."
    
#     # Get Precautions
#     prec = precaution_df[precaution_df['Disease'] == disease_name]
#     if len(prec) > 0:
#         # Get the 4 columns (Precaution_1 to 4)
#         prec_list = prec.iloc[0, 1:].dropna().tolist()
#     else:
#         prec_list = ["Consult a doctor"]
        
#     return desc, prec_list

# # ==========================================================
# # 2. SETUP SERVER
# # ==========================================================
# app = FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# class SymptomRequest(BaseModel):
#     symptoms: list[str]

# class ChatRequest(BaseModel):
#     message: str

# @app.get("/")
# def home():
#     return {"message": "Advanced Healthcare API is Live!"}

# # ==========================================================
# # 3. ENDPOINT: CHECK SYMPTOMS (Updated 💊)
# # ==========================================================
# @app.post("/predict")
# def predict_disease(request: SymptomRequest):
#     try:
#         input_vector = pd.DataFrame(0, index=[0], columns=disease_features)
#         found_symptoms = []
#         for symptom in request.symptoms:
#             symptom = symptom.strip()
#             if symptom in disease_features:
#                 input_vector[symptom] = 1
#                 found_symptoms.append(symptom)
        
#         if not found_symptoms:
#             return {"error": "No matching symptoms found."}

#         input_data = input_vector.values.astype('float32')
#         prediction = disease_model.predict(input_data)
#         predicted_class_index = np.argmax(prediction)
#         predicted_disease = disease_label_encoder.inverse_transform([predicted_class_index])[0]
#         confidence = float(np.max(prediction))

#         # --- FETCH EXTRA INFO ---
#         description, precautions = get_disease_info(predicted_disease)

#         return {
#             "predicted_disease": predicted_disease,
#             "confidence_score": f"{confidence * 100:.2f}%",
#             "symptoms_processed": found_symptoms,
#             "description": description,     # <--- New Field
#             "precautions": precautions      # <--- New Field
#         }
#     except Exception as e:
#         return {"error": str(e)}

# # ==========================================================
# # 4. ENDPOINT: CHAT
# # ==========================================================
# @app.post("/chat")
# def chat_with_bot(request: ChatRequest):
#     try:
#         user_text = request.message
#         max_len = 20
#         seq = chat_tokenizer.texts_to_sequences([user_text])
#         padded = tf.keras.preprocessing.sequence.pad_sequences(seq, truncating='post', maxlen=max_len)
#         result = chat_model.predict(padded)
#         tag_index = np.argmax(result)
#         tag = chat_lbl_encoder.inverse_transform([tag_index])[0]
#         confidence = float(np.max(result))
        
#         if confidence > 0.5:
#             response_text = random.choice(chat_responses[tag])
#             return {"response": response_text, "confidence": confidence}
#         else:
#             return {"response": "I'm not sure I understand. Try asking about 'symptoms' or say 'Hello'.", "confidence": confidence}

#     except Exception as e:
#         return {"error": str(e)}


# ------------------------------smart bot--------------------------------------------
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import tensorflow as tf
import joblib
import numpy as np
import pandas as pd
import random
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# ==========================================================
# 1. LOAD ALL MODELS & DATA 🧠
# ==========================================================
print("⏳ Loading System Models... (This may take 30 seconds)")

try:
    # --- A. Disease Specialist ---
    disease_model = tf.keras.models.load_model('healthcare_model.keras')
    disease_label_encoder = joblib.load('label_encoder.pkl')
    disease_features = joblib.load('features.pkl') 
    print("✅ Disease Specialist Loaded")

    # --- B. Social Chatbot (Deep Learning) ---
    chat_model = tf.keras.models.load_model('chat_model.keras')
    chat_tokenizer = joblib.load('chat_tokenizer.pkl')
    chat_lbl_encoder = joblib.load('chat_label_encoder.pkl')
    chat_responses = joblib.load('chat_responses.pkl')
    print("✅ Social Neural Network Loaded")
    
    # Force clear memory before loading the CSV
    import gc
    gc.collect()

    # --- C. Medical Knowledge Base (TF-IDF) ---
    # This loads your 50k rows!
    print("⏳ Loading Medical Database (50k rows)...")
    doc_db = pd.read_csv('doctor_knowledge_base.csv')
    
    # Train the Search Engine instantly
    vectorizer = TfidfVectorizer(stop_words='english') # Remove common words like 'the', 'is'
    tfidf_matrix = vectorizer.fit_transform(doc_db['Question'].values.astype('U'))
    print("✅ Medical Search Engine Ready!")

except Exception as e:
    print(f"❌ CRITICAL ERROR: {e}")
    print("Make sure all .keras, .pkl, and .csv files are in the server folder.")
    exit()

# Helper: Get Disease Info
description_df = pd.read_csv('symptom_Description.csv')
precaution_df = pd.read_csv('symptom_precaution.csv')

def get_disease_info(disease_name):
    desc = description_df[description_df['Disease'] == disease_name]['Description']
    desc = desc.values[0] if len(desc) > 0 else "No description available."
    prec = precaution_df[precaution_df['Disease'] == disease_name]
    prec_list = prec.iloc[0, 1:].dropna().tolist() if len(prec) > 0 else ["Consult a doctor"]
    return desc, prec_list

# ==========================================================
# 2. SETUP SERVER
# ==========================================================
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SymptomRequest(BaseModel):
    symptoms: list[str]

class ChatRequest(BaseModel):
    message: str

@app.get("/")
def home():
    return {"message": "Ultimate Hybrid Healthcare API is Live!"}

# ==========================================================
# 3. ENDPOINT: DIAGNOSIS (Strict Logic)
# ==========================================================
@app.post("/predict")
def predict_disease(request: SymptomRequest):
    try:
        input_vector = pd.DataFrame(0, index=[0], columns=disease_features)
        found_symptoms = []
        for symptom in request.symptoms:
            symptom = symptom.strip()
            if symptom in disease_features:
                input_vector[symptom] = 1
                found_symptoms.append(symptom)
        
        if not found_symptoms:
            return {"error": "No matching symptoms found."}

        input_data = input_vector.values.astype('float32')
        prediction = disease_model.predict(input_data)
        predicted_class_index = np.argmax(prediction)
        predicted_disease = disease_label_encoder.inverse_transform([predicted_class_index])[0]
        confidence = float(np.max(prediction))
        description, precautions = get_disease_info(predicted_disease)

        return {
            "predicted_disease": predicted_disease,
            "confidence_score": f"{confidence * 100:.2f}%",
            "symptoms_processed": found_symptoms,
            "description": description,
            "precautions": precautions
        }
    except Exception as e:
        return {"error": str(e)}

# ==========================================================
# 4. ENDPOINT: HYBRID CHAT (The Smart Brain) 🧠
# ==========================================================
@app.post("/chat")
def chat_with_bot(request: ChatRequest):
    try:
        user_text = request.message.lower()
        
        # --- LAYER 1: Social Intents ---
        max_len = 20
        seq = chat_tokenizer.texts_to_sequences([user_text])
        padded = tf.keras.preprocessing.sequence.pad_sequences(seq, truncating='post', maxlen=max_len)
        result = chat_model.predict(padded)
        tag_index = np.argmax(result)
        tag = chat_lbl_encoder.inverse_transform([tag_index])[0]
        confidence = float(np.max(result))
        
        if confidence > 0.8: 
            response_text = random.choice(chat_responses[tag])
            return {"response": response_text}

        # --- LAYER 2: Medical Knowledge (TF-IDF Search) ---
        user_vec = vectorizer.transform([user_text])
        similarities = cosine_similarity(user_vec, tfidf_matrix)
        
        best_match_index = similarities.argmax()
        best_match_score = similarities[0, best_match_index]
        
        # Print the score to the terminal so we can see it!
        print(f"User: '{user_text}' | Match Score: {best_match_score}")

        # LOWER THRESHOLD: Changed from 0.1 to 0.05
        if best_match_score > 0.05:
            doctor_reply = doc_db.iloc[best_match_index]['Answer']
            if len(doctor_reply) > 400:
                doctor_reply = doctor_reply[:400] + "..."
            return {"response": doctor_reply}
        
        # --- LAYER 3: Fallback ---
        return {
            "response": "I'm not sure about that specific condition. Please use the 'Check Symptoms' tab for a detailed diagnosis."
        }

    except Exception as e:
        return {"error": str(e)}
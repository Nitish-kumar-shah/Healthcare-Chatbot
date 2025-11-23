import json
import numpy as np
import tensorflow as tf
from tensorflow import keras
from sklearn.preprocessing import LabelEncoder
import joblib

# 1. Load the Intents Data
print("Loading intents data...")

# 👇 THIS "encoding='utf-8'" PART FIXES THE EMOJIS!
with open('intents.json', encoding='utf-8') as file:
    data = json.load(file)

training_sentences = []
training_labels = []
labels = []
responses = {}

# Organize the data
for intent in data['intents']:
    for pattern in intent['patterns']:
        training_sentences.append(pattern)
        training_labels.append(intent['tag'])
    responses[intent['tag']] = intent['responses']
    
    if intent['tag'] not in labels:
        labels.append(intent['tag'])

# 2. Text Preprocessing (Tokenization)
# We turn words into numbers (Vectors)
vocab_size = 1000
embedding_dim = 16
max_len = 20
oov_token = "<OOV>" # Used for words the bot hasn't seen before

tokenizer = tf.keras.preprocessing.text.Tokenizer(num_words=vocab_size, oov_token=oov_token)
tokenizer.fit_on_texts(training_sentences)
word_index = tokenizer.word_index
sequences = tokenizer.texts_to_sequences(training_sentences)
padded_sequences = tf.keras.preprocessing.sequence.pad_sequences(sequences, truncating='post', maxlen=max_len)

# Encode labels (greeting -> 0, goodbye -> 1, etc.)
lbl_encoder = LabelEncoder()
lbl_encoder.fit(training_labels)
training_labels = lbl_encoder.transform(training_labels)

# 3. Build the Neural Network (The Brain)
print("Building Neural Network...")
model = keras.Sequential([
    keras.layers.Embedding(vocab_size, embedding_dim, input_length=max_len),
    keras.layers.GlobalAveragePooling1D(),
    keras.layers.Dense(16, activation='relu'), # Hidden Layer
    keras.layers.Dense(16, activation='relu'), # Hidden Layer
    keras.layers.Dense(len(labels), activation='softmax') # Output Layer
])

model.compile(loss='sparse_categorical_crossentropy', optimizer='adam', metrics=['accuracy'])

# 4. Train the Model
print("Training Chat Model...")
model.fit(padded_sequences, np.array(training_labels), epochs=500, verbose=1)

# 5. Save Everything
print("Saving model files...")
model.save("chat_model.keras")

# We need to save these 3 helpers to understand users later
joblib.dump(tokenizer, "chat_tokenizer.pkl")
joblib.dump(lbl_encoder, "chat_label_encoder.pkl")
joblib.dump(responses, "chat_responses.pkl")

print("✅ Success! Deep Learning Chat Model Trained.")
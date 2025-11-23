import pandas as pd

# 1. Load the JSON file
print("Loading HealthCareMagic JSON data...")
try:
    # ⚠️ Make sure the file name matches exactly what you downloaded
    df = pd.read_json('HealthCareMagic-100k.json') 
except ValueError:
    print("❌ Error: Could not read JSON. Is the file name correct?")
    exit()
except FileNotFoundError:
    print("❌ File not found! Make sure 'HealthCareMagic-100k.json' is in the server folder.")
    exit()

# 2. Inspect & Fix Columns
# JSON datasets usually have 'instruction' (User) and 'output' (Doctor)
print("Original Columns:", df.columns)

# Rename to our standard format
if 'instruction' in df.columns:
    df = df.rename(columns={'instruction': 'Question', 'output': 'Answer'})
elif 'input' in df.columns:
    df = df.rename(columns={'input': 'Question', 'output': 'Answer'})

# 3. Take the top 50,000 rows 🚀
# (If your laptop is slow later, change this back to 30000)
df_small = df.head(25000)[['Question', 'Answer']]

# 4. Clean the text
print("Cleaning text...")
# Convert to lowercase for better searching
df_small['Question'] = df_small['Question'].fillna("").astype(str).str.lower()
df_small['Answer'] = df_small['Answer'].fillna("").astype(str)

# 5. Save as a fast CSV for the Server to use
df_small.to_csv('doctor_knowledge_base.csv', index=False)
print(f"✅ Success! Converted JSON to CSV with {len(df_small)} conversations.")
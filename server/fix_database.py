import pandas as pd
import os

json_file = 'HealthCareMagic-100k.json'
csv_output = 'doctor_knowledge_base.csv'

print(f"📂 Reading {json_file}...")

if not os.path.exists(json_file):
    print(f"❌ Error: {json_file} not found!")
    exit()

try:
    df = pd.read_json(json_file)
except ValueError:
    df = pd.read_json(json_file, lines=True)

print(f"🔍 Original Columns: {list(df.columns)}")

# --- THE FIX IS HERE ---
# We force it to use 'input' as the Question, because 'instruction' is junk.
rename_map = {
    'input': 'Question',  # <--- This is the real patient question
    'output': 'Answer'    # <--- This is the doctor's reply
}

# Drop 'instruction' if it exists so it doesn't confuse us
if 'instruction' in df.columns:
    df = df.drop(columns=['instruction'])

df = df.rename(columns=rename_map)

# Take top 25,000 rows (Since you are using 25k)
print("🧹 Cleaning data...")
df_small = df.head(25000)[['Question', 'Answer']]
df_small['Question'] = df_small['Question'].fillna("").astype(str).str.lower()
df_small['Answer'] = df_small['Answer'].fillna("").astype(str)

# Save
df_small.to_csv(csv_output, index=False)
print(f"✅ SUCCESS! Created {csv_output} with {len(df_small)} rows.")
print("👉 Now run 'python check_brain.py' to verify!")
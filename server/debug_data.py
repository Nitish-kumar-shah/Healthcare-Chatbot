import pandas as pd
import os

print("Checking file...")
file_path = 'doctor_knowledge_base.csv'

if not os.path.exists(file_path):
    print("❌ Error: The CSV file is missing!")
    exit()

df = pd.read_csv(file_path)
print(f"✅ Loaded {len(df)} rows.")

print("\n--- Sample Questions (First 5) ---")
print(df['Question'].head())

print("\n--- Checking for 'fever' ---")
fever_count = df['Question'].str.contains('fever', case=False).sum()
print(f"Found the word 'fever' in {fever_count} rows.")
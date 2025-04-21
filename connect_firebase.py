import firebase_admin
from firebase_admin import credentials, firestore
import pandas as pd

# 1. Connect to Firebase
cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred)
db = firestore.client()
print("✅ Connected to Firebase")

# 2. Load Crop Data from Firestore
crops_ref = db.collection('crops')
docs = crops_ref.stream()

crop_data = []
for doc in docs:
    data = doc.to_dict()
    crop_data.append(data)

# Convert to pandas DataFrame
df = pd.DataFrame(crop_data)

# Show loaded data
if df.empty:
    print("⚠️ No data found in 'crops' collection.")
else:
    print("📦 Crop data loaded:")
    print(df.head())  # just print the first few rows


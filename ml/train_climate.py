import pandas as pd
import numpy as np
import joblib

from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestRegressor
from sklearn.multioutput import MultiOutputRegressor
from sklearn.metrics import (
    r2_score,
    mean_absolute_error,
    mean_squared_error
)

# ============================================================
# LOAD DATASET
# ============================================================

print("=" * 60)
print("LOADING DATASET")
print("=" * 60)

df = pd.read_csv("datasets/nasa_climate_lag5.csv")

print("Dataset Loaded Successfully!")
print(f"Shape : {df.shape}")

# ============================================================
# ENCODE COUNTRY
# ============================================================

encoder = LabelEncoder()

df["ISO_Code"] = encoder.fit_transform(df["ISO_Code"])

# ============================================================
# TIME-BASED SPLIT
# Last 5 Years = Test
# ============================================================

last_year = df["Year"].max()

train = df[df["Year"] < last_year - 4]

test = df[df["Year"] >= last_year - 4]

print("\n" + "=" * 60)
print("TRAIN / TEST INFORMATION")
print("=" * 60)

print(f"Training Years : {train['Year'].min()} - {train['Year'].max()}")
print(f"Testing Years  : {test['Year'].min()} - {test['Year'].max()}")

print(f"Training Samples : {len(train)}")
print(f"Testing Samples  : {len(test)}")

# ============================================================
# FEATURES
# ============================================================

feature_cols = [

    "ISO_Code",
    "Year",

    "Temp_Lag1",
    "Temp_Lag2",
    "Temp_Lag3",
    "Temp_Lag4",
    "Temp_Lag5",

    "Humidity_Lag1",
    "Humidity_Lag2",
    "Humidity_Lag3",
    "Humidity_Lag4",
    "Humidity_Lag5",

    "Wind_Lag1",
    "Wind_Lag2",
    "Wind_Lag3",
    "Wind_Lag4",
    "Wind_Lag5",

    "Solar_Lag1",
    "Solar_Lag2",
    "Solar_Lag3",
    "Solar_Lag4",
    "Solar_Lag5"

]

X_train = train[feature_cols]

X_test = test[feature_cols]

# ============================================================
# TARGETS
# ============================================================

target_cols = [

    "Temperature",
    "Humidity",
    "Wind_Speed",
    "Solar_Radiation"

]

y_train = train[target_cols]

y_test = test[target_cols]

# ============================================================
# MODEL
# ============================================================

print("\n" + "=" * 60)
print("TRAINING RANDOM FOREST")
print("=" * 60)

model = MultiOutputRegressor(

    RandomForestRegressor(

        n_estimators=300,

        random_state=42,

        n_jobs=-1

    )

)

model.fit(X_train, y_train)

print("Training Completed Successfully!")

# ============================================================
# PREDICTION
# ============================================================

pred = model.predict(X_test)

# ============================================================
# METRICS
# ============================================================

overall_r2 = r2_score(y_test, pred)

mae = mean_absolute_error(y_test, pred)

rmse = np.sqrt(mean_squared_error(y_test, pred))

print("\n" + "=" * 60)
print("OVERALL PERFORMANCE")
print("=" * 60)

print(f"Overall R² Score : {overall_r2:.4f}")
print(f"MAE              : {mae:.4f}")
print(f"RMSE             : {rmse:.4f}")

print("\n" + "=" * 60)
print("INDIVIDUAL R² SCORES")
print("=" * 60)

scores = {}

for i, column in enumerate(target_cols):

    score = r2_score(

        y_test.iloc[:, i],

        pred[:, i]

    )

    scores[column] = score

    print(f"{column:20s}: {score:.4f}")

# ============================================================
# SAVE RESULTS
# ============================================================

results = pd.DataFrame({

    "Metric": [

        "Overall_R2",

        "MAE",

        "RMSE"

    ],

    "Value": [

        overall_r2,

        mae,

        rmse

    ]

})

results.to_csv(

    "models/climate_model_results.csv",

    index=False

)

# ============================================================
# SAVE MODELS
# ============================================================

joblib.dump(

    model,

    "models/climate_model.pkl"

)

joblib.dump(

    encoder,

    "models/country_encoder.pkl"

)

joblib.dump(

    feature_cols,

    "models/feature_columns.pkl"

)

print("\n" + "=" * 60)
print("FILES SAVED SUCCESSFULLY")
print("=" * 60)

print("✔ climate_model.pkl")
print("✔ country_encoder.pkl")
print("✔ feature_columns.pkl")
print("✔ climate_model_results.csv")

print("\nClimate Model Training Completed Successfully!")
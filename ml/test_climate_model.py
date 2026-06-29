import pandas as pd
import joblib

# ============================================
# Load Saved Files
# ============================================

model = joblib.load("models/climate_model.pkl")
encoder = joblib.load("models/country_encoder.pkl")
feature_cols = joblib.load("models/feature_columns.pkl")

# ============================================
# Load Dataset
# ============================================

df = pd.read_csv("datasets/nasa_climate_lag5.csv")

# ============================================
# Select One Country
# ============================================

country = "IND"

country_data = df[df["ISO_Code"] == country]

# Take the latest available year
latest = country_data.sort_values("Year").iloc[-1]

print("Latest Available Data")
print(latest[["Year", "ISO_Code"]])

# ============================================
# Encode Country
# ============================================

encoded_country = encoder.transform([country])[0]

# ============================================
# Prepare Input
# ============================================

input_data = pd.DataFrame([{
    "ISO_Code": encoded_country,
    "Year": latest["Year"] + 1,

    "Temp_Lag1": latest["Temp_Lag1"],
    "Temp_Lag2": latest["Temp_Lag2"],
    "Temp_Lag3": latest["Temp_Lag3"],
    "Temp_Lag4": latest["Temp_Lag4"],
    "Temp_Lag5": latest["Temp_Lag5"],

    "Humidity_Lag1": latest["Humidity_Lag1"],
    "Humidity_Lag2": latest["Humidity_Lag2"],
    "Humidity_Lag3": latest["Humidity_Lag3"],
    "Humidity_Lag4": latest["Humidity_Lag4"],
    "Humidity_Lag5": latest["Humidity_Lag5"],

    "Wind_Lag1": latest["Wind_Lag1"],
    "Wind_Lag2": latest["Wind_Lag2"],
    "Wind_Lag3": latest["Wind_Lag3"],
    "Wind_Lag4": latest["Wind_Lag4"],
    "Wind_Lag5": latest["Wind_Lag5"],

    "Solar_Lag1": latest["Solar_Lag1"],
    "Solar_Lag2": latest["Solar_Lag2"],
    "Solar_Lag3": latest["Solar_Lag3"],
    "Solar_Lag4": latest["Solar_Lag4"],
    "Solar_Lag5": latest["Solar_Lag5"],
}])

# Keep the same feature order used during training
input_data = input_data[feature_cols]

# ============================================
# Prediction
# ============================================

prediction = model.predict(input_data)

print("\nPredicted Climate")
print("----------------------------")
print(f"Year : {int(latest['Year'] + 1)}")
print(f"Temperature     : {prediction[0][0]:.2f} °C")
print(f"Humidity        : {prediction[0][1]:.2f} %")
print(f"Wind Speed      : {prediction[0][2]:.2f} m/s")
print(f"Solar Radiation : {prediction[0][3]:.2f} MJ")
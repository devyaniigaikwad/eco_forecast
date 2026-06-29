import pandas as pd
import joblib

# ==========================================================
# LOAD MODEL & SUPPORTING FILES
# ==========================================================

model = joblib.load("models/climate_model.pkl")
encoder = joblib.load("models/country_encoder.pkl")
feature_cols = joblib.load("models/feature_columns.pkl")

# ==========================================================
# LOAD HISTORICAL DATA
# ==========================================================

df = pd.read_csv("datasets/nasa_climate_lag5.csv")


# ==========================================================
# FUTURE CLIMATE FORECAST FUNCTION
# ==========================================================

def predict_future_climate(country, target_year):

    # Get country data
    country_df = df[df["ISO_Code"] == country].copy()

    if country_df.empty:
        raise ValueError(f"No data found for country: {country}")

    # Sort by year
    country_df = country_df.sort_values("Year")

    # Latest available row
    latest = country_df.iloc[-1].copy()

    current_year = int(latest["Year"])

    if target_year <= current_year:
        raise ValueError(
            f"Target year must be greater than {current_year}"
        )

    # Encode country
    encoded_country = encoder.transform([country])[0]

    # ------------------------------------------------------
    # Initial Lag Values
    # ------------------------------------------------------

    temp_lags = [
        latest["Temperature"],
        latest["Temp_Lag1"],
        latest["Temp_Lag2"],
        latest["Temp_Lag3"],
        latest["Temp_Lag4"],
    ]

    humidity_lags = [
        latest["Humidity"],
        latest["Humidity_Lag1"],
        latest["Humidity_Lag2"],
        latest["Humidity_Lag3"],
        latest["Humidity_Lag4"],
    ]

    wind_lags = [
        latest["Wind_Speed"],
        latest["Wind_Lag1"],
        latest["Wind_Lag2"],
        latest["Wind_Lag3"],
        latest["Wind_Lag4"],
    ]

    solar_lags = [
        latest["Solar_Radiation"],
        latest["Solar_Lag1"],
        latest["Solar_Lag2"],
        latest["Solar_Lag3"],
        latest["Solar_Lag4"],
    ]

    # Store yearly predictions
    predictions = []

    # ------------------------------------------------------
    # Recursive Forecast
    # ------------------------------------------------------

    while current_year < target_year:

        current_year += 1

        input_df = pd.DataFrame([{

            "ISO_Code": encoded_country,
            "Year": current_year,

            "Temp_Lag1": temp_lags[0],
            "Temp_Lag2": temp_lags[1],
            "Temp_Lag3": temp_lags[2],
            "Temp_Lag4": temp_lags[3],
            "Temp_Lag5": temp_lags[4],

            "Humidity_Lag1": humidity_lags[0],
            "Humidity_Lag2": humidity_lags[1],
            "Humidity_Lag3": humidity_lags[2],
            "Humidity_Lag4": humidity_lags[3],
            "Humidity_Lag5": humidity_lags[4],

            "Wind_Lag1": wind_lags[0],
            "Wind_Lag2": wind_lags[1],
            "Wind_Lag3": wind_lags[2],
            "Wind_Lag4": wind_lags[3],
            "Wind_Lag5": wind_lags[4],

            "Solar_Lag1": solar_lags[0],
            "Solar_Lag2": solar_lags[1],
            "Solar_Lag3": solar_lags[2],
            "Solar_Lag4": solar_lags[3],
            "Solar_Lag5": solar_lags[4],

        }])

        # Keep feature order same as training
        input_df = input_df[feature_cols]

        prediction = model.predict(input_df)[0]

        temp = prediction[0]
        humidity = prediction[1]
        wind = prediction[2]
        solar = prediction[3]

        # Save prediction
        predictions.append({

            "Country": country,
            "Year": current_year,
            "Temperature": round(temp, 2),
            "Humidity": round(humidity, 2),
            "Wind_Speed": round(wind, 2),
            "Solar_Radiation": round(solar, 2)

        })

        # --------------------------------------------------
        # Update Lag Values
        # --------------------------------------------------

        temp_lags = [temp] + temp_lags[:4]
        humidity_lags = [humidity] + humidity_lags[:4]
        wind_lags = [wind] + wind_lags[:4]
        solar_lags = [solar] + solar_lags[:4]

    # Convert to DataFrame
    forecast = pd.DataFrame(predictions)

    return forecast


# ==========================================================
# EXAMPLE
# ==========================================================

forecast = predict_future_climate("IND", 2035)

print("\nFuture Climate Forecast")
print("=" * 80)

print(forecast)

# ==========================================================
# SAVE FORECAST
# ==========================================================

forecast.to_csv("models/future_climate_forecast.csv", index=False)

print("\nForecast saved successfully!")
print("File Name : future_climate_forecast.csv")
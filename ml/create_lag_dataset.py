import pandas as pd

# ===========================================
# Load NASA Dataset
# ===========================================

df = pd.read_csv("datasets/nasa_clean.csv")

# Sort by Country and Year
df = df.sort_values(["ISO_Code", "Year"])

# ===========================================
# Create 5-Year Lag Features
# ===========================================

for lag in range(1, 6):

    df[f"Temp_Lag{lag}"] = (
        df.groupby("ISO_Code")["Temperature"].shift(lag)
    )

    df[f"Humidity_Lag{lag}"] = (
        df.groupby("ISO_Code")["Humidity"].shift(lag)
    )

    df[f"Wind_Lag{lag}"] = (
        df.groupby("ISO_Code")["Wind_Speed"].shift(lag)
    )

    df[f"Solar_Lag{lag}"] = (
        df.groupby("ISO_Code")["Solar_Radiation"].shift(lag)
    )

# ===========================================
# Remove rows with missing lag values
# ===========================================

df = df.dropna().reset_index(drop=True)

# ===========================================
# Save New Dataset
# ===========================================

df.to_csv("datasets/nasa_climate_lag5.csv", index=False)

print("Dataset Created Successfully!")
print()

print("Shape :", df.shape)
print()

print(df.head())

print()
print("Columns:")
print(df.columns.tolist())
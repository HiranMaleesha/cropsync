import pandas as pd
from sklearn.linear_model import LinearRegression
import numpy as np
import matplotlib.pyplot as plt

# Simulated sales for the past 6 months (kg)
data = {
    'month': [1, 2, 3, 4, 5, 6],  # Let's say 1 = Jan, 2 = Feb, etc.
    'total_sales': [1200, 1300, 1250, 1400, 1450, 1500]
}

df = pd.DataFrame(data)


# Train a regression model to learn the trend
model = LinearRegression()
X = df[['month']]
y = df['total_sales']
model.fit(X, y)

# Predict next month's sales (month = 7)
next_month = np.array([[7]])
predicted_total_sales = model.predict(next_month)[0]
print(f"🔮 Predicted total crop sales for next month: {predicted_total_sales:.2f} kg")

# Example: farmer's land area = 10 acres, total crop area = 250 acres
farmer_area = 10
total_area = 250
plant_ratio = farmer_area / total_area
farmer_should_plant = plant_ratio * predicted_total_sales

print(f"👨‍🌾 This farmer should plant approximately: {farmer_should_plant:.2f} kg")

# Optional: visualize the sales trend
plt.plot(df['month'], df['total_sales'], marker='o', label='Historical Sales')
plt.plot([7], [predicted_total_sales], 'ro', label='Predicted Sales (Month 7)')
plt.xlabel("Month")
plt.ylabel("Total Sales (kg)")
plt.title("Monthly Crop Sales Prediction")
plt.legend()
plt.grid(True)
plt.show()

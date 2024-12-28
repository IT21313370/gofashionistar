import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

df = pd.read_csv('fashion_products.csv')


product_name_counts = df['Product Name'].value_counts()

plt.figure(figsize=(10, 6))
sns.barplot(x=product_name_counts.index, y=product_name_counts.values, palette='viridis')
plt.title('Counts of Each Product Type')
plt.xlabel('Product Name')
plt.ylabel('Count')
plt.xticks(rotation=90)  # Rotate x-axis labels for better readability
plt.tight_layout()       # Adjust layout to prevent clipping of labels
plt.show()

product_name_counts = product_name_counts.sort_values(ascending=False)

threshold = 5  # Minimum count to display separately
filtered_counts = product_name_counts[product_name_counts >= threshold]
other_count = product_name_counts[product_name_counts < threshold].sum()
filtered_counts['Other'] = other_count

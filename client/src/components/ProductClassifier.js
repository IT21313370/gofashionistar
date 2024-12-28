import React, { useState } from 'react';
import axios from 'axios';

function ProductClassifier() {
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  const classifyProduct = async () => {
    try {
      const response = await axios.post('http://localhost:5000/classify', { description });
      setCategory(response.data.category);
    } catch (error) {
      console.error('Error classifying product:', error);
    }
  };

  return (
    <div>
      <h1>Product Classifier</h1>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter product description"
      />
      <button onClick={classifyProduct}>Classify</button>
      {category && <p>Predicted Category: {category}</p>}
    </div>
  );
}

export default ProductClassifier;

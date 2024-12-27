import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddItem = () => {
  const [formData, setFormData] = useState({
    name: '',
    quantity: 0,
    price: 0,
  });

  const navigate=useNavigate()
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/items', formData);
      console.log('Item added successfully:', response.data);
       navigate("/")
    } catch (error) {
      console.error('Error adding item:', error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='name'
          placeholder='Name'
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type='number'
          name='quantity'
          placeholder='Quantity'
          value={formData.quantity}
          onChange={handleChange}
        />
        <input
          type='number'
          name='price'
          placeholder='Price'
          value={formData.price}
          onChange={handleChange}
        />
        <button type='submit'>Add the item</button>
    </form>
    </div>
  );
};

export default AddItem;

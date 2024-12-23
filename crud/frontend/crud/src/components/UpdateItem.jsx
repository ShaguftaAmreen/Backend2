import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateItem = () => {
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    price: '',
  });

  const { id } = useParams();  
  const navigate = useNavigate();

  
  useEffect(() => {
    axios
      .get(`http://localhost:5000/items/${id}`)
      .then((res) => {
        setFormData(res.data);  // Pre-fill form with existing item data
      })
      .catch((err) => {
        console.error('Error fetching item:', err);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/items/${id}`, formData);
      console.log('Item updated successfully:', response.data);

      // Navigate back to the single item page after update
      navigate(`/singleElement/${id}`);
    } catch (error) {
      console.error('Error updating item:', error.message);
    }
  };

  return (
    <div>
      <h2>Update Item</h2>
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
        <button type='submit'>Update the item</button>
      </form>
    </div>
  );
};

export default UpdateItem;

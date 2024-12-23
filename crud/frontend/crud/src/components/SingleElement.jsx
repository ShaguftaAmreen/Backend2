import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const SingleElement = () => {
  const { id } = useParams();  
  const [item, setItem] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/items/${id}`)
      .then((res) => {
        setItem(res.data);
      })
      .catch((err) => {
        console.error('Error fetching item:', err);
      });
  }, [id]);

  if (!item) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>{item.name}</h2>
      <p>Quantity: {item.quantity}</p>
      <p>Price: {item.price}</p>
      <Link to={`/updateItem/${item._id}`}><button>Update the Item</button></Link>
    </div>
  );
};

export default SingleElement;

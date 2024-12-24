import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const GetAllItems = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
     axios
      .get("http://localhost:5000/items/")
      .then((res) => {
        console.log("Fetched data:", res.data);
        setData(res.data);  
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });

  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/items/${id}`)
      .then((res) => {
        console.log("Item deleted:", res.data);
        setData(data.filter((item) => item._id !== id));
      })
      .catch((err) => {
        console.error("Error deleting item:", err);
      });
  };

  return (
    <div>
      <div>
        {data.length > 0 ? (
          data.map((ele) => {
            return (
              <div key={ele._id}>
                <Link
                  to={`/singleElement/${ele._id}`}
                  style={{ color: "black", textDecoration: "none" }}
                >
                  <h2>{ele.name}</h2>
                </Link>
                <span>Quantity: {ele.quantity}</span>
                <br />
                <span>Price: {ele.price}</span>
                <br />

                <button onClick={() => handleDelete(ele._id)}>
                  Delete The Item
                </button>
                </div>
            );
          })
        ) : (
          <h3>No items available</h3>
        )}
      </div>
    </div>
  );
};

export default GetAllItems;


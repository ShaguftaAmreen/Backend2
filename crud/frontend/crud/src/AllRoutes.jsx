import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SingleElement from './components/SingleElement';
import GetAllItems from './components/GetAllItems';
import AddItem from './components/AddItem';
import UpdateItem from './components/UpdateItem';

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<GetAllItems />} />
        <Route path="/addItem" element={<AddItem />} />
        <Route path="/singleElement/:id" element={<SingleElement />} />
        <Route path="/updateItem/:id" element={<UpdateItem/>} />
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </div>
  );
};

export default AllRoutes;

import React from 'react';
import { NavLink } from 'react-router-dom';
import '../App.css';
const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul className="list-unstyled">
        <li>
          <NavLink to={`/products`} className="active">
            Get All Products
          </NavLink>
        </li>
        <li>
        <NavLink to={`categories`} className="active">
            Get All Categories
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:9000/products');
        const data = response.data;
        // console.log(data);
        const uniqueCategories = [...new Set(data.map(product => product.category))];
        
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div>
  <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Categories</h1>
  <table style={{ width: '40%', borderCollapse: 'collapse' }}>
    <thead>
      <tr>
        <th style={{ border: '2px solid #ddd', padding: '8px',backgroundColor: '#2b2b2b', color: 'white'}}>Category</th>
      </tr>
    </thead>
    <tbody>
  {categories.map(category => (
    <tr key={category}>
      <td style={{ border: '2px solid #ddd', padding: '8px', textAlign: 'left', fontWeight: 'bold', backgroundColor: '#f2f2f2' }}>
        <NavLink to={`/categories/${category}`} className="active">{category}</NavLink>
      </td>
    </tr>
  ))}
</tbody>
  </table>
</div>
  );
};
export default Categories;
  

  

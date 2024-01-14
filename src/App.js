import './App.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Routes, Route , Outlet} from 'react-router-dom';
import Home from './Pages/Home';
import Products from './Pages/Products';
import AddProduct from './Pages/AddProduct';
import ProductDetails from './Pages/ProductDetails';
import EditProduct from './Pages/EditProduct';
import Categories from './Pages/Categories';
import ProductsByCategory from './Pages/ProductsByCategory';
function App() {
  return (
    <div className="App">
      <div className="header">
        <Navbar />
      </div>
      <div className="content">
        <div className="row">
          <div className="col-2 sidebar">
            <Sidebar />
          </div>
          <div className="col-10">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="home" element={<Home />} />

              {/* <Route path="products" element={<Products />}/>
                <Route path="products/add" element={<AddProduct />} />
                <Route path="products/:productId" element={<ProductDetails />} /> */}

              <Route path="products" element={<>
              <Outlet/> </>}>
                <Route path="" element={<Products />}/>
                <Route path="add" element={<AddProduct />} />
                <Route path=":productId" element={<ProductDetails />} />
                <Route path=":productId/edit" element={<EditProduct />}/>
                </Route>

                <Route path="categories" element={<> <Outlet/> </>}>
                  <Route path="" element={<Categories />} />
                  <Route path=":categoryName" element={<ProductsByCategory />} />
                </Route>
          
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
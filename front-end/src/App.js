// import section

import './App.css';
import Nav from './component/nav';
import Login from './component/login';
import Footer from './component/footer';
import SignUp from './component/signup';
import PrivateComponent from './component/private_component'
import Addproduct from './component/AddProduct'
import ProductList from './component/Productlist';
import UpdateProduct from './component/UpdateComponent';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
// app function
function App() {
  return (
    <div className="App">
      {/* //  nav bar component */}
      <BrowserRouter>
      <Nav />
      <Routes>

        <Route element={<PrivateComponent />}>
        
        <Route path='/' element={<ProductList />} />
        
        <Route path='/add' element={<Addproduct />} />
        
        <Route path='/update/:id' element={<UpdateProduct />} />
        
        <Route path='/logout'  />
        
        <Route path='/profile' element={<h1>Profile</h1>} />
       
        </Route>
        <Route path='/SignUp' element={<SignUp />}></Route>
        <Route path='/login' element={<Login />}/>
      </Routes>
      <Toaster richColors />
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {  Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import { Container } from '@mui/material';
import Home from './components/home';
import Logout from './components/logout';
import Login from './components/login';
import Signup from './components/signup';
import Catalogue from './components/Catalogue';
import Drawer from './components/Drawer';
import Cart from './components/cart';
import ProductDetail from './components/productDetail';
import Errorpage from './components/errorpage';
import { Quantity } from './components/Quantity';




function App() {


  return (
   

    <div  >
      <Navbar />
      <Container  maxWidth="xl" >
      <Routes>

        <Route path='/'  element={ <Home/>} />
        <Route path='/login' element={ <Login/>}/>
        <Route path='/signup'element={ <Signup/>} />
        <Route path='/Catalogue'element={ <Catalogue  />} />
        <Route path='/drawer'element={ <Drawer/>}/>
        <Route path='/cart'element={ <Cart/>}/>
        <Route path='/logout' element= { <Logout/> }/>
        <Route path='/product/:id'element={ <ProductDetail  />}/>
        <Route path='/*' element= { <Errorpage/> }/>
        <Route  element= { <Quantity/> }/>
      </Routes>
     
      <ToastContainer/>
      </Container>
    </div>
  );
}

export default App;

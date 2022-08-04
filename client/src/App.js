import React from 'react';
import 'antd/dist/antd.css';
import {
  BrowserRouter, Route, Routes
} from "react-router-dom";
import HomePage from './pages/HomePage';
import Items from './pages/Items';
import CartPage from './pages/CartPage';
import Register from './pages/Register';
import Login from './pages/Login';
import ProtectedRoute from './hooks/ProtectedRoute';
import Bills from './pages/Bills';
import Customer from './pages/Customer';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/home' element={ <ProtectedRoute > <HomePage/> </ProtectedRoute> } />
          <Route path='/item' element={ <ProtectedRoute><Items/></ProtectedRoute> } />
          <Route path='/cart' element={ <ProtectedRoute><CartPage/></ProtectedRoute>} />
          <Route path='/bills' element={ <ProtectedRoute><Bills/></ProtectedRoute>} />
          <Route path='/customer' element={ <ProtectedRoute><Customer/></ProtectedRoute>} />
          <Route path='/register' element={ <Register/>} />
          <Route path='/login' element={ <Login/>} />
          <Route path='/' element={ <Login/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

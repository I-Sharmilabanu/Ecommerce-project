import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Product from './pages/Product';
import Addtocart from './pages/Addtocart';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProductDetails from './pages/ProductDetails';
import ProtectedRoute from './pages/ProtectedRoute';
import Dashboard from "./pages/Dashboard";


function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      
      <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/product" element={<ProtectedRoute><Product /></ProtectedRoute>} />
      <Route path="/addtocart" element={<ProtectedRoute><Addtocart /></ProtectedRoute>} />
      <Route path="/products/:id" element={<ProtectedRoute><ProductDetails /></ProtectedRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/></Routes>
  );
}

export default App;

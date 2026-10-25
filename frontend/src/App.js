import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Home from "./pages/Home";
import Chair from "./pages/Chair";
import Oneproduct from "./pages/Oneproduct";
import RegistrationForm from "./pages/Register";
import Login from "./pages/Login";
import Sofa from "./pages/Sofa";
import Table from "./pages/Table";
import ContactUs from "./pages/ContactUs";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import Cart from "./pages/Cart";
import { Routes, Route } from "react-router";
import { onAuthStateChanged } from "firebase/auth";
import { clearUser, setUser } from "./store/Slices/authSlice";
import { auth } from "./firebase";
import { authAPI } from "./services/api";
import AdminDash from "./adminpages/AdminDash";
import AddProducts from "./adminpages/AddProducts";
import Contacts from "./adminpages/Contacts";
import Products from "./adminpages/Products";
import UserData from "./adminpages/UserData";
import SuccessPayment from "./pages/SuccessPayment";
import CancelPayment from "./pages/CancelPayment";
import { ToastProvider } from "./contexts/ToastContext";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        dispatch(setUser({
          email: user.email,
          uid: user.uid,
          displayName: user.displayName || localStorage.getItem(user.uid) || "",
        }));
        // Sync user with backend in background
        authAPI.getMe().catch(() => {});
      } else {
        dispatch(clearUser());
      }
    });
    return () => unsubscribe();
  }, [dispatch]);
  
  return (
    <ToastProvider>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/chair' element={<Chair />} />
        <Route path='/chair/:id' element={<Oneproduct />} />
        <Route path='/register' element={<RegistrationForm />} />
        <Route path='/login' element={<Login />} />
        <Route path='/sofa' element={<Sofa />} />
        <Route path='/sofa/:id' element={<Oneproduct />} />
        <Route path='/table' element={<Table />} />
        <Route path='/table/:id' element={<Oneproduct />} />
        <Route path='/contact_us' element={<ContactUs />} />
        <Route path='/cart' element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        
        <Route path="/success" element={<SuccessPayment />} />
        <Route path="/cancel" element={<CancelPayment />} />

        {/* admin paths - protected with backend admin verification (BUG FIX #3) */}
        <Route path="/admin" element={<AdminRoute><AdminDash /></AdminRoute>}/>
        <Route path="/admin/add-product" element={<AdminRoute><AddProducts /></AdminRoute>}/>
        <Route path="/admin/products" element={<AdminRoute><Products /></AdminRoute>}/>
        <Route path="/admin/contacts" element={<AdminRoute><Contacts /></AdminRoute>}/>
        <Route path="/admin/user-data" element={<AdminRoute><UserData /></AdminRoute>}/>
      </Routes>
    </ToastProvider>
  );
}
export default App;

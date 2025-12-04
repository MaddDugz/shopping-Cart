import {BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom"
import { SharedProvider } from "./Shared.jsx"
import { AuthProvider } from "./authShared.jsx"
import Hide from "./hide.jsx"
import Nav from "./Shopping/nav.jsx"
import Cart from "./Shopping/cart.jsx"  
import Home from "./Shopping/home.jsx"
import Login from "./admin/login.jsx"
import AddProduct from "./admin/addProduct.jsx"
import UpdateProduct  from "./admin/updateProd.jsx"
import  Notfound  from "./Notfound.jsx"

function App() {

  return(
    <>  
    <AuthProvider>
      <SharedProvider> 
        <Router>
          <Hide pathnamesToHide={['/admin', '/404']} Component={<Nav/>} />
            <Routes>
              <Route path="/" element={<Home/>}></Route>  
              <Route path="/Cart" element={<Cart/>}></Route>
              <Route path="/admin" element={<Login/>}></Route>
              <Route path="/admin/product" element={<AddProduct/>}></Route>
              <Route path="/admin/update/:id" element={<UpdateProduct/>}></Route>
              <Route path="*" element={<Navigate to="/404" />} />
              <Route path="/404" element={<Notfound/>}></Route>
          </Routes>
           
        </Router>
      </SharedProvider>
     </AuthProvider>
    </>
  )
}

export default App

import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/home";
import AboutPage from "./pages/about";
import ContactPage from "./pages/contact";
import SocialMediaPage from "./pages/social";
import ProductsPage from "./pages/product";
import Loyout from "./layout";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/login";
import CartPage from "./pages/CartPage";

function App() {
  

  return (
    <>
    
      <Routes>
        
        <Route path="/" element={<Loyout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="social" element={<SocialMediaPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="cart" element={<CartPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App

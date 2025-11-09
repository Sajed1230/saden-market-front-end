import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import {
  FaHome,
  FaInfoCircle,
  FaLaptop,
  FaEnvelope,
  FaShoppingCart,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../redux/userSlice";
import { Link } from "react-router-dom"; // ✅ Import Link

// Animations
const slideDown = keyframes`
  from { transform: translateY(-100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const pulse = keyframes`
  0%,100% { transform: scale(1); }
  50% { transform: scale(1.15); }
`;

const Navbar = styled.nav`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 1rem 2rem;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  animation: ${slideDown} 0.8s ease-out;
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  /* ✅ Use Link instead of a */
  font-size: 2rem;
  font-weight: 700;
  color: #3b82f6;
  text-decoration: none;
  animation: ${pulse} 2s infinite;

  span {
    color: #9333ea;
  }
`;

const Hamburger = styled.div`
  display: none;
  font-size: 1.8rem;
  cursor: pointer;
  @media (max-width: 768px) {
    display: block;
  }
`;

const Overlay = styled.div`
  display: ${({ open }) => (open ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1500;
`;

const NavLinks = styled.ul`
  display: flex;
  gap: 1.5rem;
  align-items: center;
  list-style: none;

  a {
    text-decoration: none;
    color: #4a5568;
    font-weight: 500;
    display: flex;
    align-items: center;
    transition: all 0.3s ease;
    &:hover {
      color: #3b82f6;
      transform: translateY(-2px);
    }
  }

  .button {
    background: black;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 12px;
    font-weight: 600;
    transition: all 0.3s ease;
    &:hover {
      transform: translateY(-2px) scale(1.05);
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.5);
    }
  }

  @media (max-width: 700px) {
    flex-direction: column;
    background: rgba(255, 255, 255, 0.98);
    position: fixed;
    top: 0;
    right: ${({ open }) => (open ? "0" : "-100%")};
    width: 250px;
    height: 100vh;
    padding-top: 5rem;
    gap: 2rem;
    z-index: 2000;
    transition: right 0.3s ease;
    box-shadow: -2px 0 15px rgba(0, 0, 0, 0.2);
  }
`;

const CartIcon = styled(Link)`
  /* ✅ Use Link */
  font-size: 1.6rem;
  color: #3b82f6;
  display: flex;
  align-items: center;
  position: relative;
  &:hover {
    transform: scale(1.2);
    color: #2563eb;
  }
`;

export default function Header() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const userCart = user?.cart || [];
  const [menuOpen, setMenuOpen] = useState(false);

  const totalQuantity = userCart.reduce(
    (sum, item) => sum + (item.quantity || 0),
    0
  );

  const handleLogout = () => {
    dispatch(clearUser());
    setMenuOpen(false);
  };

  return (
    <>
      <Navbar>
        <NavContainer>
          <Logo to="/">
            {" "}
            {/* ✅ Link instead of href */}
            Saden<span>Tech</span>
          </Logo>

          <Hamburger onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </Hamburger>

          <NavLinks open={menuOpen}>
            <li>
              <Link to="/" onClick={() => setMenuOpen(false)}>
                <FaHome /> Home
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={() => setMenuOpen(false)}>
                <FaInfoCircle /> About
              </Link>
            </li>
            <li>
              <Link to="/products" onClick={() => setMenuOpen(false)}>
                <FaLaptop /> Products
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={() => setMenuOpen(false)}>
                <FaEnvelope /> Contact
              </Link>
            </li>

            {totalQuantity > 0 && (
              <li>
                <CartIcon to="/cart" onClick={() => setMenuOpen(false)}>
                  <FaShoppingCart />
                  <span
                    style={{
                      position: "absolute",
                      top: "-5px",
                      right: "-10px",
                      background: "red",
                      color: "white",
                      borderRadius: "50%",
                      padding: "2px 6px",
                      fontSize: "1rem",
                      fontWeight: "bold",
                    }}
                  >
                    {totalQuantity}
                  </span>
                </CartIcon>
              </li>
            )}

            {user ? (
              <li>
                <button className="button" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    className="button"
                    onClick={() => setMenuOpen(false)}
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signup"
                    className="button"
                    onClick={() => setMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </NavLinks>
        </NavContainer>
      </Navbar>

      <Overlay open={menuOpen} onClick={() => setMenuOpen(false)} />
    </>
  );
}

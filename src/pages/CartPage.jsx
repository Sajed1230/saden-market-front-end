// src/pages/CartPage.jsx
import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import axios from "axios";
import { updateCartItemQuantity, clearCart } from "../../redux/userSlice";
import toast from "react-hot-toast";

// ================= Animations =================
const fadeInUp = keyframes`
  from { transform: translateY(30px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

// ================= Styled Components =================
const PageWrapper = styled.div`
  font-family: "Inter", sans-serif;
  min-height: 100vh;
  padding: 100px 2rem 2rem;
  background: linear-gradient(135deg, #f8fafc, #e2e8f0);
  color: #1a202c;
`;

const CartWrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  background: white;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  animation: ${fadeInUp} 0.6s ease-out;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #3b82f6;
`;

const CartItems = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
`;

const CartItem = styled.div`
  flex: 1 1 200px;
  background: #f9fafb;
  border-radius: 12px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ItemImage = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 0.75rem;
`;

const ItemName = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 0.5rem;
`;

const ItemPrice = styled.p`
  font-size: 1rem;
  font-weight: 700;
  color: #3b82f6;
  margin-bottom: 0.5rem;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  button {
    background: #f1f5f9;
    border: none;
    padding: 0.3rem 0.6rem;
    border-radius: 6px;
    cursor: pointer;
    transition: 0.2s;

    &:hover {
      background: #e2e8f0;
    }
  }

  span {
    font-size: 1rem;
    font-weight: 600;
  }
`;

const CartFooter = styled.div`
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 2px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TotalPrice = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #10b981;
`;

const Button = styled.button`
  padding: 0.6rem 1.2rem;
  margin-left: 0.8rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: 0.3s;

  &.delete {
    background-color: #ef4444;
    color: white;

    &:hover {
      background-color: #dc2626;
    }
  }

  &.visa {
    background-color: #2563eb;
    color: white;

    &:hover {
      background-color: #1d4ed8;
    }
  }

  &.mastercard {
    background-color: #f97316;
    color: white;

    &:hover {
      background-color: #ea580c;
    }
  }

  &.paypal {
    background-color: #ffc439;
    color: #111;

    &:hover {
      background-color: #fbbf24;
    }
  }
`;

const PaymentForm = styled.div`
  margin-top: 2rem;
  padding: 1.5rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  background: #f9fafb;

  input {
    display: block;
    width: 100%;
    padding: 0.6rem;
    margin-bottom: 1rem;
    border: 1px solid #d1d5db;
    border-radius: 8px;
  }

  button {
    background: #10b981;
    color: white;
    font-weight: 600;
    border: none;
    border-radius: 8px;
    padding: 0.8rem 1.2rem;
    cursor: pointer;

    &:hover {
      background: #059669;
    }
  }
`;

// ================= Main Cart Page =================
const CartPage = () => {

  const user = useSelector((state) => state.user.user);
  const email = user?.email;
   const name = user?.firstName;
 console.log(email)
 console.log(name);

  const userCart = user?.cart || [];

  const [cart, setCart] = useState([]);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const dispatch = useDispatch();

  // ---------------- Increase Quantity ----------------
  const handleIncrease = async (productId) => {
    const newCart = cart.map((item) =>
      item.product._id === productId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    setCart(newCart);

    try {
      const res = await axios.post(
        "https://saden-market-back-end.onrender.com/user/cart/increase",
        {
          userId: user.id,
          productId,
        }
      );

      dispatch(
        updateCartItemQuantity({
          productId,
          quantity: res.data.cart.find(
            (i) => i.product.toString() === productId
          ).quantity,
        })
      );
    } catch (err) {
      console.error("Failed to increase quantity:", err);
    }
  };

  // ---------------- Decrease Quantity ----------------
  const handleDecrease = async (productId) => {
    const newCart = cart.map((item) =>
      item.product._id === productId
        ? { ...item, quantity: Math.max(1, item.quantity - 1) }
        : item
    );
    setCart(newCart);

    try {
      const res = await axios.post(
        "https://saden-market-back-end.onrender.com/user/cart/decrease",
        {
          userId: user.id,
          productId,
        }
      );

      dispatch(
        updateCartItemQuantity({
          productId,
          quantity: res.data.cart.find(
            (i) => i.product.toString() === productId
          ).quantity,
        })
      );
    } catch (err) {
      console.error("Failed to decrease quantity:", err);
    }
  };

  // ---------------- Delete All Products ----------------
  const handleClearCart = async () => {
    try {
      await axios.post(
        "https://saden-market-back-end.onrender.com/user/cart/clear",
        {
          userId: user.id,
        }
      );
      setCart([]);
      dispatch(clearCart());
    } catch (err) {
      console.error("Failed to clear cart:", err);
    }
  };

  // ---------------- Show Payment Form ----------------
  const handlePaymentClick = (method) => {
    setSelectedMethod(method);
    setShowPaymentForm(true);
  };

  // ---------------- Confirm Payment ----------------
  const handleConfirmPayment = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://saden-market-back-end.onrender.com/user/checkout",
        {
          userId: user.id,
          cart: cart.map((item) => ({
            name: item.product.name,
            quantity: item.quantity,
            price: item.product.currentPrice,
          })),
          totalPrice,
          method: selectedMethod,
          name: name,
          email: email,
        },
        { responseType: "blob" } // important for PDF download
      );

      // Create a download link for PDF
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "invoice.pdf"); // filename
      document.body.appendChild(link);
      link.click();
      link.remove();

      // Show success toast
      toast.success(`Payment with ${selectedMethod} successful!`, {
        duration: 4000,
        position: "top-right",
      });

      setShowPaymentForm(false);
      dispatch(clearCart());
      setCart([]);
    } catch (err) {
      console.error("Payment failed:", err);

      // Show error toast
      toast.error("Payment failed. Please try again.", {
        duration: 4000,
        position: "top-right",
      });
    }
  };

  // ---------------- Initialize Cart ----------------
  useEffect(() => {
    if (userCart.length > 0) {
      const initializedCart = userCart.map((item) => ({
        ...item,
        quantity: item.quantity || item.qty || 1,
      }));
      setCart(initializedCart);
    }
  }, [userCart]);

  // ---------------- Calculate Total Price ----------------
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.product.currentPrice * item.quantity,
    0
  );

  return (
    <PageWrapper>
      <CartWrapper>
        <Title>Your Cart</Title>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <CartItems>
              {cart.map((item) => (
                <CartItem key={item.product._id}>
                  <ItemImage src={item.product.image} alt={item.product.name} />
                  <ItemName>{item.product.name}</ItemName>
                  <ItemPrice>${item.product.currentPrice}</ItemPrice>
                  <QuantityControls>
                    <button onClick={() => handleDecrease(item.product._id)}>
                      <FaMinus />
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleIncrease(item.product._id)}>
                      <FaPlus />
                    </button>
                  </QuantityControls>
                </CartItem>
              ))}
            </CartItems>

            {/* Footer Section */}
            <CartFooter>
              <TotalPrice>Total: ${totalPrice.toFixed(2)}</TotalPrice>
              <div>
                <Button className="delete" onClick={handleClearCart}>
                  <FaTrash /> Clear Cart
                </Button>
                <Button
                  className="visa"
                  onClick={() => handlePaymentClick("visa")}
                >
                  Pay with Visa
                </Button>
                <Button
                  className="mastercard"
                  onClick={() => handlePaymentClick("mastercard")}
                >
                  Pay with MasterCard
                </Button>
                <Button
                  className="paypal"
                  onClick={() => handlePaymentClick("paypal")}
                >
                  Pay with PayPal
                </Button>
              </div>
            </CartFooter>

            {/* Payment Form */}
            {showPaymentForm && (
              <PaymentForm>
                <h3>Confirm Your Order</h3>
                <ul>
                  {cart.map((item) => (
                    <li key={item.product._id}>
                      {item.product.name} x {item.quantity} = $
                      {item.product.currentPrice * item.quantity}
                    </li>
                  ))}
                </ul>
                <h4>Total: ${totalPrice.toFixed(2)}</h4>

                {(selectedMethod === "visa" ||
                  selectedMethod === "mastercard") && (
                  <form onSubmit={handleConfirmPayment}>
                    <input type="text" placeholder="Card Number" required />
                    <input
                      type="text"
                      placeholder="Expiry Date (MM/YY)"
                      required
                    />
                    <input type="text" placeholder="CVV" required />
                    <input
                      type="text"
                      placeholder="Card Holder Name"
                      required
                    />
                    <button type="submit">Confirm Payment</button>
                  </form>
                )}

                {selectedMethod === "paypal" && (
                  <button onClick={handleConfirmPayment}>
                    Proceed to PayPal
                  </button>
                )}
              </PaymentForm>
            )}
          </>
        )}
      </CartWrapper>
    </PageWrapper>
  );
};

export default CartPage;

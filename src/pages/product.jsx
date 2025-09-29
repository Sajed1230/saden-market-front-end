import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import {
  FaShoppingCart,
  FaMobileAlt,
  FaLaptop,
  FaHeadphones,
  FaChargingStation,
  FaTabletAlt,
  FaVolumeUp,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { setUser } from "../../redux/userSlice";

// ================= Animations =================
const fadeInUp = keyframes`
  from { transform: translateY(30px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// ================= Styled Components =================
const PageWrapper = styled.div`
  font-family: "Inter", sans-serif;
  min-height: 100vh;
  color: #1a202c;
  background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.9) 0%,
      rgba(240, 244, 248, 0.9) 100%
    ),
    url("https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&q=80&w=2070")
      center/cover;
`;

const HeroSection = styled.section`
  padding: 120px 2rem 60px;
  text-align: center;
  max-width: 1200px;
  margin: 0 auto;

  h1 {
    font-size: 3.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    animation: ${fadeInUp} 1s ease-out;
  }

  p {
    font-size: 1.25rem;
    color: #4a5568;
    max-width: 600px;
    margin: 0 auto 2rem;
    animation: ${fadeInUp} 1s ease-out 0.2s both;
  }
`;

const FilterButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
`;

const FilterBtn = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  cursor: pointer;
  font-weight: 500;
  border: 2px solid #e2e8f0;
  background: ${({ active }) =>
    active
      ? "linear-gradient(135deg, #3b82f6, #1e40af)"
      : "rgba(255,255,255,0.9)"};
  color: ${({ active }) => (active ? "white" : "#4a5568")};
  transition: all 0.3s ease;
  animation: ${fadeInUp} 0.6s ease-out;

  &:hover {
    background: linear-gradient(135deg, #3b82f6, #1e40af);
    color: white;
    border-color: #3b82f6;
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
  }
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 0;
`;

const ProductCardWrapper = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  overflow: hidden;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  animation: ${fadeInUp} 0.8s ease-out;
  position: relative;

  &:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
`;

const ProductImage = styled.div`
  width: 100%;
  height: 250px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 4rem;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .icon {
    animation: ${float} 3s ease-in-out infinite;
  }
`;

const ProductInfo = styled.div`
  padding: 2rem;

  .product-category {
    color: #3b82f6;
    font-size: 0.875rem;
    font-weight: 600;
    text-transform: uppercase;
    margin-bottom: 0.5rem;
  }

  h3 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #1a202c;
    margin-bottom: 1rem;
  }

  p {
    color: #4a5568;
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }

  .product-actions {
    display: flex;
    gap: 1rem;

    button {
      flex: 1;
      padding: 1rem;
      font-weight: 600;
      cursor: pointer;
      border-radius: 10px;
      transition: all 0.3s ease;
    }

    .btn-primary {
      background: linear-gradient(135deg, #3b82f6, #1e40af);
      color: white;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 25px rgba(59, 130, 246, 0.4);
      }
    }
  }
`;

const SpinnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  gap: 1rem;
`;

const Spinner = styled.div`
  width: 70px;
  height: 70px;
  border: 6px solid #e2e8f0;
  border-top: 6px solid #3b82f6;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const LoadingText = styled.p`
  font-size: 1.2rem;
  font-weight: 500;
  color: #3b82f6;
  animation: ${fadeInUp} 1s ease-out infinite alternate;
`;

// ================= Components =================
const Hero = () => (
  <HeroSection>
    <h1>Our Products</h1>
    <p>
      Discover our extensive collection of cutting-edge electronics and
      innovative technology solutions.
    </p>
  </HeroSection>
);

const ProductCard = ({ product, onAddToCart }) => {
  let Icon;
  switch (product.type?.toLowerCase()) {
    case "smartphones":
      Icon = FaMobileAlt;
      break;
    case "laptops":
      Icon = FaLaptop;
      break;
    case "audio":
      Icon = FaHeadphones;
      break;
    case "accessories":
      Icon = FaChargingStation;
      break;
    case "tablets":
      Icon = FaTabletAlt;
      break;
    default:
      Icon = FaVolumeUp;
  }

  return (
    <ProductCardWrapper>
      <ProductImage>
        {product.image ? (
          <img src={product.image} alt={product.name} />
        ) : (
          <Icon className="icon" />
        )}
        {product.badge && (
          <div
            style={{
              position: "absolute",
              top: "1rem",
              right: "1rem",
              background: "rgba(16, 185, 129, 0.9)",
              color: "white",
              padding: "0.5rem 1rem",
              borderRadius: "20px",
              fontSize: "0.875rem",
              fontWeight: 600,
            }}
          >
            {product.badge}
          </div>
        )}
      </ProductImage>

      <ProductInfo>
        <div className="product-category">{product.type}</div>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <div className="product-actions">
          <button className="btn-primary" onClick={onAddToCart}>
            <FaShoppingCart /> Add to Cart
          </button>
        </div>
      </ProductInfo>
    </ProductCardWrapper>
  );
};

// ================= Main Page =================
const ProductsPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const userid = user?.id;

  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const allTypes = [
    "all",
    "Smartphones",
    "Laptops",
    "Audio",
    "Accessories",
    "Wearables",
    "Gaming",
    "Home Appliances",
    "Cameras",
    "Other",
    "Tablets",
  ];

  useEffect(() => {
    fetch("https://saden-market-back-end.onrender.com/user/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // ===== Add to Cart Handler =====
  const handleAddToCart = async (product) => {
    if (!userid) return toast.error("Please login first");

    try {
      await toast.promise(
        fetch("https://saden-market-back-end.onrender.com/user/add-to-cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: userid, productId: product._id }),
        }).then((res) => res.json()),
        {
          loading: "Adding to cart...",
          success: (data) => {
            dispatch(setUser({ ...user, cart: data.cart }));
            return data.message;
          },
          error: (err) => `❌ ${err.message || "Failed to add product"}`,
        }
      );
    } catch (err) {
      console.error(err);
    }
  };

  const filteredProducts =
    filter === "all"
      ? products
      : products.filter((p) => p.type?.toLowerCase() === filter.toLowerCase());

  if (loading)
    return (
      <PageWrapper>
        <SpinnerWrapper>
          <Spinner />
          <LoadingText>Loading products...</LoadingText>
        </SpinnerWrapper>
      </PageWrapper>
    );

  return (
    <PageWrapper>
      <Toaster position="top-right" reverseOrder={false} />
      <Hero />

      <FilterButtons>
        {allTypes.map((type) => (
          <FilterBtn
            key={type}
            active={filter === type}
            onClick={() => setFilter(type)}
          >
            {type}
          </FilterBtn>
        ))}
      </FilterButtons>

      <ProductsGrid>
        {filteredProducts.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onAddToCart={() => handleAddToCart(product)}
          />
        ))}
      </ProductsGrid>
    </PageWrapper>
  );
};

export default ProductsPage;

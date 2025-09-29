import React from "react";
import styled, { keyframes } from "styled-components";
import {
  FaBolt,
  FaShieldAlt,
  FaHeadset,
  FaMobileAlt,
  FaLaptop,
  FaHeadphones,
  FaTabletAlt,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaShoppingCart,
} from "react-icons/fa";

// ===== Animations =====
const fadeInUp = keyframes`
  from { transform: translateY(30px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-10px); }
  60% { transform: translateY(-5px); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

// ===== Styled Components =====
const PageWrapper = styled.div`
  font-family: "Inter", sans-serif;
  background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.9) 0%,
      rgba(240, 244, 248, 0.9) 100%
    ),
    url("https://images.unsplash.com/photo-1518717758536-85ae29035b6d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")
      center/cover;
  min-height: 100vh;
  color: #1a202c;
`;

const HeroSection = styled.section`
  padding: 120px 2rem 60px;
  text-align: center;
  max-width: 1200px;
  margin: 0 auto;

  h1 {
    font-size: 4rem;
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

const CTAButton = styled.a`
  display: inline-block;
  background: linear-gradient(135deg, #3b82f6, #1e40af);
  color: white;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  animation: ${fadeInUp} 1s ease-out 0.4s both;
  box-shadow: 0 10px 30px rgba(59, 130, 246, 0.3);

  &:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 15px 40px rgba(59, 130, 246, 0.4);
  }

  svg {
    margin-right: 0.5rem;
  }
`;

const FeaturesSection = styled.section`
  padding: 60px 2rem;
  max-width: 1200px;
  margin: 0 auto;

  h2 {
    text-align: center;
    font-size: 2.5rem;
    font-weight: 600;
    margin-bottom: 3rem;
    color: #1a202c;
    animation: ${fadeInUp} 1s ease-out;
  }

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const FeatureCard = styled.div`
  background: rgba(255, 255, 255, 0.9);
  padding: 2rem;
  border-radius: 20px;
  text-align: center;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  animation: ${fadeInUp} 1s ease-out;

  &:hover {
    transform: translateY(-10px) rotate(1deg);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  }

  h3 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #1a202c;
  }

  p {
    color: #4a5568;
    line-height: 1.6;
  }

  svg {
    font-size: 3rem;
    color: #3b82f6;
    margin-bottom: 1rem;
    animation: ${bounce} 2s infinite;
  }
`;

const ProductsSection = styled.section`
  padding: 60px 2rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
`;

const ProductsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const ProductCard = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  overflow: hidden;
  transition: all 0.3s ease;
  animation: ${fadeInUp} 1s ease-out;

  &:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  }
`;

const ProductImage = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden; /* ensures image doesn’t spill outside */
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f9fafb; /* fallback background if image fails */

  img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* makes the image cover the box without distortion */
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
`;


const ProductInfo = styled.div`
  padding: 1.5rem;

  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: #1a202c;
  }

  p {
    color: #4a5568;
    font-size: 0.9rem;
    line-height: 1.5;
  }
`;

const Footer = styled.footer`
  background: rgba(26, 32, 44, 0.95);
  color: white;
  text-align: center;
  padding: 2rem;
  backdrop-filter: blur(10px);

  .social-links {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 1rem;
  }

  .social-links a {
    color: white;
    font-size: 1.5rem;
    transition: all 0.3s ease;
  }

  .social-links a:hover {
    color: #3b82f6;
    transform: translateY(-3px) rotate(15deg);
  }
`;

// ===== Component =====
const HomePage = () => {
  return (
    <PageWrapper>
      <HeroSection>
        <h1>Welcome to Saden</h1>
        <p>
          Your premier destination for cutting-edge electronics and innovative
          technology solutions. Discover the future of electronics with us.
        </p>
        <CTAButton href="/products">
          <FaShoppingCart /> Explore Products
        </CTAButton>
      </HeroSection>

      <FeaturesSection>
        <FeatureCard>
          <FaBolt />
          <h3>Latest Technology</h3>
          <p>
            We offer the most advanced electronic products with cutting-edge
            technology and innovative features.
          </p>
        </FeatureCard>
        <FeatureCard>
          <FaShieldAlt />
          <h3>Quality Guarantee</h3>
          <p>
            All our products come with comprehensive warranties and quality
            assurance for your peace of mind.
          </p>
        </FeatureCard>
        <FeatureCard>
          <FaHeadset />
          <h3>24/7 Support</h3>
          <p>
            Our dedicated customer support team is available round the clock to
            assist you with any queries.
          </p>
        </FeatureCard>
      </FeaturesSection>

      <ProductsSection>
        <ProductsContainer>
          <h2
            style={{
              textAlign: "center",
              fontSize: "2.5rem",
              fontWeight: 600,
              marginBottom: "3rem",
            }}
          >
            Featured Products
          </h2>
          <ProductsGrid>
            <ProductCard>
              <ProductImage>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzqCriOxnXTs1JwC6Yli1h0qr231pkI_jOhQ&s"
                  alt="error"
                />
              </ProductImage>
              <ProductInfo>
                <h3>Smartphones</h3>
                <p>
                  Latest flagship smartphones with advanced features and
                  stunning displays.
                </p>
              </ProductInfo>
            </ProductCard>
            <ProductCard>
              <ProductImage>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWLouohg5cLnSvSiquwYUEhkj2lnoI4qqQGQ&s"
                  alt="error"
                />
              </ProductImage>
              <ProductInfo>
                <h3>Laptops</h3>
                <p>
                  High-performance laptops for work, gaming, and creative
                  professionals.
                </p>
              </ProductInfo>
            </ProductCard>
            <ProductCard>
              <ProductImage>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQYnibXflFR35JnMn1vUd91rAMA-0_aEaNgw&s"
                  alt="error"
                />
              </ProductImage>
              <ProductInfo>
                <h3>Audio Devices</h3>
                <p>
                  Premium headphones and speakers for immersive audio
                  experiences.
                </p>
              </ProductInfo>
            </ProductCard>
            <ProductCard>
              <ProductImage>
                <img
                  src="data:image/jpeg;base64,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"
                  alt="error"
                />
              </ProductImage>
              <ProductInfo>
                <h3>Tablets</h3>
                <p>
                  Versatile tablets perfect for productivity, entertainment, and
                  creativity.
                </p>
              </ProductInfo>
            </ProductCard>
          </ProductsGrid>
        </ProductsContainer>
      </ProductsSection>

      <Footer>
        <p>&copy; 2024 Saden Electronics Market. All rights reserved.</p>
        <p>Bringing you the future of technology, today.</p>
        <div className="social-links">
          <a href="#">
            <FaFacebook />
          </a>
          <a href="#">
            <FaTwitter />
          </a>
          <a href="#">
            <FaInstagram />
          </a>
          <a href="#">
            <FaLinkedin />
          </a>
        </div>
      </Footer>
    </PageWrapper>
  );
};

export default HomePage;

// SocialMediaPage.jsx
import React from "react";
import styled, { keyframes } from "styled-components";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaTiktok,
  FaPlus,
  FaPlay,
  FaPaperPlane,
  FaHome,
  FaInfoCircle,
  FaLaptop,
  FaShareAlt,
  FaEnvelope,
} from "react-icons/fa";

// ================= Animations =================
const slideDown = keyframes`
  from { transform: translateY(-100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const fadeInUp = keyframes`
  from { transform: translateY(30px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-15px); }
  60% { transform: translateY(-8px); }
`;

const rotate360 = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

// ================= Styled Components =================
const PageWrapper = styled.div`
  font-family: "Inter", sans-serif;
  background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.9) 0%,
      rgba(240, 244, 248, 0.9) 100%
    ),
    url("https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2674&q=80")
      center/cover;
  min-height: 100vh;
  color: #1a202c;
`;

const Navbar = styled.nav`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 1rem 2rem;
  position: fixed;
  width: 100%;
  top: 0;
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

const Logo = styled.a`
  font-size: 2rem;
  font-weight: 700;
  color: #3b82f6;
  text-decoration: none;
  animation: ${pulse} 2s infinite;
`;

const NavLinks = styled.ul`
  display: flex;
  list-style: none;
  gap: 2rem;

  a {
    text-decoration: none;
    color: #4a5568;
    font-weight: 500;
    transition: all 0.3s ease;
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.3rem;
  }

  a:hover {
    color: #3b82f6;
    transform: translateY(-2px);
  }

  a.active {
    color: #3b82f6;
  }

  a::after {
    content: "";
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background: #3b82f6;
    transition: width 0.3s ease;
  }

  a:hover::after,
  a.active::after {
    width: 100%;
  }
`;

const Hero = styled.section`
  padding: 120px 2rem 60px;
  text-align: center;
  max-width: 1200px;
  margin: 0 auto;

  h1 {
    font-size: 3.5rem;
    font-weight: 700;
    color: #1a202c;
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

const SocialSection = styled.section`
  padding: 60px 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const SocialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

const SocialCard = styled.div`
  background: rgba(255, 255, 255, 0.9);
  padding: 2.5rem;
  border-radius: 20px;
  text-align: center;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  animation: ${fadeInUp} 1s ease-out;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-10px) scale(1.05);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }

  &:hover .social-icon {
    animation: ${rotate360} 0.5s ease-in-out;
  }
`;

const SocialIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1.5rem;
  animation: ${bounce} 2s infinite;
  color: ${(props) => props.color || "#000"};
`;

const FollowBtn = styled.a`
  display: inline-block;
  padding: 0.75rem 2rem;
  border-radius: 50px;
  text-decoration: none;
  color: white;
  font-weight: 600;
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
  background: ${(props) => props.bgColor || "#3b82f6"};

  &:hover {
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  }
`;

// ================= React Component =================
export default function SocialMediaPage() {
  const socialPlatforms = [
    {
      name: "Facebook",
      icon: <FaFacebookF />,
      description:
        "Follow us for daily updates, product launches, tech tips, and exclusive behind-the-scenes content.",
      btnText: "Follow Us",
      color: "#1877f2",
      bgColor: "linear-gradient(135deg, #1877f2, #0d5bb8)",
    },
    {
      name: "Twitter",
      icon: <FaTwitter />,
      description:
        "Get real-time updates, tech news, customer support, and join conversations about the latest electronics.",
      btnText: "Follow Us",
      color: "#1da1f2",
      bgColor: "linear-gradient(135deg, #1da1f2, #0d8bd9)",
    },
    {
      name: "Instagram",
      icon: <FaInstagram />,
      description:
        "Discover stunning product photography, unboxing videos, and lifestyle content featuring our electronics.",
      btnText: "Follow Us",
      color: "#e4405f",
      bgColor: "linear-gradient(135deg, #e4405f, #c13584)",
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedinIn />,
      description:
        "Connect with us professionally, learn about career opportunities, and industry insights.",
      btnText: "Connect",
      color: "#0077b5",
      bgColor: "linear-gradient(135deg, #0077b5, #005885)",
    },
    {
      name: "YouTube",
      icon: <FaYoutube />,
      description:
        "Watch detailed product reviews, tutorials, unboxing videos, and tech educational content.",
      btnText: "Subscribe",
      color: "#ff0000",
      bgColor: "linear-gradient(135deg, #ff0000, #cc0000)",
      btnIcon: <FaPlay />,
    },
    {
      name: "TikTok",
      icon: <FaTiktok />,
      description:
        "Enjoy quick tech tips, product showcases, and fun electronics-related content in short videos.",
      btnText: "Follow Us",
      color: "#000000",
      bgColor: "linear-gradient(135deg, #000000, #333333)",
    },
  ];

  return (
    <PageWrapper>
     
      <Hero>
        <h1>Connect With Saden</h1>
        <p>
          Join our vibrant community across all social media platforms and stay
          updated with the latest in electronics.
        </p>
      </Hero>

      <SocialSection>
        <SocialGrid>
          {socialPlatforms.map((platform, index) => (
            <SocialCard key={index}>
              <SocialIcon color={platform.color}>{platform.icon}</SocialIcon>
              <h3>{platform.name}</h3>
              <p>{platform.description}</p>
              <FollowBtn href="#" bgColor={platform.bgColor}>
                {platform.btnIcon || <FaPlus />} {platform.btnText}
              </FollowBtn>
            </SocialCard>
          ))}
        </SocialGrid>
      </SocialSection>
    </PageWrapper>
  );
}

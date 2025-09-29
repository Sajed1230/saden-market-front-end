// AboutPage.jsx
import React from "react";
import styled, { keyframes } from "styled-components";
import {
  FaHome,
  FaInfoCircle,
  FaLaptop,
  FaShareAlt,
  FaEnvelope,
  FaBullseye,
  FaEye,
  FaUserTie,
  FaLaptopCode,
  FaUsers,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

// ================= Animations =================
const slideDown = keyframes`
  from { transform: translateY(-100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

const fadeInUp = keyframes`
  from { transform: translateY(30px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const slideInLeft = keyframes`
  from { transform: translateX(-50px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const bounce = keyframes`
  0%,20%,50%,80%,100% { transform: translateY(0); }
  40% { transform: translateY(-10px); }
  60% { transform: translateY(-5px); }
`;

const rotate360 = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const countUp = keyframes`
  from { transform: scale(0.5); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
`;

// ================= Styled Components =================
const PageWrapper = styled.div`
  font-family: "Inter", sans-serif;
  color: #1a202c;
  background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.9) 0%,
      rgba(240, 244, 248, 0.9) 100%
    ),
    url("https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2126&q=80")
      center/cover;
  min-height: 100vh;
`;

const Nav = styled.nav`
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

    &.active {
      color: #3b82f6;
    }

    &:hover {
      color: #3b82f6;
      transform: translateY(-2px);
    }

    &::after {
      content: "";
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 0;
      height: 2px;
      background: #3b82f6;
      transition: width 0.3s ease;
    }

    &:hover::after,
    &.active::after {
      width: 100%;
    }
  }
`;

const HeroSection = styled.section`
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

const AboutContent = styled.section`
  padding: 60px 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const AboutSectionWrapper = styled.div`
  margin-bottom: 4rem;
`;

const AboutText = styled.div`
  background: rgba(255, 255, 255, 0.9);
  padding: 2.5rem;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  animation: ${slideInLeft} 1s ease-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
  }

  p {
    font-size: 1.1rem;
    line-height: 1.8;
    color: #4a5568;
    margin-bottom: 1.5rem;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const MissionVisionWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.9);
  padding: 2.5rem;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  text-align: center;
  transition: all 0.3s ease;
  animation: ${fadeInUp} 1s ease-out;
  animation-delay: ${(props) => props.delay || "0s"};

  &:hover {
    transform: translateY(-10px) rotate(1deg);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }

  .icon {
    font-size: 4rem;
    margin-bottom: 1.5rem;
    animation: ${bounce} 2s infinite;
    color: ${(props) => props.color || "#3b82f6"};
  }

  h3 {
    font-size: 2rem;
    font-weight: 600;
    color: #1a202c;
    margin-bottom: 1.5rem;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.7;
    color: #4a5568;
  }
`;

const TeamSectionWrapper = styled.section`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  padding: 60px 2rem;
  margin: 4rem 0;
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const TeamMember = styled.div`
  background: rgba(255, 255, 255, 0.9);
  padding: 2rem;
  border-radius: 20px;
  text-align: center;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  animation: ${fadeInUp} 1s ease-out;
  animation-delay: ${(props) => props.delay || "0s"};

  &:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }

  .member-avatar {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1.5rem;
    color: white;
    font-size: 3rem;
    animation: ${rotate360} 3s linear infinite;
  }

  h4 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #1a202c;
    margin-bottom: 0.5rem;
  }

  .role {
    color: #3b82f6;
    font-weight: 500;
    margin-bottom: 1rem;
  }

  p {
    color: #4a5568;
    line-height: 1.6;
    font-size: 0.95rem;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
`;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.9);
  padding: 2rem;
  border-radius: 15px;
  text-align: center;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  animation: ${fadeInUp} 1s ease-out;
  animation-delay: ${(props) => props.delay || "0s"};

  &:hover {
    transform: translateY(-5px) scale(1.05);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  }

  .stat-number {
    font-size: 3rem;
    font-weight: 700;
    color: #3b82f6;
    display: block;
    animation: ${countUp} 2s ease-out;
  }

  .stat-label {
    font-size: 1.1rem;
    color: #4a5568;
    font-weight: 500;
    margin-top: 0.5rem;
  }
`;

const FooterWrapper = styled.footer`
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

    a {
      color: white;
      font-size: 1.5rem;
      transition: all 0.3s ease;

      &:hover {
        color: #3b82f6;
        transform: translateY(-3px) rotate(15deg);
      }
    }
  }
`;

// ================= React Components =================

const Hero = () => (
  <HeroSection>
    <h1>About Saden</h1>
    <p>
      Pioneering the future of electronics with innovation, quality, and
      exceptional customer service.
    </p>
  </HeroSection>
);

const AboutSection = () => (
  <AboutContent>
    <AboutSectionWrapper>
      <h2>Our Story</h2>
      <AboutText>
        <p>
          Founded in 2020, Saden has rapidly emerged as a leading force in the
          electronics market. What started as a small startup with a vision to
          make cutting-edge technology accessible to everyone has grown into a
          trusted brand serving thousands of customers worldwide.
        </p>
        <p>
          We believe that technology should enhance lives, not complicate them.
          That's why we carefully curate our product selection, ensuring each
          item meets our strict standards for quality, innovation, and user
          experience.
        </p>
        <p>
          Our journey began with a simple question: "How can we bridge the gap
          between advanced technology and everyday users?" Today, we continue to
          answer that question through our commitment to excellence, customer
          satisfaction, and technological innovation.
        </p>
      </AboutText>
    </AboutSectionWrapper>
  </AboutContent>
);

const MissionVision = () => (
  <MissionVisionWrapper>
    <Card delay="0.2s" color="#10b981">
      <div className="icon">
        <FaBullseye />
      </div>
      <h3>Our Mission</h3>
      <p>
        To democratize access to cutting-edge electronics by providing
        high-quality products, exceptional service, and innovative solutions
        that empower individuals and businesses to thrive in the digital age.
      </p>
    </Card>
    <Card delay="0.4s" color="#8b5cf6">
      <div className="icon">
        <FaEye />
      </div>
      <h3>Our Vision</h3>
      <p>
        To become the world's most trusted electronics marketplace, where
        innovation meets affordability, and where every customer feels valued,
        supported, and empowered by technology.
      </p>
    </Card>
  </MissionVisionWrapper>
);

const TeamSection = () => (
  <TeamSectionWrapper>
    <h2>Meet Our Team</h2>
    <TeamGrid>
      <TeamMember delay="0.1s">
        <div className="member-avatar">
          <FaUserTie />
        </div>
        <h4>Ahmed Al-Saden</h4>
        <div className="role">Founder & CEO</div>
        <p>
          Visionary leader with 15+ years in tech industry, passionate about
          bringing innovative electronics to global markets.
        </p>
      </TeamMember>
      <TeamMember delay="0.3s">
        <div className="member-avatar">
          <FaLaptopCode />
        </div>
        <h4>Sarah Technology</h4>
        <div className="role">CTO & Head of Innovation</div>
        <p>
          Expert in emerging technologies with a focus on AI, IoT, and
          next-generation electronic devices.
        </p>
      </TeamMember>
      <TeamMember delay="0.5s">
        <div className="member-avatar">
          <FaUsers />
        </div>
        <h4>Mohammed Support</h4>
        <div className="role">Head of Customer Experience</div>
        <p>
          Dedicated to ensuring every customer receives exceptional service and
          support throughout their journey with us.
        </p>
      </TeamMember>
    </TeamGrid>
  </TeamSectionWrapper>
);

const StatsSection = () => (
  <AboutContent>
    <h2>Our Impact</h2>
    <StatsGrid>
      <StatCard delay="0.1s">
        <span className="stat-number">50K+</span>
        <div className="stat-label">Happy Customers</div>
      </StatCard>
      <StatCard delay="0.2s">
        <span className="stat-number">1000+</span>
        <div className="stat-label">Products Available</div>
      </StatCard>
      <StatCard delay="0.3s">
        <span className="stat-number">25+</span>
        <div className="stat-label">Countries Served</div>
      </StatCard>
      <StatCard delay="0.4s">
        <span className="stat-number">99%</span>
        <div className="stat-label">Customer Satisfaction</div>
      </StatCard>
    </StatsGrid>
  </AboutContent>
);

const Footer = () => (
  <FooterWrapper>
    <p>&copy; 2024 Saden Electronics Market. All rights reserved.</p>
    <p>Bringing you the future of technology, today.</p>
    <div className="social-links">
      <a href="/social">
        <FaFacebook />
      </a>
      <a href="/social">
        <FaTwitter />
      </a>
      <a href="/social">
        <FaInstagram />
      </a>
      <a href="/social">
        <FaLinkedin />
      </a>
    </div>
  </FooterWrapper>
);

const AboutPage = () => (
  <PageWrapper>
    
    <Hero />
    <AboutSection />
    <MissionVision />
    <TeamSection />
    <StatsSection />
    <Footer />
  </PageWrapper>
);

export default AboutPage;

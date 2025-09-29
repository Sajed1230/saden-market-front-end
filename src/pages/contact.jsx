// ContactPage.jsx
import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaClock,
  FaPaperPlane,
  FaEnvelope,
  FaMapMarkedAlt,
  FaSpinner,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

// ================= Animations =================
const fadeInUp = keyframes`
  from { transform: translateY(30px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const slideInLeft = keyframes`
  from { transform: translateX(-50px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const slideInRight = keyframes`
  from { transform: translateX(50px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const pulse = keyframes`
  0%,100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-10px); }
  60% { transform: translateY(-5px); }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// ================= Styled Components =================
const PageContainer = styled.div`
  font-family: "Inter", sans-serif;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.9),
    rgba(240, 244, 248, 0.9)
  );
  min-height: 100vh;
  color: #1a202c;
  padding-bottom: 4rem;
`;

const HeroSection = styled.section`
  padding: 120px 2rem 60px;
  text-align: center;
  max-width: 1200px;
  margin: 0 auto;

  h1 {
    font-size: 3rem;
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

const ContactSection = styled.section`
  padding: 60px 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const ContactContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ContactFormWrapper = styled.div`
  background: rgba(255, 255, 255, 0.9);
  padding: 3rem;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  animation: ${slideInLeft} 1s ease-out;
`;

const ContactFormTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
`;

const ContactFormText = styled.p`
  color: #4a5568;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const FormGroup = styled.div`
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;

  label {
    font-weight: 500;
    margin-bottom: 0.5rem;
    color: #1a202c;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem 1.5rem;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 1rem;
  font-family: inherit;
  outline: none;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.8);

  &:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    transform: translateY(-2px);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 1rem 1.5rem;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 1rem;
  outline: none;
  background: rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;

  &:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    transform: translateY(-2px);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 1rem 1.5rem;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 1rem;
  outline: none;
  resize: vertical;
  min-height: 120px;
  background: rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;

  &:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    transform: translateY(-2px);
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #3b82f6, #1e40af);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  svg.spin {
    animation: ${spin} 1s linear infinite;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const ContactInfoWrapper = styled.div`
  animation: ${slideInRight} 1s ease-out;
`;

const ContactCards = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ContactCard = styled.div`
  background: rgba(255, 255, 255, 0.9);
  padding: 2rem;
  border-radius: 15px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  animation: ${fadeInUp} 1s ease-out;
  &:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  }
`;

const CardIcon = styled.div`
  font-size: 2.5rem;
  color: #3b82f6;
  margin-bottom: 1rem;
  animation: ${bounce} 2s infinite;
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const CardText = styled.p`
  color: #4a5568;
  line-height: 1.6;
`;

// --- Map Section ---
const MapSection = styled.section`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  padding: 60px 2rem;
  margin-top: 4rem;
`;

const MapContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;

const MapPlaceholder = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  padding: 4rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const MapIcon = styled.div`
  font-size: 4rem;
  color: #3b82f6;
  margin-bottom: 2rem;
  animation: ${pulse} 2s infinite;
`;

const MapTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const MapText = styled.p`
  color: #4a5568;
  font-size: 1.1rem;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

// ================= React Component =================
const ContactPage = () => {
  const userEmail = useSelector((state) => state.user.user?.email || "");
  const firstName = useSelector((state) => state.user.user?.firstName || "");

  const [name, setName] = useState(firstName || "");
  const [email, setEmail] = useState(userEmail || "");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !subject || !message) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        "https://saden-market-back-end.onrender.com/user/contact",
        {
          name,
          email,
          phone,
          subject,
          message,
        }
      );
      toast.success(res.data.message);

      // Clear form
      setPhone("");
      setSubject("");
      setMessage("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send message");
    }
    setLoading(false);
  };

  return (
    <PageContainer>
      <Toaster position="top-right" />
      <HeroSection>
        <h1>Get In Touch</h1>
        <p>
          Have questions about our products or need support? We're here to help
          you.
        </p>
      </HeroSection>

      <ContactSection>
        <ContactContainer>
          {/* Form */}
          <ContactFormWrapper>
            <ContactFormTitle>Send us a Message</ContactFormTitle>
            <ContactFormText>
              Fill out the form below and we'll get back to you as soon as
              possible.
            </ContactFormText>

            <form onSubmit={handleSubmit}>
              <FormGroup>
                <label>Full Name</label>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </FormGroup>

              <FormGroup>
                <label>Email Address</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </FormGroup>

              <FormGroup>
                <label>Phone Number</label>
                <Input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </FormGroup>

              <FormGroup>
                <label>Subject</label>
                <Select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    -- Select a subject --
                  </option>
                  <option value="general">General Inquiry</option>
                  <option value="product">Product Information</option>
                  <option value="support">Technical Support</option>
                  <option value="warranty">Warranty Claim</option>
                  <option value="partnership">Partnership</option>
                  <option value="feedback">Feedback</option>
                </Select>
              </FormGroup>

              <FormGroup>
                <label>Message</label>
                <TextArea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us how we can help you..."
                  required
                />
              </FormGroup>

              <SubmitButton type="submit" disabled={loading}>
                {loading ? (
                  <FaSpinner className="spin" />
                ) : (
                  <>
                    <FaPaperPlane /> Send Message
                  </>
                )}
              </SubmitButton>
            </form>
          </ContactFormWrapper>

          {/* Contact Info */}
          <ContactInfoWrapper>
            <h2>Contact Information</h2>
            <ContactCards>
              <ContactCard>
                <CardIcon>
                  <FaMapMarkerAlt />
                </CardIcon>
                <CardTitle>Visit Our Store</CardTitle>
                <CardText>
                  123 Electronics Blvd, Tech District, City Center
                </CardText>
              </ContactCard>
              <ContactCard>
                <CardIcon>
                  <FaPhone />
                </CardIcon>
                <CardTitle>Call Us</CardTitle>
                <CardText>
                  Phone: <a href="tel:+1234567890">+1 (234) 567-890</a>
                </CardText>
              </ContactCard>
              <ContactCard>
                <CardIcon>
                  <FaEnvelope />
                </CardIcon>
                <CardTitle>Email Us</CardTitle>
                <CardText>
                  General: <a href="mailto:info@saden.com">info@saden.com</a>
                </CardText>
              </ContactCard>
              <ContactCard>
                <CardIcon>
                  <FaClock />
                </CardIcon>
                <CardTitle>Business Hours</CardTitle>
                <CardText>Mon-Fri 9AM-8PM, Sat 10AM-6PM, Sun 12PM-5PM</CardText>
              </ContactCard>
            </ContactCards>
          </ContactInfoWrapper>
        </ContactContainer>
      </ContactSection>

      {/* Map Section */}
      <MapSection>
        <MapContainer>
          <h2>Find Our Location</h2>
          <MapPlaceholder>
            <MapIcon>
              <FaMapMarkedAlt />
            </MapIcon>
            <MapTitle>Visit Our Flagship Store</MapTitle>
            <MapText>
              Located in the heart of the tech district, our flagship store
              offers hands-on experience.
            </MapText>
          </MapPlaceholder>
        </MapContainer>
      </MapSection>
    </PageContainer>
  );
};

export default ContactPage;

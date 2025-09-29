import React from "react";
import styled, { keyframes } from "styled-components";
import { useForm } from "react-hook-form";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";

// ===== Animations =====
const fadeInUp = keyframes`
  from { transform: translateY(30px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

// ===== Styled Components =====
const PageWrapper = styled.div`
  font-family: "Inter", sans-serif;
  min-height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  overflow-y: auto;

  background: linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)),
    url("https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")
      center/cover no-repeat;
`;

const GlassCard = styled.div`
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.12);
  border-radius: 18px;
  padding: 3rem 2.5rem;
  width: 100%;
  max-width: 420px;
  text-align: center;
  color: white;
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.45);
  animation: ${fadeInUp} 0.9s ease-out;
`;

const Title = styled.h2`
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #3b82f6, #06b6d4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const InputField = styled.div`
  margin-bottom: 1.2rem;

  div {
    display: flex;
    align-items: center;
    background: rgba(255, 255, 255, 0.18);
    padding: 0.85rem 1rem;
    border-radius: 12px;
    border: 1px solid transparent;
    transition: all 0.3s;

    &:focus-within {
      border-color: #3b82f6;
      background: rgba(255, 255, 255, 0.28);
    }

    svg {
      color: #3b82f6;
      margin-right: 0.75rem;
      font-size: 1.2rem;
    }

    input {
      flex: 1;
      border: none;
      outline: none;
      background: transparent;
      font-size: 1rem;
      color: white;

      &::placeholder {
        color: #d1d5db;
      }
    }
  }
`;

const FieldErrorText = styled.small`
  color: #ff6b6b;
  font-size: 0.85rem;
  margin-top: 0.25rem;
  display: block;
`;

const SubmitButton = styled.button`
  width: 100%;
  background: linear-gradient(135deg, #3b82f6, #06b6d4);
  color: white;
  padding: 1rem;
  border-radius: 14px;
  font-size: 1.05rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  margin-top: 0.8rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px) scale(1.03);
    box-shadow: 0 8px 22px rgba(59, 130, 246, 0.5);
  }
`;

const FooterText = styled.p`
  text-align: center;
  margin-top: 1.4rem;
  font-size: 0.95rem;
  color: #e5e7eb;

  a {
    color: #3b82f6;
    font-weight: 500;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

// ===== Custom toast style =====
const toastStyle = {
  style: {
    background: "rgba(255, 255, 255, 0.12)",
    backdropFilter: "blur(10px)",
    color: "#fff",
    border: "1px solid #3b82f6",
    borderRadius: "14px",
    padding: "12px 20px",
    fontWeight: 500,
    fontSize: "0.95rem",
  },
  success: {
    style: {
      background: "rgba(74, 222, 128, 0.2)",
      border: "1px solid #4ade80",
      color: "#4ade80",
    },
  },
  error: {
    style: {
      background: "rgba(255, 107, 107, 0.2)",
      border: "1px solid #ff6b6b",
      color: "#ff6b6b",
    },
  },
};

// ===== Component =====
const SignUpPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        "https://saden-market-back-end.onrender.com/user/signup",
        data
      );

      // save user in redux
      if (res.data.user) {
        dispatch(setUser(res.data.user));
      }

      toast.success(
        res.data.message || "Registration successful!",
        toastStyle.success
      );

      reset();
      navigate("/products"); // redirect like login
    } catch (err) {
      if (err.response && err.response.data.errors) {
        toast.error(err.response.data.errors[0].msg, toastStyle.error);
      } else if (err.response && err.response.data.message) {
        toast.error(err.response.data.message, toastStyle.error);
      } else {
        toast.error("Something went wrong!", toastStyle.error);
      }
    }
  };

  return (
    <PageWrapper>
      <GlassCard>
        <Title>Create Account</Title>

        <form onSubmit={handleSubmit(onSubmit)}>
          <InputField>
            <div>
              <FaUser />
              <input
                type="text"
                placeholder="First Name"
                {...register("firstName", {
                  required: "First name is required",
                })}
              />
            </div>
            {errors.firstName && (
              <FieldErrorText>{errors.firstName.message}</FieldErrorText>
            )}
          </InputField>

          <InputField>
            <div>
              <FaUser />
              <input
                type="text"
                placeholder="Last Name"
                {...register("lastName", { required: "Last name is required" })}
              />
            </div>
            {errors.lastName && (
              <FieldErrorText>{errors.lastName.message}</FieldErrorText>
            )}
          </InputField>

          <InputField>
            <div>
              <FaEnvelope />
              <input
                type="email"
                placeholder="Email"
                {...register("email", { required: "Email is required" })}
              />
            </div>
            {errors.email && (
              <FieldErrorText>{errors.email.message}</FieldErrorText>
            )}
          </InputField>

          <InputField>
            <div>
              <FaLock />
              <input
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
            </div>
            {errors.password && (
              <FieldErrorText>{errors.password.message}</FieldErrorText>
            )}
          </InputField>

          <SubmitButton type="submit">Sign Up</SubmitButton>
        </form>

        <FooterText>
          Already have an account? <a href="/login">Login</a>
        </FooterText>
      </GlassCard>

      {/* Hot Toast container */}
      <Toaster
        position="buttom-left"
        reverseOrder={false}
        toastOptions={{ duration: 4000, ...toastStyle }}
      />
    </PageWrapper>
  );
};

export default SignUpPage;

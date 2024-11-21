import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import axios from 'axios'; // Import axios for API requests
import styled from "styled-components";

const Overlay = styled.div.attrs({
  className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",
})``;

const DialogBox = styled.div.attrs({
  className: "bg-white rounded-lg p-8 shadow-lg max-w-md w-full relative",
})``;

const CloseButton = styled.button.attrs({
  className: "absolute top-3 right-3 text-gray-500 hover:text-black",
})``;

const Input = styled.input.attrs({
  className: "w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-3",
})``;

const Button = styled.button.attrs({
  className: "w-full bg-blue-500 text-white p-3 rounded-md mt-5 hover:bg-blue-600",
})``;

export default function LoginPage({ onClose }) {
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    document.body.style.overflow = "hidden"; 

    return () => document.body.style.overflow = "auto"; 
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Reset error message before new attempt
  
    try {
      // Make the API call for login
      const response = await axios.post('http://localhost:8000/api/v1/users/login', {
        email,
        password,
      });
  
      // Check if the response contains a success message and token
      if (response.data && response.data.success) {
        // Store token and user data in localStorage or any other preferred method
        localStorage.setItem("token", response.data.token); 
        localStorage.setItem("user", JSON.stringify(response.data.user)); // Store user data
  
        // Close the modal by calling onClose
        onClose();
  
        // Navigate to the home page after successful login
        navigate("/"); 
      } else {
        setError("Login failed: " + response.data.message); // Show the error message from the response
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "An unknown error occurred";
      setError("Login failed: " + errorMessage); // Handle error
    } finally {
      setLoading(false); // Stop loading animation after the request completes
    }
  };

  return (
    <Overlay>
      <DialogBox>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Login to Your Account</h2>
        <p className="text-sm text-gray-600 mb-6">
          Please enter your credentials to log in.
        </p>
        {error && <p className="text-red-500">{error}</p>} {/* Show error message if exists */}
        <form onSubmit={handleLogin}>
          <Input 
            type="email" 
            placeholder="Email Address" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
          <Input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          <Button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Login"}
          </Button>
        </form>
      </DialogBox>
    </Overlay>
  );
}

import React, { useState } from "react";
import styled from "styled-components";

// Styled Components for Modal
const Overlay = styled.div.attrs({
  className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50", // Dimmed background
})``;

const DialogBox = styled.div.attrs({
  className: "bg-white rounded-lg p-6 shadow-lg max-w-md w-full relative", // Signup modal
})``;

const CloseButton = styled.button.attrs({
  className: "absolute top-3 right-3 text-gray-500 hover:text-black", // Close button
})``;

const Input = styled.input.attrs({
  className: "w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-3", // Styled inputs
})``;

const Button = styled.button.attrs({
  className: "w-full bg-blue-500 text-white p-3 rounded-md mt-5 hover:bg-blue-600", // Submit button
})``;

// Main Component
export default function SignupPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      {/* Signup Button */}
      <button
        onClick={() => setIsDialogOpen(true)}
        className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600"
      >
        Signup
      </button>

      {/* Dialog Box */}
      {isDialogOpen && (
        <Overlay>
          <DialogBox>
            <CloseButton onClick={() => setIsDialogOpen(false)}>&times;</CloseButton>
            <h2 className="text-2xl font-bold text-gray-700">Sign Up</h2>
            <p className="text-sm text-gray-500 mt-2">
              Create your account by filling the information below.
            </p>
            <form>
              <Input type="text" placeholder="Full Name" />
              <Input type="email" placeholder="Email Address" />
              <Input type="password" placeholder="Password" />
              <Input type="password" placeholder="Confirm Password" />
              <Button type="submit">Sign Up</Button>
            </form>
          </DialogBox>
        </Overlay>
      )}
    </div>
  );
}

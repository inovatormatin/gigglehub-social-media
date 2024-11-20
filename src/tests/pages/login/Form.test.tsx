import React, { useState } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { SigninData } from "../../../types";
import Form from "../../../pages/Login/Form";

describe("Form Component", () => {
  const mockSetErrorMessages = jest.fn();
  const mockSetUserSignIn = jest.fn();

  const defaultProps = {
    userSignIn: { email: "", password: "" } as SigninData,
    setErrorMessages: mockSetErrorMessages,
    errorMessages: { email: "", password: "" },
    setUserSignIn: mockSetUserSignIn,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the form with email and password inputs", () => {
    render(<Form {...defaultProps} />);

    // Verify email and password inputs are rendered using placeholder text
    expect(
      screen.getByPlaceholderText("Enter your email *")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter your password *")
    ).toBeInTheDocument();
  });

  test("handles input changes correctly", () => {
    const TestWrapper = () => {
      const [userSignIn, setUserSignIn] = useState<SigninData>({
        email: "",
        password: "",
      });
      const [errorMessages, setErrorMessages] = useState<
        Record<string, string>
      >({});

      return (
        <Form
          userSignIn={userSignIn}
          setUserSignIn={setUserSignIn}
          errorMessages={errorMessages}
          setErrorMessages={setErrorMessages}
        />
      );
    };

    render(<TestWrapper />);

    const emailInput = screen.getByPlaceholderText("Enter your email *");
    const passwordInput = screen.getByPlaceholderText("Enter your password *");

    // Simulate user typing in email and password fields
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    // Check that inputs have updated values
    expect(emailInput).toHaveValue("test@example.com");
    expect(passwordInput).toHaveValue("password123");
  });

  test("clears error messages on input change", () => {
    render(<Form {...defaultProps} />);

    const emailInput = screen.getByPlaceholderText("Enter your email *");

    // Simulate a change event
    fireEvent.change(emailInput, { target: { value: "newemail@example.com" } });

    // Verify error messages are cleared
    expect(mockSetErrorMessages).toHaveBeenCalledWith({});
  });

  test("displays error messages for email and password", () => {
    const propsWithErrors = {
      ...defaultProps,
      errorMessages: {
        email: "Invalid email",
        password: "Password is required",
      },
    };

    render(<Form {...propsWithErrors} />);

    // Check if error messages are displayed
    expect(screen.getByText("Invalid email")).toBeInTheDocument();
    expect(screen.getByText("Password is required")).toBeInTheDocument();
  });
});

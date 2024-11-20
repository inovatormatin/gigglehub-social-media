import React, { useState } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Input from "../../../components/Tailwind/Input";

describe("Input Component", () => {
  const mockOnChange = jest.fn();

  const defaultProps = {
    name: "email",
    type: "text",
    require: true,
    lable: "Email",
    placeholder: "Enter your email",
    value: "",
    onChange: mockOnChange,
    error: "",
  };

  beforeEach(() => {
    jest.clearAllMocks(); // Clear previous mock calls before each test
  });

  test("renders the input component correctly", () => {
    render(<Input {...defaultProps} />);

    // Check if the label and input are rendered
    expect(screen.getByText("Email *")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter your email *")
    ).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toHaveValue("");
  });

  test("handles input change correctly", () => {
    // Create a wrapper with state to test controlled behavior
    const TestWrapper = () => {
      const [value, setValue] = useState("");
      return (
        <Input
          {...defaultProps}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      );
    };

    render(<TestWrapper />);

    const inputElement = screen.getByPlaceholderText("Enter your email *");

    // Simulate a change event
    fireEvent.change(inputElement, { target: { value: "test@example.com" } });

    // Verify the input value is updated
    expect(inputElement).toHaveValue("test@example.com");
  });

  test("displays error message when provided", () => {
    const propsWithError = {
      ...defaultProps,
      error: "Invalid email",
    };

    render(<Input {...propsWithError} />);

    // Check if the error message is displayed
    expect(screen.getByText("Invalid email")).toBeInTheDocument();
  });

  test("renders optional field correctly without asterisk", () => {
    const optionalProps = {
      ...defaultProps,
      require: false,
      lable: "Username",
      placeholder: "Enter your username",
    };

    render(<Input {...optionalProps} />);

    // Check if the label and placeholder are rendered without the asterisk
    expect(screen.getByText("Username")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter your username")
    ).toBeInTheDocument();
  });
});

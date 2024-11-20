import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { logIn, validateForm } from "../../../utils";
// Configure Testing Library to reduce verbose output
import { configure } from "@testing-library/react";
import Login from "../../../pages/Login";

// Mock utilities
jest.mock("../../../utils", () => ({
  logIn: jest.fn(),
  validateForm: jest.fn(),
}));

// Mock navigation
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

configure({ getElementError: (message) => new Error(message ?? "") });

describe("Login Component", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  test("renders the login page correctly", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    // Verify key UI elements
    expect(screen.getByAltText("GiggleHub")).toBeInTheDocument(); // Logo
    expect(screen.getByText("Log in")).toBeInTheDocument(); // Login button
    expect(
      screen.getByText("Don't have account ? Sign up.")
    ).toBeInTheDocument(); // Signup link
  });

  test("displays validation errors for empty fields", async () => {
    // Mock validation errors
    (validateForm as jest.Mock).mockReturnValue({
      email: "Email is required.",
      password: "Password is required.",
    });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const loginButton = screen.getByText("Log in");
    fireEvent.click(loginButton); // Trigger form submission

    // Validate error messages
    await waitFor(() => {
      expect(validateForm).toHaveBeenCalled();
      expect(screen.getByText("Email is required.")).toBeInTheDocument();
      expect(screen.getByText("Password is required.")).toBeInTheDocument();
    });
  });

  test("navigates to the feed on successful login", async () => {
    // Mock successful login
    (validateForm as jest.Mock).mockReturnValue({});
    (logIn as jest.Mock).mockResolvedValue({ code: 1 });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    // Fill in email and password
    fireEvent.change(screen.getByPlaceholderText("Enter your email *"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter your password *"), {
      target: { value: "password123" },
    });

    const loginButton = screen.getByText("Log in");
    fireEvent.click(loginButton);

    // Validate API interaction and navigation
    await waitFor(() => {
      expect(logIn).toHaveBeenCalledWith("test@example.com", "password123");
      expect(mockNavigate).toHaveBeenCalledWith("/feed");
    });
  });

  test("does not navigate on failed login", async () => {
    // Mock failed login
    (validateForm as jest.Mock).mockReturnValue({});
    (logIn as jest.Mock).mockResolvedValue({ code: 0 });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Enter your email *"), {
      target: { value: "invalid@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter your password *"), {
      target: { value: "wrongpassword" },
    });

    fireEvent.click(screen.getByText("Log in"));

    // Validate no navigation
    await waitFor(() => {
      expect(logIn).toHaveBeenCalledWith(
        "invalid@example.com",
        "wrongpassword"
      );
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });

  test("navigates to signup page when signup link is clicked", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    // Trigger navigation to signup
    fireEvent.click(screen.getByText("Don't have account ? Sign up."));

    // Validate navigation
    expect(mockNavigate).toHaveBeenCalledWith("/signup");
  });
});

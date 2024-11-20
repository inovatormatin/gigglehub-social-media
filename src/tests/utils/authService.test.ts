import { toast } from "react-toastify";
import supabase from "../../configs/supabaseClient";
import { createAccount, logIn } from "../../utils";
import { logOut, secureGraphQLQuery } from "../../utils/authService";
import Cookies from "universal-cookie";

// Mock supabase client
jest.mock("../../configs/supabaseClient", () => ({
  __esModule: true,
  default: {
    auth: {
      signUp: jest.fn(),
      signInWithPassword: jest.fn(),
      signOut: jest.fn(),
      getSession: jest.fn(),
    },
  },
}));

// Mock react-toastify
jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

// Mock universal-cookie
jest.mock("universal-cookie", () => {
  const mockCookies = {
    set: jest.fn(),
    get: jest.fn(),
    remove: jest.fn(),
  };
  return jest.fn(() => mockCookies);
});

const mockCookies = new Cookies();

// Define REACT_APP_TOKEN_SECRET
process.env.REACT_APP_TOKEN_SECRET = "test-secret";

describe("Auth Functions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test: Create Account
  test("should create an account successfully", async () => {
    const mockUserData = { user: { user_metadata: { name: "John Doe" } } };

    (supabase.auth.signUp as jest.Mock).mockResolvedValue({
      data: mockUserData,
      error: null,
    });

    const result = await createAccount("test@example.com", "password123");

    expect(supabase.auth.signUp).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password123",
    });
    expect(result).toEqual(mockUserData.user.user_metadata);
    expect(toast.error).not.toHaveBeenCalled();
    expect(supabase.auth.signOut).toHaveBeenCalled();
  });

  test("should handle signup error when email already exists", async () => {
    (supabase.auth.signUp as jest.Mock).mockResolvedValue({
      data: null,
      error: { message: "Email already exists", code: "user_already_exists" },
    });

    const result = await createAccount("test@example.com", "password123");

    expect(supabase.auth.signUp).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password123",
    });
    expect(toast.error).toHaveBeenCalledWith("Email address already exists.");
    expect(result).toBeNull();
  });

  // Test: Login
  test("should log in successfully", async () => {
    const mockSession = {
      session: { access_token: "mock-token123", user: { id: "user123" } },
    };

    (supabase.auth.signInWithPassword as jest.Mock).mockResolvedValue({
      data: mockSession,
      error: null,
    });

    const result = await logIn("test@example.com", "password123");

    expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password123",
    });
    expect(mockCookies.set).toHaveBeenCalledTimes(2);
    expect(mockCookies.set).toHaveBeenCalledWith(
      "_0_1t",
      "mock-token123test-secret",
      expect.any(Object)
    );
    expect(mockCookies.set).toHaveBeenCalledWith(
      "i06",
      "user123",
      expect.any(Object)
    );
    expect(result).toEqual({ code: 1 });
    expect(toast.error).not.toHaveBeenCalled();
  });

  test("should handle login error for invalid credentials", async () => {
    (supabase.auth.signInWithPassword as jest.Mock).mockResolvedValue({
      data: null,
      error: { message: "Invalid credentials", code: "invalid_credentials" },
    });

    const result = await logIn("test@example.com", "wrongpassword");

    expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "wrongpassword",
    });
    expect(toast.error).toHaveBeenCalledWith("Invalid credentials");
    expect(result).toEqual({ code: 0 });
  });

  // Test: Logout
  test("should call logout function", async () => {
    (supabase.auth.signOut as jest.Mock).mockResolvedValue({ error: null });

    const result = await logOut();

    expect(mockCookies.remove).toHaveBeenCalledTimes(2);
    expect(mockCookies.remove).toHaveBeenCalledWith("_0_1t");
    expect(mockCookies.remove).toHaveBeenCalledWith("i06");
    expect(supabase.auth.signOut).toHaveBeenCalled();
    expect(toast.success).toHaveBeenCalledWith("Logged out.");
    expect(result).toEqual({ code: 1 });
  });

  // Test: Secure GraphQL Query
  test("should make a secure API call with a token", async () => {
    const mockToken = "mock-token123SECRET"; // Token as retrieved by secureGraphQLQuery
    const mockQueryFunction = jest.fn();
    const mockVariables = { id: 1 };

    // Mock the token retrieval
    (mockCookies.get as jest.Mock).mockReturnValue(mockToken);

    await secureGraphQLQuery(mockQueryFunction, mockVariables);

    // Expect the Authorization header to include the full token with SECRET
    expect(mockQueryFunction).toHaveBeenCalledWith({
      variables: mockVariables,
      context: {
        headers: {
          Authorization: `Bearer ${mockToken}`, // Match the unmodified token behavior
        },
      },
    });
  });

  test("should throw an error if the user is not authenticated", async () => {
    (mockCookies.get as jest.Mock).mockReturnValue(null);

    const mockQueryFunction = jest.fn();

    await expect(secureGraphQLQuery(mockQueryFunction, {})).rejects.toThrow(
      "User is not authenticated."
    );

    expect(mockQueryFunction).not.toHaveBeenCalled();
  });
});

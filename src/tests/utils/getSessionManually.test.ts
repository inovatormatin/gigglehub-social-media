// getSessionManually.test.ts

import supabase from "../../configs/supabaseClient";
import { getSessionManually } from "../../utils";
import Cookies from "universal-cookie";

// Mock supabase client
jest.mock("../../configs/supabaseClient", () => ({
  __esModule: true,
  default: {
    auth: {
      getUser: jest.fn(),
    },
  },
}));

// Mock `universal-cookie`
jest.mock("universal-cookie");

const mockedSupabase = supabase as jest.Mocked<typeof supabase>;
const MockedCookies = Cookies as jest.MockedClass<typeof Cookies>;

describe("getSessionManually", () => {
  let mockGet: jest.Mock;

  beforeAll(() => {
    process.env.REACT_APP_TOKEN_SECRET = "SECRET";
  });

  beforeEach(() => {
    jest.clearAllMocks();

    // Set up the mock for Cookies
    mockGet = jest.fn();
    MockedCookies.mockImplementation(() => {
      return {
        get: mockGet,
      } as unknown as Cookies;
    });
  });

  test("should return user details when session token is valid", async () => {
    const mockTokenWithSecret =
      "mock-token123" + process.env.REACT_APP_TOKEN_SECRET;
    const mockToken = "mock-token123";
    const mockUser = { id: "user123", email: "test@example.com" };

    // Mock token retrieval from cookies
    mockGet.mockReturnValue(mockTokenWithSecret);

    // Mock supabase response
    (mockedSupabase.auth.getUser as jest.Mock).mockResolvedValue({
      data: { user: mockUser },
      error: null,
    });

    const result = await getSessionManually();

    expect(mockGet).toHaveBeenCalledWith("_0_1t");
    expect(mockedSupabase.auth.getUser).toHaveBeenCalledWith(mockToken);
    expect(result).toEqual(mockUser);
  });

  test("should return null when no token is present in cookies", async () => {
    // Mock token retrieval from cookies as null
    mockGet.mockReturnValue(null);

    const result = await getSessionManually();

    expect(mockGet).toHaveBeenCalledWith("_0_1t");
    expect(mockedSupabase.auth.getUser).not.toHaveBeenCalled();
    expect(result).toBeNull();
  });

  test("should return null when Supabase returns an error", async () => {
    const mockTokenWithSecret =
      "mock-token123" + process.env.REACT_APP_TOKEN_SECRET;
    const mockToken = "mock-token123";

    // Mock token retrieval from cookies
    mockGet.mockReturnValue(mockTokenWithSecret);

    // Mock supabase error response
    (mockedSupabase.auth.getUser as jest.Mock).mockResolvedValue({
      data: null,
      error: { message: "Invalid token" },
    });

    const result = await getSessionManually();

    expect(mockGet).toHaveBeenCalledWith("_0_1t");
    expect(mockedSupabase.auth.getUser).toHaveBeenCalledWith(mockToken);
    expect(result).toBeNull();
  });
});

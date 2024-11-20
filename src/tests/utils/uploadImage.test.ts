import supabase from "../../configs/supabaseClient";
import { uploadImage } from "../../utils";

// Mock the Supabase client to simulate API behavior
jest.mock("../../configs/supabaseClient", () => ({
  __esModule: true, // Ensure compatibility with ES modules
  default: {
    storage: {
      from: jest.fn(() => ({
        upload: jest.fn(), // Mock the `upload` method
      })),
    },
  },
}));

describe("uploadImage", () => {
  const mockUpload = jest.fn(); // Mock the upload function
  const bucketName = "gigglehub-bucket"; // Bucket name used in the function

  beforeEach(() => {
    // Reset mocks to ensure each test starts with a clean slate
    jest.clearAllMocks();

    // Mock Supabase's `from` and `upload` methods
    (supabase.storage.from as jest.Mock).mockReturnValue({
      upload: mockUpload,
    });
  });

  // Test: Handle the case where no image is provided
  test("should return null if no image is provided", async () => {
    // Call the function with no file
    const result = await uploadImage(null);

    // Verify error logging and null return value
    expect(console.error).toHaveBeenCalledWith("Please select a file.");
    expect(result).toBeNull();
  });

  // Test: Successfully upload a valid image
  test("should upload an image and return the path", async () => {
    // Mock file and successful upload response
    const mockFile = new File(["mock content"], "mockImage.png", {
      type: "image/png",
    });
    const mockUploadResponse = { path: "mock/path/mockImage.png" };

    // Simulate a successful upload
    mockUpload.mockResolvedValue({ data: mockUploadResponse, error: null });

    // Call the function with the mock file
    const result = await uploadImage(mockFile);

    // Verify that Supabase's methods were called correctly
    expect(supabase.storage.from).toHaveBeenCalledWith(bucketName);
    expect(mockUpload).toHaveBeenCalledWith(expect.any(String), mockFile);

    // Ensure the function returns the expected file path
    expect(result).toBe(mockUploadResponse.path);
  });

  // Test: Handle an upload failure and log errors
  test("should log an error and return null if upload fails", async () => {
    // Mock file and failed upload response
    const mockFile = new File(["mock content"], "mockImage.png", {
      type: "image/png",
    });
    const mockError = { message: "Upload failed" };

    // Simulate an upload failure
    mockUpload.mockResolvedValue({ data: null, error: mockError });

    // Call the function with the mock file
    const result = await uploadImage(mockFile);

    // Verify Supabase's methods were called correctly
    expect(supabase.storage.from).toHaveBeenCalledWith(bucketName);
    expect(mockUpload).toHaveBeenCalledWith(expect.any(String), mockFile);

    // Verify that error messages were logged
    expect(console.error).toHaveBeenCalledWith(
      "Error uploading image:",
      mockError
    );
    expect(console.error).toHaveBeenCalledWith(
      "Image upload failed. Please try again."
    );

    // Ensure the function returns null on failure
    expect(result).toBeNull();
  });
});

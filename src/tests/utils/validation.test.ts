import { ValidationRules } from "../../types";
import { validateForm } from "../../utils";

describe("validateForm", () => {
  // Test: Required field validation
  test("should return an error for a required field.", () => {
    const formData = { name: "" }; // Missing required field
    const rules: ValidationRules = {
      name: { required: true, lableName: "Name" },
    };

    const errors = validateForm(formData, rules);

    // Expect an error message for the required field
    expect(errors).toEqual({ name: "Name is required." });
  });

  // Test: Max length validation
  test("should return an error if value exceeds maxLength", () => {
    const formData = { username: "longusername" }; // Exceeds maxLength
    const rules: ValidationRules = {
      username: { maxLength: 5, lableName: "Username" },
    };

    const errors = validateForm(formData, rules);

    // Expect an error message for exceeding max length
    expect(errors).toEqual({ username: "Must be less than 5 characters." });
  });

  // Test: Min length validation
  test("should return an error if value is shorter than minLength", () => {
    const formData = { password: "123" }; // Shorter than minLength
    const rules: ValidationRules = {
      password: { minLength: 6, lableName: "Password" },
    };

    const errors = validateForm(formData, rules);

    // Expect an error message for not meeting min length
    expect(errors).toEqual({ password: "Must be at least 6 characters." });
  });

  // Test: Pattern validation (e.g., invalid email)
  test("should return an error if value does not match pattern", () => {
    const formData = { email: "invalid-email" }; // Invalid email format
    const rules: ValidationRules = {
      email: { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, lableName: "Email" },
    };

    const errors = validateForm(formData, rules);

    // Expect an error message for invalid pattern
    expect(errors).toEqual({ email: "Email is not valid." });
  });

  // Test: Match field validation (e.g., password confirmation)
  test("should return an error if fields do not match", () => {
    const formData = { password: "123456", confirmPassword: "654321" }; // Mismatch
    const rules: ValidationRules = {
      confirmPassword: {
        matchField: "password",
        lableName: "Confirm Password",
      },
    };

    const errors = validateForm(formData, rules);

    // Expect an error message for mismatch
    expect(errors).toEqual({
      confirmPassword: "Confirm Password does not match password.",
    });
  });

  // Test: No errors for valid inputs
  test("should return no errors for valid inputs", () => {
    const formData = {
      name: "John",
      username: "user1",
      password: "mypassword",
      email: "test@example.com",
      confirmPassword: "mypassword",
    };

    const rules: ValidationRules = {
      name: { required: true, lableName: "Name" },
      username: { maxLength: 10, lableName: "Username" },
      password: { minLength: 6, lableName: "Password" },
      email: { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, lableName: "Email" },
      confirmPassword: {
        matchField: "password",
        lableName: "Confirm Password",
      },
    };

    const errors = validateForm(formData, rules);

    // Expect no errors for valid inputs
    expect(errors).toEqual({});
  });
});

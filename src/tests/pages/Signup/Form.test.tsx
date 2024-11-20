// Form.test.tsx

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { SignupData } from "../../../types";
import Form from "../../../pages/Signup/Form";

describe("Form Component", () => {
  const setUserSignUPMock = jest.fn();
  const setErrorMessagesMock = jest.fn();
  const errorMessages = {
    firstname: "First name is required",
    email: "Email is invalid",
  };
  const userSignUP: SignupData = {
    email: "",
    firstname: "",
    password: "",
    username: "",
    verify_password: "",
    city: "",
    lastname: "",
    profile_pic: null,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all form fields", () => {
    render(
      <Form
        userSignUP={userSignUP}
        setUserSignUP={setUserSignUPMock}
        setErrorMessages={setErrorMessagesMock}
        errorMessages={{}}
      />
    );

    // Check for all labels
    expect(screen.getByLabelText("First Name *")).toBeInTheDocument();
    expect(screen.getByLabelText("Last Name")).toBeInTheDocument();
    expect(screen.getByLabelText("User Name *")).toBeInTheDocument();
    expect(screen.getByLabelText("City (optional)")).toBeInTheDocument();
    expect(screen.getByLabelText("E-mail *")).toBeInTheDocument();
    expect(screen.getByLabelText("New Password *")).toBeInTheDocument();
    expect(screen.getByLabelText("Re-Enter Password *")).toBeInTheDocument();
    expect(
      screen.getByLabelText("Upload your profile picture *")
    ).toBeInTheDocument();
  });

  it("updates userSignUP state when inputs change", () => {
    render(
      <Form
        userSignUP={userSignUP}
        setUserSignUP={setUserSignUPMock}
        setErrorMessages={setErrorMessagesMock}
        errorMessages={{}}
      />
    );

    // Simulate input changes
    fireEvent.change(screen.getByLabelText("First Name *"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByLabelText("E-mail *"), {
      target: { value: "john@example.com" },
    });

    expect(setUserSignUPMock).toHaveBeenCalledTimes(2);
  });

  it("displays error messages", () => {
    render(
      <Form
        userSignUP={userSignUP}
        setUserSignUP={setUserSignUPMock}
        setErrorMessages={setErrorMessagesMock}
        errorMessages={errorMessages}
      />
    );

    expect(screen.getByText("First name is required")).toBeInTheDocument();
    expect(screen.getByText("Email is invalid")).toBeInTheDocument();
  });

  it("handles file input change", () => {
    render(
      <Form
        userSignUP={userSignUP}
        setUserSignUP={setUserSignUPMock}
        setErrorMessages={setErrorMessagesMock}
        errorMessages={{}}
      />
    );

    const file = new File(["(⌐□_□)"], "profile.png", { type: "image/png" });
    const fileInput = screen.getByLabelText("Upload your profile picture *");
    Object.defineProperty(fileInput, "files", {
      value: [file],
    });
    fireEvent.change(fileInput);

    expect(setUserSignUPMock).toHaveBeenCalledWith(expect.any(Function));
  });
});

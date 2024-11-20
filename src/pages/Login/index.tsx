// src/components/Login.tsx
import React, { useState } from "react";
import logo from "../../assets/images/logo.png";
import funguy from "../../assets/images/funguy.png";
import { TailButton, TailSpinner } from "../../components";
import { useNavigate } from "react-router-dom";
import { SigninData } from "../../types";
import { SignIn } from "@phosphor-icons/react";
import Form from "./Form";
import { logIn, validateForm } from "../../utils";
import { rules } from "./rules";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessages, setErrorMessages] = useState<Record<string, string>>(
    {}
  );
  const [userSignIn, setUserSignIn] = useState<SigninData>({
    email: "",
    password: "",
  });

  const handleLogIn = async () => {
    const errors = validateForm(userSignIn, rules);
    setErrorMessages(errors);
    // If there are any errors, stop the form submission
    if (Object.keys(errors).length > 0) {
      return;
    }
    setLoading(true);
    const { email, password } = userSignIn;
    const user = await logIn(email, password);
    if (user.code === 1) {
      setLoading(false);
      navigate("/feed");
    } else {
      setLoading(false);
      return;
    }
  };

  return (
    <div className="p-4 w-screen h-screen">
      <div className="flex flex-col items-center justify-evenly h-full">
        <header className="flex flex-row items-center justify-center">
          <img className="w-16" src={logo} alt="GiggleHub" />
          <h1 className="text-2xl ml-2 font-semibold">GiggleHub</h1>
        </header>
        <div className="">
          <h2 className="text-base m-2 font-semibold">Suit Up & Enter.</h2>
          <Form
            errorMessages={errorMessages}
            setUserSignIn={setUserSignIn}
            setErrorMessages={setErrorMessages}
            userSignIn={userSignIn}
          />
        </div>
        <div className="flex flex-col items-center">
          <p
            onClick={() => navigate("/signup")}
            className="text-blue-500 mb-4 cursor-pointer font-medium"
          >
            Don't have account ? Sign up.
          </p>
          <TailButton
            label={loading ? "Wait.." : "Log in"}
            onClick={handleLogIn}
            icon={loading ? <TailSpinner color="gray" /> : <SignIn />}
          />
        </div>
      </div>
      <div>
        <img
          className="absolute bottom-0 right-0 w-1/4"
          src={funguy}
          alt="funguy"
        />
      </div>
    </div>
  );
};

export default Login;

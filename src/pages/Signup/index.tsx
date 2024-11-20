import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { SignIn } from "@phosphor-icons/react";
import logo from "../../assets/images/logo.png";
import funguy from "../../assets/images/funguy.png";
import { SignupData } from "../../types";
import { TailButton, TailSpinner } from "../../components";
import Form from "./Form";
import { rules } from "./rules";
import { useMutation, useLazyQuery } from "@apollo/client";
import { CHECK_USERNAME_EXISTS, SIGNUP_USER } from "../../graphQl";
import { uploadImage, validateForm, createAccount } from "../../utils";

/* SignUp Component: Handles user registration, form validation, and account creation. */
const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  // GraphQL Mutations and Queries
  const [signupUser] = useMutation(SIGNUP_USER);
  const [checkUsernameExists] = useLazyQuery(CHECK_USERNAME_EXISTS);

  // Error messages and user data state
  const [errorMessages, setErrorMessages] = useState<Record<string, string>>({});
  const [userSignUP, setUserSignUP] = useState<SignupData>({
    email: "",
    firstname: "",
    password: "",
    username: "",
    verify_password: "",
    city: "",
    lastname: "",
    profile_pic: null,
  });

  /* Handle form submission for user sign-up. */
  const handleSignUp = async () => {
    // Validate form data based on predefined rules
    const errors = validateForm(userSignUP, rules);
    setErrorMessages(errors);

    // Stop the process if there are validation errors
    if (Object.keys(errors).length > 0) {
      return;
    }

    setLoading(true);

    const { email, firstname, password, username, city, lastname, profile_pic } = userSignUP;

    try {
      // Check if the username already exists
      const { data: usernameData } = await checkUsernameExists({ variables: { username } });
      if (usernameData?.usersCollection?.edges.length > 0) {
        toast.error("Username already exists. Please choose a different username.");
        setLoading(false);
        return;
      }

      // Create auth user account supabase
      const userCreds = await createAccount(email, password);
      if (!userCreds) {
        setLoading(false);
        return;
      }

      // Upload profile picture to Supabase Storage
      const imagePath = await uploadImage(profile_pic);
      if (!imagePath) {
        toast.error("Image upload failed. Please try again.");
        setLoading(false);
        return;
      }

      // Save user data to Supabase using GraphQL mutation
      await signupUser({
        variables: {
          id: userCreds.sub,
          username,
          email: userCreds.email,
          firstname,
          lastname,
          city,
          profile_pic: imagePath
        },
      });

      toast.success("Account created successfully. Please sign in.");
      setLoading(false);
      navigate("/signin");
    } catch (error) {
      console.error("Error signing up:", error);
      toast.error("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };


  return (
    <div className="p-4 w-screen h-screen">
      <div className="flex flex-col items-center justify-evenly h-full">
        {/* Header Section */}
        <header className="flex flex-row items-center justify-center">
          <img className="w-16" src={logo} alt="GiggleHub Logo" />
          <h1 className="text-2xl ml-2 font-semibold">GiggleHub</h1>
        </header>

        {/* Sign-Up Form */}
        <div>
          <h2 className="text-base m-2 font-semibold">Let's go! Summon Your Account.</h2>
          <Form
            errorMessages={errorMessages}
            setUserSignUP={setUserSignUP}
            setErrorMessages={setErrorMessages}
            userSignUP={userSignUP}
          />
        </div>

        {/* Sign-Up Button */}
        <div className="flex flex-col items-center">
          <p onClick={() => navigate("/signin")} className="text-blue-500 mb-4 cursor-pointer font-medium">
            Already a user? Sign in.
          </p>
          <TailButton
            label={loading ? "In Process" : "Sign Up"}
            onClick={handleSignUp}
            icon={loading ? <TailSpinner color="gray" /> : <SignIn />}
          />
        </div>
      </div>

      {/* Fun Image */}
      <div>
        <img className="absolute bottom-0 right-0 w-1/4" src={funguy} alt="Fun Guy" />
      </div>
    </div>
  );
};

export default SignUp;

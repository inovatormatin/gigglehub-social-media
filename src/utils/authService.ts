import supabase from "../configs/supabaseClient";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
const cookies = new Cookies();

// Sign Up Function
export const createAccount = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.error("Signup Error:", error.message);
    if (error.code === "user_already_exists") {
      toast.error("Email address already exists.");
    } else {
      toast.error("Account creation failed.");
    }
    return null;
  }

  // Immediately sign out the user after sign-up
  await supabase.auth.signOut();

  return data?.user?.user_metadata;
};

// Login Function
export const logIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    console.error("Login Error:", error.message);
    if (error.code === "invalid_credentials") {
      toast.error(error.message);
    } else {
      toast.error(error.message);
    }
    return {
      code: 0,
    };
  }
  // Manually store session in cookies
  if (data?.session?.access_token) {
    const expires = new Date();
    expires.setDate(expires.getDate() + 1);
    cookies.set(
      "_0_1t",
      data.session.access_token + process.env.REACT_APP_TOKEN_SECRET,
      { expires }
    );
    cookies.set("i06", data.session.user.id, { expires });
  }
  return {
    code: 1,
  };
};

// Logout Function
export const logOut = async () => {
  cookies.remove("_0_1t");
  cookies.remove("i06");
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Logout Error:", error.message);
    toast.error(error.message);
    return {
      code: 0,
    };
  }
  return {
    code: 1,
  };
};

// Secured Api call
export const secureGraphQLQuery = async (
  queryFunction: any,
  variables: any
) => {
  // Retrieving the token from the cookie
  const tokenWithSecret = cookies.get("_0_1t");

  // Check if the token exists and remove the secret part (if needed)
  const token = tokenWithSecret
    ? tokenWithSecret.replace(process.env.REACT_APP_TOKEN_SECRET, "")
    : null;

  if (!token) {
    throw new Error("User is not authenticated.");
  }
  return queryFunction({
    variables,
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });
};

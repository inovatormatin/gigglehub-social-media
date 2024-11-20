import supabase from "../configs/supabaseClient";
import Cookies from "universal-cookie";

// Get Session Manually
export const getSessionManually = async () => {
  const cookies = new Cookies();
  const tokenWithSecret = cookies.get("_0_1t");
  if (!tokenWithSecret) return null;

  // Use the token to get user details
  const token = tokenWithSecret
    ? tokenWithSecret.replace(process.env.REACT_APP_TOKEN_SECRET, "")
    : null;

  const { data, error } = await supabase.auth.getUser(token);
  if (error) {
    console.error("Session Error:", error.message);
    return null;
  }

  return data.user;
};

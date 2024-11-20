export const rules = {
  firstname: { required: true, maxLength: 20, lableName: "First name" },
  lastname: { required: false, maxLength: 20, lableName: "Last name" },
  city: { required: false, maxLength: 50, lableName: "City" },
  email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, lableName: "E-mail" },
  username: { required: true, maxLength: 20, lableName: "Username" },
  password: {
    required: true,
    minLength: 8,
    pattern: /^(?=.*[A-Z])(?=.*\d)/,
    customMessage: "Must contain at least one uppercase letter and one digit.",
    lableName: "Password"
  },
  verify_password: {
    required: true,
    matchField: "password",
    customMessage: "Password did not matched.",
    lableName: "Password"
  },
  profile_pic: {
    required: true,
    lableName: "Profile pic"
  }
};

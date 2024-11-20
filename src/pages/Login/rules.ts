export const rules = {
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    lableName: "E-mail",
  },
  password: {
    required: true,
    lableName: "Password",
  },
};

import React from "react";
import { SigninData } from "../../types";
import { TailInput } from "../../components";

interface Fprops {
  userSignIn: SigninData;
  setErrorMessages: React.Dispatch<
    React.SetStateAction<Record<string, string>>
  >;
  errorMessages: Record<string, string>;
  setUserSignIn: React.Dispatch<React.SetStateAction<SigninData>>;
}

const Form: React.FC<Fprops> = ({
  userSignIn,
  errorMessages,
  setUserSignIn,
  setErrorMessages,
}) => {
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    let name: string = event.target.name;
    let value: string = event.target.value;
    setErrorMessages({});
    setUserSignIn((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  return (
    <>
      {/* Email */}
      <TailInput
        require={true}
        type="email"
        lable="E-mail"
        placeholder="Enter your email"
        name="email"
        value={userSignIn.email}
        onChange={onChangeHandler}
        error={errorMessages.email}
      />
      {/* Password */}
      <TailInput
        type="password"
        require={true}
        lable="Password"
        placeholder="Enter your password"
        name="password"
        value={userSignIn.password}
        onChange={onChangeHandler}
        error={errorMessages.password}
      />
    </>
  );
};

export default Form;

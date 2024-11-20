import React from "react";
import { TailFileSelector, TailInput } from "../../components";
import { SignupData } from "../../types";

interface Fprops {
  userSignUP: SignupData;
  setErrorMessages: React.Dispatch<
    React.SetStateAction<Record<string, string>>
  >;
  errorMessages: Record<string, string>;
  setUserSignUP: React.Dispatch<React.SetStateAction<SignupData>>;
}

const Form: React.FC<Fprops> = ({
  userSignUP,
  errorMessages,
  setUserSignUP,
  setErrorMessages,
}) => {
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    let name: string = event.target.name;
    let value: string = event.target.value;
    setErrorMessages({});

    // Check if the name is 'profile_pic' and if files are selected
    if (
      name === "profile_pic" &&
      event.target.files &&
      event.target.files?.[0]
    ) {
      // Update the 'profile_pic' in the state with the selected file
      setUserSignUP((prev) => ({
        ...prev,
        [name]: event.target.files?.[0], // Set the selected file
      }));
    } else {
      // For other inputs, update the state with the string value
      setUserSignUP((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <>
      <section className="flex">
        {/* First Name */}
        <TailInput
          require={true}
          type="text"
          lable="First Name"
          placeholder="Enter first name"
          name="firstname"
          value={userSignUP.firstname}
          onChange={onChangeHandler}
          error={errorMessages.firstname}
        />

        {/* Last Name */}
        <TailInput
          type="text"
          lable="Last Name"
          placeholder="Enter last name"
          name="lastname"
          value={userSignUP.lastname}
          onChange={onChangeHandler}
          error={errorMessages.lastname}
        />
      </section>
      <section className="flex">
        {/* User name */}
        <TailInput
          type="text"
          require={true}
          lable="User Name"
          placeholder="Choose a unique username"
          name="username"
          value={userSignUP.username}
          onChange={onChangeHandler}
          error={errorMessages.username}
        />
        {/* City */}
        <TailInput
          type="text"
          lable="City (optional)"
          placeholder="Your city"
          name="city"
          value={userSignUP.city}
          onChange={onChangeHandler}
          error={errorMessages.city}
        />
      </section>
      {/* Email */}
      <TailInput
        require={true}
        type="email"
        lable="E-mail"
        placeholder="Enter your email"
        name="email"
        value={userSignUP.email}
        onChange={onChangeHandler}
        error={errorMessages.email}
      />
      <section className="flex">
        {/* Password */}
        <TailInput
          type="password"
          require={true}
          lable="New Password"
          placeholder="Enter a strong password"
          name="password"
          value={userSignUP.password}
          onChange={onChangeHandler}
          error={errorMessages.password}
        />
        {/* Confirm password */}
        <TailInput
          type="password"
          require={true}
          lable="Re-Enter Password"
          placeholder="Confirm your password"
          name="verify_password"
          value={userSignUP.verify_password}
          onChange={onChangeHandler}
          error={errorMessages.verify_password}
        />
      </section>
      {/* Profile pic */}
      <TailFileSelector
        require={true}
        name="profile_pic"
        placeholder="Upload your profile picture"
        value={userSignUP.profile_pic || null}
        onChange={onChangeHandler}
        error={errorMessages.profile_pic}
      />
    </>
  );
};

export default Form;

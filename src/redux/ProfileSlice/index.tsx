import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UpdateFollowing, ProfileSliceTypes, UpdateFollower } from "../../types";

const initialState: ProfileSliceTypes = {
  id: "",
  email: "",
  firstname: "",
  lastname: "",
  username: "",
  city: "",
  profile_pic: "",
  followers: 0,
  following: 0
};

export const profileSlice = createSlice({
  name: "profileSlice",
  initialState,
  reducers: {
    // To set data
    storeUserInfo: (state, action: PayloadAction<ProfileSliceTypes>) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.firstname = action.payload.firstname;
      state.lastname = action.payload.lastname;
      state.username = action.payload.username;
      state.city = action.payload.city;
      state.profile_pic = action.payload.profile_pic;
      state.followers = action.payload.followers;
      state.following = action.payload.following;
    },
    // To Update Following count
    updateFollowing: (state, action: PayloadAction<UpdateFollowing>) => {
      state.following = action.payload.following;
    },
    // To Update Followers count
    updateFollowers: (state, action: PayloadAction<UpdateFollower>) => {
      state.followers = action.payload.follower;
    },
    // To reset state to initial values
    resetUserInfo: (state) => {
      return initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { storeUserInfo, resetUserInfo, updateFollowing, updateFollowers } = profileSlice.actions;

export default profileSlice.reducer;

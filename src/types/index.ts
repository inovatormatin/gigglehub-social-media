interface SigninData {
  email: string;
  password: string;
} // Data need to be send in order to sign-in

interface PostType {
  image_url: string;
  created_at: string;
  author_id: number;
  caption: string;
  mention: string[];
  tags: string[];
  is_followed: boolean;
  profile_pic: string | null;
  firstname: string;
  lastname: string;
  username: string;
  city: string;
}

interface AddingPostData {
  caption: string;
  image?: File | null;
  tags?: string[];
  mention?: string[];
} // Adding Post

interface SignupData {
  email: string;
  username: string;
  firstname: string;
  lastname?: string;
  city?: string;
  profile_pic?: File | null;
  password: string;
  verify_password: string;
} // Data need to be send in order to sign-up

interface UserType {
  id: string;
  firstname: string;
  lastname: string;
  profile_pic: string;
  city: string;
}

interface UsersListType {
  node: UserType;
}

interface UpdateFollowing {
  following: number;
}

interface UpdateFollower {
  follower: number;
}

interface AppSliceTypes {
  openPostForm: boolean;
  openFollwerMod: boolean;
  openFollwingMod: boolean;
  refreshAvailable: boolean;
}

interface ProfileSliceTypes {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  username: string;
  city: string;
  profile_pic: string;
  followers: number;
  following: number;
}

type ValidationRule = {
  required?: boolean;
  maxLength?: number;
  minLength?: number;
  pattern?: RegExp;
  matchField?: string;
  lableName?: string;
  customMessage?: string;
};

type ValidationRules = {
  [key: string]: ValidationRule;
};

type ValidationErrors = {
  [key: string]: string;
};

export {
  SignupData,
  ValidationRules,
  ValidationErrors,
  SigninData,
  UsersListType,
  UpdateFollowing,
  UpdateFollower,
  AppSliceTypes,
  ProfileSliceTypes,
  AddingPostData,
  PostType,
};

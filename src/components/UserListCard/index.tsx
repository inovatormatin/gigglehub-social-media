import React, { useState } from "react";
import TailButton from "../Tailwind/Button"
import { useMutation } from "@apollo/client";
import { FOLLOW_USER, UNFOLLOW_USER } from "../../graphQl";
import Cookies from "universal-cookie";
import { secureGraphQLQuery } from "../../utils";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../../redux/store";
import { updateFollowing } from "../../redux/ProfileSlice";
import { TailSpinner } from "..";
const cookies = new Cookies();

interface Fprops {
  data: {
    id: string;
    firstname: string;
    lastname: string;
    profile_pic: string;
    city: string;
  };
}
const UserListCard: React.FC<Fprops> = ({ data }) => {
  const { following } = useAppSelector(state => state.profileState)
  const dispatch = useDispatch<AppDispatch>();
  const [userFollowing, setUserFollowing] = useState<boolean>(false);
  const [followUserQuery, { loading: fetchFollowReq }] = useMutation(FOLLOW_USER);
  const [unFollowUserQuery, { loading: fetchUnFollowReq }] = useMutation(UNFOLLOW_USER);

  // Requset Handler
  const reqHandler = () => {
    if (userFollowing) {
      sendUnfollowReq(); // send Unfollow request if user follow
    } else {
      sendFollowReq(); // send follow request if user doesnt follow
    }
  }
  // Send Follow request
  const sendFollowReq = async () => {
    const uid = cookies.get("i06");
    try {
      const { data: followUser, } = await secureGraphQLQuery(followUserQuery, {
        follower_id: uid,
        following_id: data.id
      });
      dispatch(updateFollowing({ following: followUser.followuserfnc }));
      setUserFollowing(true)
    } catch (err) {
      console.error(err)
    }
  }

  // Send UnFollow request
  const sendUnfollowReq = async () => {
    const uid = cookies.get("i06");
    try {
      const { data: res, } = await secureGraphQLQuery(unFollowUserQuery, {
        follower_id: uid,
        following_id: data.id
      });
      if (res.unfollow_user === true) {
        dispatch(updateFollowing({ following: following - 1 }));
        setUserFollowing(false)
      } else {
        console.error('Something went wrong')
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center">
        <img
          className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full object-cover"
          src={process.env.REACT_APP_SUPABASE_IMAGE_URI + data.profile_pic}
          alt={data.firstname}
        />
        <section className="ml-2">
          <h1 className="text-sm font-medium">
            {data.firstname + " " + data.lastname}
          </h1>
          <h2 className="text-xs font-normal">{data.city}</h2>
        </section>
      </div>
      <TailButton
        size="xs"
        label={userFollowing ? "Following" : "Follow"}
        color={userFollowing ? "slate" : "blue"}
        onClick={reqHandler}
        disabled={fetchFollowReq || fetchUnFollowReq}
        icon={(fetchFollowReq || fetchUnFollowReq) && <TailSpinner />}
      />
    </div>
  );
};

export default UserListCard;

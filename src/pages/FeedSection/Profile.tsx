import React, { useEffect, useState } from "react";
import { DotsNine, EnvelopeSimple, MapPin, Power } from "@phosphor-icons/react";
import { ProfileCardSkeleton, TailButton, TailSpinner } from "../../components";
import { logOut, secureGraphQLQuery } from "../../utils";
import { useNavigate } from "react-router-dom";
import { GET_USER_INFO } from "../../graphQl";
import { useLazyQuery } from "@apollo/client";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../../redux/store";
import { resetUserInfo, storeUserInfo } from "../../redux/ProfileSlice";
import Cookies from "universal-cookie";
const cookies = new Cookies()

const Profile: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const profileState = useAppSelector(state => state.profileState);
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [getUserInfoQuery, { loading: fetchUserInfo }] =
    useLazyQuery(GET_USER_INFO);
  // User Logout handler
  const logoutHandler = async () => {
    setLoading(true);
    const { code } = await logOut();
    if (code === 1) {
      setLoading(false);
      dispatch(resetUserInfo())
      navigate("/signin");
    } else {
      setLoading(false);
    }
  };

  // Fetch user
  useEffect(() => {
    const uid = cookies.get('i06')
    const getUserInfo = async () => {
      try {
        const { data } = await secureGraphQLQuery(getUserInfoQuery, {
          id: uid,
        });
        const response = data?.usersCollection?.edges?.[0]?.node;
        dispatch(
          storeUserInfo({
            id: response?.id,
            email: response?.email,
            firstname: response?.firstname,
            lastname: response?.lastname,
            username: response?.username,
            city: response?.city,
            profile_pic: response?.profile_pic,
            followers: response?.followers,
            following: response?.following,
          })
        );
      } catch (error) {
        console.error(error);
      }
    };
    if (uid) getUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {fetchUserInfo ? (
        <ProfileCardSkeleton />
      ) : (
        <div className="relative bg-gray-100 border border-gray-300 rounded-lg p-4 flex flex-col items-center">
          <DotsNine className="absolute top-2 right-2 cursor-pointer" />
          <img
            className="my-4 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full object-cover"
            loading="lazy"
            src={`${process.env.REACT_APP_SUPABASE_IMAGE_URI}${profileState.profile_pic}`}
            alt={profileState.username}
          />
          <section className="text-center">
            <h1 className="text-xl font-semibold">{profileState.firstname + " " + profileState.lastname}</h1>
            <h3 className="text-base font-medium">{profileState.username}</h3>
          </section>
          <section className="my-2 flex flex-col items-center">
            <p className="flex items-center text-sm font-normal max-w-xs truncate">
              <EnvelopeSimple className="mr-1" />
              {profileState.email}
            </p>
            {profileState.city &&
            <p className="flex items-center text-sm font-normal max-w-xs truncate">
              <MapPin className="mr-1" />
              {profileState.city}
            </p>
            }
          </section>
          <section className="w-full flex justify-evenly mb-2">
            <h4 className="text-sm font-medium">{profileState.followers} Followers</h4>
            <h4 className="text-sm font-medium">{profileState.following} Following</h4>
          </section>
          <TailButton
            size="xs"
            label={loading ? "Wait" : "Log out"}
            disabled={loading}
            color="red"
            icon={loading ? <TailSpinner color="white" /> : <Power />}
            onClick={logoutHandler}
          />
        </div>
      )}
    </>
  );
};

export default Profile;

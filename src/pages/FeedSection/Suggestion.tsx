import React, { useEffect, useState } from "react";
import { UserListCard, UserListSkeleton } from "../../components";
import { useLazyQuery } from "@apollo/client";
import { GET_ALL_USERS, GET_USER_FOLLOWERS } from "../../graphQl";
import { secureGraphQLQuery } from "../../utils";
import { UsersListType } from "../../types";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
const cookies = new Cookies();

const Suggestion: React.FC = () => {
    const naviage = useNavigate();
    const [uniLoader, setUniLoader] = useState<boolean>(false);
    const [listOfUsers, setListOfUsers] = useState<UsersListType[]>([]);
    const [getAllUserQuery, { loading: fetchAllUser, error: errorAllUser }] =
        useLazyQuery(GET_ALL_USERS);
    const [getUserFollowers, { loading: fetchUserFollowers, error: errorUserFollowers }] =
        useLazyQuery(GET_USER_FOLLOWERS);

    // Fetch api
    useEffect(() => {
        const uid = cookies.get("i06");
        const getUsers = async () => {
            try {
                setUniLoader(true);
                // Get user followers
                const { data: userFollowerdata } = await secureGraphQLQuery(getUserFollowers, {
                    id: uid,
                });
                const usersFollower: string[] = await userFollowerdata?.followersCollection?.edges.map(
                    (item: { node: { users: { id: string } } }) => item?.node?.users?.id
                ); // Extracting user followers Id

                // Get all users
                const { data: allUserData } = await secureGraphQLQuery(getAllUserQuery, {
                    id: uid,
                });

                // Fillter alluser list according to user dont follow for suggestion
                const allUsers = allUserData?.usersCollection?.edges.filter((item: { node: { id: string } }) => !usersFollower.includes(item?.node?.id));
                setListOfUsers(allUsers);
                setUniLoader(false);
            } catch (error) {
                console.error(error);
                setUniLoader(false);
            }
        };
        if (uid) getUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    console.log(!errorAllUser, "adn ", !errorUserFollowers)

    useEffect(() => {
        if(errorAllUser || errorUserFollowers){
            cookies.remove('_0_1t');
            cookies.remove('i06');
            naviage('/signin')
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[errorAllUser, errorUserFollowers])
    return (
        <div className="relative bg-gray-100 border border-gray-300 rounded-lg p-4">
            <h1 className="text-lg font-semibold">People Suggestion</h1>
            {!errorAllUser && !errorUserFollowers &&
                <section className="mt-3">
                    {fetchAllUser || fetchUserFollowers || uniLoader
                        ? Array(5)
                            .fill(null)
                            .map((_, idx) => <UserListSkeleton key={idx} />)
                        : listOfUsers.map((item, idx) => {
                            const { id, firstname, lastname, profile_pic, city } = item?.node;
                            const data = {
                                id,
                                firstname,
                                lastname,
                                profile_pic,
                                city,
                            };
                            return <UserListCard key={idx} data={data} />;
                        })}
                </section>
            }
        </div>
    );
};

export default Suggestion;

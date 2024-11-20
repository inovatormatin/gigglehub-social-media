import { gql } from "@apollo/client";

export const SIGNUP_USER = gql`
  mutation SignupUser(
    $id: String!
    $username: String!
    $email: String!
    $firstname: String!
    $lastname: String!
    $city: String!
    $profile_pic: String!
  ) {
    insertIntousersCollection(
      objects: [
        {
          id: $id
          username: $username
          email: $email
          firstname: $firstname
          lastname: $lastname
          city: $city
          profile_pic: $profile_pic
        }
      ]
    ) {
      records {
        id
        username
        email
        firstname
        lastname
        city
        profile_pic
      }
    }
  }
`;

export const CHECK_USERNAME_EXISTS = gql`
  query CheckUsernameExists($username: String!) {
    usersCollection(filter: { username: { eq: $username } }) {
      edges {
        node {
          id
          username
        }
      }
    }
  }
`;

export const GET_USER_INFO = gql`
  query GetUserInfo($id: String!) {
    usersCollection(filter: { id: { eq: $id } }) {
      edges {
        node {
          id
          email
          firstname
          lastname
          username
          city
          profile_pic
          followers
          following
        }
      }
    }
  }
`;

export const GET_ALL_USERS = gql`
  query GetUsersNotFollowing($id: String!) {
    usersCollection(filter: { id: { neq: $id } }) {
      edges {
        node {
          id
          firstname
          lastname
          profile_pic
          city
        }
      }
    }
  }
`;

export const GET_USER_FOLLOWERS = gql`
  query GetFollowers($id: String!) {
    followersCollection(filter: { follower_id: { eq: $id } }) {
      edges {
        node {
          users {
            id
            username
            firstname
            lastname
            profile_pic
          }
        }
      }
    }
  }
`;

export const FOLLOW_USER = gql`
  mutation FollowUser($follower_id: String!, $following_id: String!) {
    insertIntofollowersCollection(
      objects: { follower_id: $follower_id, following_id: $following_id }
    ) {
      records {
        following_id
      }
    }
    followuserfnc(followeruid: $following_id, followinguid: $follower_id) {
      following_count
    }
  }
`;

export const UNFOLLOW_USER = gql`
  mutation Unfollow($follower_id: String!, $following_id: String) {
    unfollow_user(followeruid: $follower_id, followinguid: $following_id)
  }
`;

export const ADD_POST = gql`
  mutation AddPost(
    $author_id: String!
    $caption: String!
    $image_url: String!
    $mention: [String!]
    $tags: [String!]
  ) {
    insertIntopostsCollection(
      objects: [
        {
          author_id: $author_id
          caption: $caption
          image_url: $image_url
          mention: $mention
          tags: $tags
        }
      ]
    ) {
      records {
        author_id
        caption
        image_url
        created_at
        mention
        tags
      }
    }
  }
`;

export const GET_PRIORITIZED_POSTS = gql`
  query GetPostsForFollowing(
    $currentUserId: String!
    $pageSize: Int!
    $offset: Int!
  ) {
    usersCollection(where: { id: { _eq: $currentUserId } }) {
      id
      followersCollection {
        nodes {
          following_id
          postsCollection(
            where: { author_id: { _eq: $following_id } }
            limit: $pageSize
            offset: $offset
          ) {
            nodes {
              id
              image_url
              createdat
              caption
              mention
              tags
            }
          }
        }
      }
    }
  }
`;

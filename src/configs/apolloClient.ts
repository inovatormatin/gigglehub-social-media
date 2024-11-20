import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

// Setup for apollo client
const client = new ApolloClient({
  link: new HttpLink({
    uri: process.env.REACT_APP_SUPABASE_GRAPQL_URI,
    headers: {
      apiKey: process.env.REACT_APP_SUPABASE_API_KEY || "",
    },
  }),
  cache: new InMemoryCache(),
});

export default client;

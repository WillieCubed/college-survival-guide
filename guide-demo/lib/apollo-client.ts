import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: process.env.URL_BASE,
  cache: new InMemoryCache(),
});

export default client;
import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setClient } from "svelte-apollo";
import { apolloAuthContext } from "./auth.context";

const httpLink = createHttpLink({
  uri: "http://localhost:3000/graphql",
});

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
  link: apolloAuthContext.concat(httpLink),
  cache,
});

setClient(apolloClient);

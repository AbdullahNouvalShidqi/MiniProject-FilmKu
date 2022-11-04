import { ApolloClient, InMemoryCache } from "@apollo/client";
import CONST from "../utils/contants";

const defaultOptions = {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  }

const client = new ApolloClient({
    uri: CONST.GRAPHQL_BASE_URL,
    cache: new InMemoryCache(),
    defaultOptions: defaultOptions,
    headers: {
        'x-hasura-admin-secret': CONST.GRAPHQL_ADMIN_SECRET
    }
})

export default client;
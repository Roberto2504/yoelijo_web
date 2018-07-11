import ApolloClient, { createNetworkInterface } from 'apollo-client';
import Cookies from 'js-cookie';
import { accessDeniedHandler } from '../helpers/auth';

const networkInterface = createNetworkInterface({
  uri: process.env.API_URL,
});

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {}; // Create the header object if needed.
    }
    // get the authentication token from local storage if it exists
    const bToken = Cookies.getJSON('token');
    if (bToken) {
      req.options.headers.authorization = `Bearer ${bToken.token}`;
    }
    next();
  },
}]);

networkInterface.useAfter([{
  applyAfterware({ response }, next) {
    if (response.status === 401 || response.statusText === 'Unauthorized') {
      accessDeniedHandler();
    }
    next();
  },
}]);

const apolloClient = new ApolloClient({
  networkInterface,
  dataIdFromObject: (result) => {
    const exclusions = ['DashboardOutput'];

    if (exclusions.includes(result.__typename)) {
      return null;
    }

    if (result.id && result.__typename) {
      return result.__typename + result.id;
    }

    return null;
  },
});

export default apolloClient;

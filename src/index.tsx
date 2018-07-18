import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { InMemoryCache, defaultDataIdFromObject } from 'apollo-cache-inmemory';
// import gql from "graphql-tag";

import { ApolloProvider } from 'react-apollo';

import App from 'components/App';
import registerServiceWorker from 'services/registerServiceWorker';

const apolloCache = new InMemoryCache({
  // This method is how you can provide a unique identifier for each object stored in the cache
  // (we need this since all objects are normalized into maps, so we need an id for the key)
  dataIdFromObject: (object: any) => {
    switch (object.__typename) {
      case 'foo': return object.key; // use `key` as the primary key
      case 'bar': return `bar:${object.blah}`; // use `bar` prefix and `blah` as the primary key
      case 'MarqueeInfoItem': return object.id;
      case 'CarouselInfos': return object.id;
      default: return defaultDataIdFromObject(object); // fall back to default handling
    }
  }
});

console.log('re calling index.tsx');
// This defines default values and resolvers for any local client variables that are not passed through
// to the server.
const clientState = {
  defaults: {
    MarqueeInfos: [{
      id: 1,
      text: 'Place Content Here!',
      color: '#000000',
      background: '#FFFFFF',
      display: true,
      __typename: 'MarqueeInfoItem',
    }],
    CarouselInfos: [],  
    isLoggedIn: false,
    navStyle: 'tiles',
    userName: '',
    marqueeText: 'Place Content Here!',
    marqueeDisplaying: true,
    marqueeColor: '000000',
    carouselInfo: 'ice cream',
  },
  resolvers: {
    Mutation: {
      updateLoginStatus: (_, { loggedIn, userName }, { cache }) => {
        cache.writeData({ data: { isLoggedIn: loggedIn, userName }});
        return null;
      },
      updateNavType: (_, {navStyle}, { cache }) => {
        cache.writeData({ data: { navStyle }});
        return null;
      }
    }
  }
};

const client = new ApolloClient({
  // url is set via environment parameter in .env or .env.local file
  uri: process.env.REACT_APP_GRAPHQL_URL,
  cache: apolloCache,
  clientState
});

// This is the starting point to the react application.  It will 
// render the App component into the <div id="root"></div> element
// of the html.  The template html used by webpack can be found in the 
// public folder, sibling to src and node_modules.
ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App client={client} />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root') as HTMLElement
);

// This comes with create-react-app by default.  It allows us to 
// register javascript as a service worker in the browser, which 
// caches content to allow user to interact with the app in low or no
// internet connectivity.
registerServiceWorker();


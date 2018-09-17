import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import {InMemoryCache, defaultDataIdFromObject} from 'apollo-cache-inmemory';

import {ApolloProvider} from 'react-apollo';

import App from 'components/App';
import registerServiceWorker from 'services/registerServiceWorker';

const apolloCache = new InMemoryCache({
  // This method is how you can provide a unique identifier for each object stored in the cache
  // (we need this since all objects are normalized into maps, so we need an id for the key)
  dataIdFromObject: (object:any) => {
    switch (object.__typename) {
      case 'foo':
        return object.key; // use `key` as the primary key
      case 'bar':
        return `bar:${object.blah}`; // use `bar` prefix and `blah` as the primary key
      case 'MarqueeInfoItem':
        return `marquee:${object.id}`;
      case 'CarouselInfoItem':
        return `carousel:${object.id}`;
      case 'User':
        return object.userName;
      default:
        return defaultDataIdFromObject(object); // fall back to default handling
    }
  }
});

const marqueeInfo = {
  id: 1,
  text: 'Place Content Here!',
  color: '#000000',
  background: '#FFFFFF',
  display: true,
  __typename: 'MarqueeInfoItem',
};

const carouselInfos = [
  {
    id: 1,
    text: 'First carousel item',
    imgUrl: 'https://us-east-1.tchyn.io/snopes-production/uploads/2017/12/science-stock-image.png',
    webUrl: 'https://www.emsl.pnl.gov/emslweb/',
    order: 1,
    display: true,
    __typename: 'CarouselInfoItem',
  },
  {
    id: 2,
    text: 'Second carousel item',
    imgUrl: 'https://www.thegreatcourses.com/media/catalog/product/cache/1/image/800x600/0f396e8a55728e79b48334e699243c07/1/3/1350---base_image_1.1474391708.jpg',
    webUrl: 'https://www.emsl.pnl.gov/emslweb/',
    order: 2,
    display: true,
    __typename: 'CarouselInfoItem',
  },
  {
    id: 3,
    text: 'Third carousel item',
    imgUrl: 'http://www.pngmart.com/files/4/Science-PNG-Picture.png',
    webUrl: 'https://www.emsl.pnl.gov/emslweb/',
    order: 3,
    display: false,
    __typename: 'CarouselInfoItem',
  },
  {
    id: 4,
    text: 'First carousel item',
    imgUrl: 'https://us-east-1.tchyn.io/snopes-production/uploads/2017/12/science-stock-image.png',
    webUrl: 'https://www.emsl.pnl.gov/emslweb/',
    order: 4,
    display: true,
    __typename: 'CarouselInfoItem',
  },
  {
    id: 5,
    text: 'Second carousel item',
    imgUrl: 'https://www.thegreatcourses.com/media/catalog/product/cache/1/image/800x600/0f396e8a55728e79b48334e699243c07/1/3/1350---base_image_1.1474391708.jpg',
    webUrl: 'https://www.emsl.pnl.gov/emslweb/',
    order: 5,
    display: true,
    __typename: 'CarouselInfoItem',
  },
  {
    id: 6,
    text: 'Third carousel item',
    imgUrl: 'http://www.pngmart.com/files/4/Science-PNG-Picture.png',
    webUrl: 'https://www.emsl.pnl.gov/emslweb/',
    order: 6,
    display: false,
    __typename: 'CarouselInfoItem',
  }
];

const users = [
  {
    userName: 'superadmin',
    password: 'admin',
    email: 'admin@test.com',
    roleLevel: 999,
    __typename: 'User',
  },
  {
    userName: 'admin',
    password: 'admin',
    email: 'admin@test.com',
    roleLevel: 999,
    __typename: 'User',
  },
  {
    userName: 'guest',
    password: 'password',
    email: 'guest@outside.net',
    roleLevel: 1,
    __typename: 'User',
  },
  {
    userName: 'user',
    password: 'password',
    email: 'user@registered.gov',
    roleLevel: 10,
    __typename: 'User',
  }
];

const adminUser = {
  userName: 'admin',
  roleLevel: 999,
  __typename: 'CurrentUser'

}

// This defines default values and resolvers for any local client variables that are not passed through
// to the server.
const clientState = {
  defaults: {
    MarqueeInfos: [marqueeInfo],
    CarouselInfos: carouselInfos,
    Users: users,
    navCollapsed: true,
    CurrentUser: [adminUser],
  },
  resolvers: {
    Mutation: {
      updateLoginStatus: (_, {loggedIn, userName}, {cache}) => {
        cache.writeData({data: {isLoggedIn: loggedIn, userName}});
        return null;
      },
      updateNavType: (_, {navCollapsed}, {cache}) => {
        cache.writeData({data: {navCollapsed}});
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
      <App client={client}/>
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root') as HTMLElement
);

// This comes with create-react-app by default.  It allows us to 
// register javascript as a service worker in the browser, which 
// caches content to allow user to interact with the app in low or no
// internet connectivity.
registerServiceWorker();


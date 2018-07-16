# Local state management
The local state can be tracked through the GraphQL cache from ApolloClient.

An example of this is visible in Login.tsx.
GET_LOGIN_FILTER serves as the method by which the application
can check if the user is logged in (isLoggedIn) and if so,
what the userName is. By adding "@client" to the tail end of the field
which is queried for, it instructs the Client to pull from the
local state when possible. If it doesn't see it in the Apollo Client,
it will at that point attempt to pull it from the server instead.

The other portion for getting the local state is through the <Query> tag.
The "query" property of this component determines which query is used for
child elements.
The child of the Query element is expected to be an anonymous function
which tracks the state of the graphql query and the data inside of it.
While the Query is loading data, the "loading" property is true and this
can display a "Retrieving data" message back to the user.
Similarly, if the Query encounters and error, the "error" property will
be true.
These two properties should be used to prevent the application from
attempting to access undefined properties of data.

Similarly, when we need to update the cache, we can use the ApolloClient
writeData command to push the updated data. An example of this can be seen
in "doLogin" inside of Login.tsx
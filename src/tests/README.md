create-react-app uses the Jest library to run automated tests, which are great for
unit testing web service calls.

Any file that ends with *.test.tsx will automatically be pulled into the test suite.

I believe that there will be some additional Jest configuration needed in order to
get the test to run with absolute path imports.

https://github.com/wmonk/create-react-app-typescript/issues/203
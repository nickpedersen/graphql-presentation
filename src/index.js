import React from "react";
import ReactDOM from "react-dom";
import Presentation from "./presentation";
import registerServiceWorker from "./registerServiceWorker";
import ApolloProvider from "./graphQLExampleComponents/ApolloProvider";

ReactDOM.render(
  <ApolloProvider>
    <Presentation />
  </ApolloProvider>,
  document.getElementById("root")
);
registerServiceWorker();

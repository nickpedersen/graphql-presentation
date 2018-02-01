import express from "express";
import bodyParser from "body-parser";
import { graphqlExpress, graphiqlExpress } from "graphql-server-express";
import cors from "cors";

import restRoutes from "./restRoutes";
import schema from "./graphqlSchema";

const port = process.env.PORT || 8090;

const app = express();

// Express middleware
app.use(cors());
app.use(bodyParser.json());

// Add 1500ms of delay to simulate network latency
app.use((req, res, next) => setTimeout(next, 1500));

// REST API
app.use("/api", restRoutes);

// GraphQL API
app.use("/graphql", graphqlExpress({ schema }));

// GraphiQL - debugging tool
app.use(
  "/graphiql",
  graphiqlExpress({
    endpointURL: "/graphql"
  })
);

// Start the server
app.listen(port, () => {
  console.log("Server listening on port " + port + " 🚀");
});

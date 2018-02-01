import React from "react";
import {
  Deck,
  Heading,
  ListItem,
  List,
  Slide,
  Text,
  CodePane,
  Code
} from "spectacle";
import createTheme from "spectacle/lib/themes/default";

import RESTDataFetcher from "./RESTExampleComponents/RESTDataFetcher";
import GraphQLDataFetcher from "./graphQLExampleComponents/GraphQLDataFetcher";
import TeamBrowser from "./uiComponents/TeamBrowser";
import GraphiQL from "./GraphiQL";

import Loader from "./loader.svg";
import GraphqlLogo from "./graphql-logo.png";

require("normalize.css");

const theme = createTheme(
  {
    primary: "white",
    secondary: "#1F2022",
    tertiary: "#03A9FC",
    quartenary: "#CECECE"
  },
  {
    primary: "Montserrat",
    secondary: "Helvetica"
  }
);

export default class Presentation extends React.Component {
  render() {
    return (
      <Deck
        transition={["zoom", "slide"]}
        transitionDuration={500}
        theme={theme}
      >
        <Slide transition={["zoom"]} bgColor="primary">
          <Heading size={1} fit caps lineHeight={1} textColor="secondary">
            GraphQL
          </Heading>
          <Text margin="10px 0 0" textColor="tertiary" size={1} fit bold>
            What is it? Why would I use it? How can I use it?
          </Text>
          <img src={GraphqlLogo} alt="GraphQL" style={{ width: "50%" }} />
        </Slide>
        <Slide transition={["zoom"]} bgColor="secondary">
          <Heading size={4} caps textColor="primary" margin={10}>
            What is an API, why do we need them?
          </Heading>
          <List textColor="primary">
            <ListItem>
              An API is a way of requesting and receiving computer-readable
              information
            </ListItem>
            <ListItem>
              When we talk about APIs, we're usually talking about a REST API
            </ListItem>
            <ListItem>
              We need APIs to allow the front-end of our application to talk to
              the back-end, in the case of a webapp, without page reloads
            </ListItem>
          </List>
        </Slide>
        <Slide bgColor="secondary">
          <Heading size={4} caps textColor="primary" margin={10}>
            A sample application as a case study
          </Heading>
          <Text textColor="primary">
            Let's talk about a really simple REST example. We're building an app
            that lists the teams and players from the movie Space Jam
          </Text>
        </Slide>
        <Slide bgColor="secondary">
          <Heading size={4} caps textColor="primary" margin={10}>
            A sample application as a case study
          </Heading>
          <Text textColor="primary">
            We'll have a REST structure that looks like this:
          </Text>
          <List textColor="primary">
            <ListItem>/api/team </ListItem>
            <ListItem>/api/team/:id</ListItem>
            <ListItem>/api/team/:id/players</ListItem>
            <ListItem>/api/player</ListItem>
            <ListItem>/api/player/:id</ListItem>
          </List>
        </Slide>
        <Slide bgColor="secondary">
          <Heading size={4} caps textColor="primary" margin={10}>
            And some sample responses from our server
          </Heading>
          <CodePane
            source={`  // /api/team
  [{
    "id":1,
    "name":"Tune Squad"
  }, {
    "id":2,
    "name":"Monstars"
  }]`}
            lang="javascript"
            textSize={20}
            margin={10}
          />
          <CodePane
            source={`  // /api/player/2
  {
    "id":2,
    "name":"Yosemite Sam",
    "teamId":1
  }`}
            lang="javascript"
            textSize={20}
            margin={10}
          />
        </Slide>
        <Slide bgColor="secondary">
          <Heading size={4} caps textColor="primary" margin={10}>
            So lets see what this might look like:
          </Heading>
          <RESTDataFetcher
            render={(data, loading) =>
              loading ? (
                <img src={Loader} alt="Loading..." />
              ) : (
                <TeamBrowser teams={data} />
              )
            }
          />
        </Slide>
        <Slide bgColor="secondary">
          <Heading size={4} caps textColor="primary" margin={10}>
            How do we fetch data from the REST API?
          </Heading>
          <CodePane
            source={`  // Fetch the teams
  const apiUrl = \`$\{baseUrl}/team\`;
  fetch(apiUrl)
    .then(result => result.json())
    .then(data => {
      this.setState({ data });
    });
  }`}
            lang="javascript"
            textSize={20}
            margin={10}
          />
          <Text textColor="primary" margin={10}>
            But what does it look like when we need to go multiple levels deep?
          </Text>
        </Slide>
        <Slide bgColor="secondary">
          <CodePane
            source={`  // Fetch the teams
  const teamsUrl = \`$\{baseUrl}/team\`;
  fetch(teamsUrl)
    .then(result => result.json())
    .then(teams => {
      // Iterate over each team, and fetch the players
      const teamPlayerListPromises = teams.map(team => {
        const playerListUrl = \`$\{baseUrl}/team/$\{team.id}/players\`;
        return fetch(playerListUrl).then(result => result.json());
      });
      // Wait for each of the fetch promises to resolve
      Promise.all(teamPlayerListPromises).then(teamPlayerLists => {
        // Merge the player lists into the team objects
        const data = teams.map((team, index) => ({
          ...team,
          players: teamPlayerLists[index]
        }));
        this.setState({ data });
      });
    });
  }`}
            lang="javascript"
            textSize={20}
          />
        </Slide>
        <Slide bgColor="secondary">
          <Heading size={4} caps textColor="primary" margin={10}>
            How does GraphQL come into this?
          </Heading>
          <Text textColor="primary">
            With GraphQL, we remove a lot of the complexity when we want to
            request nested data.
          </Text>
          <List textColor="primary">
            <ListItem>Our API only has a single endpoint</ListItem>
            <ListItem>
              We make a GET request with a query to that endpoint
            </ListItem>
            <ListItem>
              Our API is self documenting, we can use GraphiQL to understand the
              query structure
            </ListItem>
            <ListItem>
              We can write client-side queries and only get exactly the data
              that we need
            </ListItem>
          </List>
        </Slide>
        <Slide bgColor="secondary">
          <GraphiQL />
        </Slide>
        <Slide bgColor="secondary">
          <Heading size={4} caps textColor="primary" margin={10}>
            Here's our example from before, using our GraphQL server:
          </Heading>
          <GraphQLDataFetcher
            render={(data, loading) =>
              loading ? (
                <img src={Loader} alt="Loading..." />
              ) : (
                <TeamBrowser teams={data} />
              )
            }
          />
        </Slide>
        <Slide bgColor="secondary">
          <Heading size={4} caps textColor="primary" margin={10}>
            What does the implementation look like?
          </Heading>
          <CodePane
            source={`  // Fetch the teams
  const url = \`$\{baseUrl}/graphql?query={ teams { id, name, players {id, name } } }\`;
  fetch(url)
    .then(result => result.json())
    .then(data => {
      this.setState({ data });
    });
  }`}
            lang="javascript"
            textSize={20}
            margin={10}
          />
          <Text textColor="primary" margin={10}>
            So manually attaching our query to the url like that works ok, but
            we could make things easier
          </Text>
        </Slide>
        <Slide bgColor="secondary">
          <Heading size={4} caps textColor="primary" margin={10}>
            What does the implementation look like with Apollo?
          </Heading>
          <CodePane
            source={`  import { graphql } from "react-apollo";
  import gql from "graphql-tag";
  import Component from "./Component";
  
  const query = gql\`
    query {
      teams {
        id
        name
        players {
          id
          name
        }
      }
    }
  \`;

  export default graphql(query)(Component);`}
            lang="javascript"
            textSize={20}
            margin={10}
          />
        </Slide>
        <Slide bgColor="secondary">
          <Heading size={4} caps textColor="primary" margin={10}>
            Moving complexity to our server, what does that look like?
          </Heading>
          <Text textColor="primary" margin={10}>
            Let's look at a node server serving the REST and GraphQL APIs
          </Text>
        </Slide>
        <Slide bgColor="secondary">
          <Heading size={4} caps textColor="primary" margin={10}>
            REST Server using Express.js
          </Heading>
          <CodePane
            source={`  router.get("/team", (req, res) => {
    res.json(data.teams);
  });
  
  router.get("/team/:id", (req, res) => {
    const { id } = req.params;
    res.json(data.teams.find(t => t.id === Number(id)));
  });
  
  router.get("/team/:id/players", (req, res) => {
    const { id } = req.params;
    res.json(data.players.filter(p => p.teamId === Number(id)));
  });`}
            lang="javascript"
            textSize={20}
            margin={10}
          />
        </Slide>
        <Slide bgColor="secondary">
          <Heading size={4} caps textColor="primary" margin={10}>
            GraphQL Server using{" "}
            <Code textColor="primary">graphql-server-express</Code>
          </Heading>
          <CodePane
            source={`  const typeDefs = \`
    type Team {
      id: ID!
      name: String
      players: [Player]
    }

    type Player {
      id: ID!
      name: String
      team: Team
    }

    type Query {
      teams: [Team]
      players: [Player]
    }
  \`;
`}
            lang="javascript"
            textSize={20}
            margin={10}
          />
          <Text textColor="primary" margin={10}>
            Continued...
          </Text>
        </Slide>
        <Slide bgColor="secondary">
          <Heading size={4} caps textColor="primary" margin={10}>
            GraphQL Server using{" "}
            <Code textColor="primary">graphql-server-express</Code>
          </Heading>
          <CodePane
            source={`  const resolvers = {
    Query: {
      teams: (root, args) => data.teams,
      players: (root, args) => data.players
    },
    Team: {
      players: (root, args) => data.players.filter(p => p.teamId === root.id)
    },
    Player: {
      team: (root, args) => data.teams.find(t => t.id === root.teamId)
    }
  };

  export default makeExecutableSchema({ typeDefs, resolvers });
`}
            lang="javascript"
            textSize={20}
            margin={10}
          />
        </Slide>
        <Slide bgColor="secondary">
          <GraphiQL />
        </Slide>
        <Slide bgColor="secondary">
          <Heading size={4} caps textColor="primary" margin={10}>
            Other things that we get out of the box with Apollo
          </Heading>
          <List textColor="primary">
            <ListItem>Apollo uses Redux under the hood</ListItem>
            <ListItem>Automatic caching of queries</ListItem>
            <ListItem>
              Local state management with{" "}
              <Code textColor="primary">apollo-link-state</Code> with less
              boilerplate than Redux
            </ListItem>
            <ListItem>
              Easy ways to modify the cache - allowing optimistic updates
            </ListItem>
          </List>
        </Slide>
        <Slide bgColor="secondary">
          <Heading size={4} caps textColor="primary" margin={10}>
            Other functionality
          </Heading>
          <Text textColor="primary" margin={10}>
            Queries with parameters
          </Text>
          <CodePane
            source={`query {
  player(id: 3) {
    id
    name
    team {
      name
    }
  }
}
`}
            lang="javascript"
            textSize={20}
            margin={10}
          />
          <CodePane
            source={`query {
  players(sortBy: "name") {
    id
    name
    team {
      name
    }
  }
}
`}
            lang="javascript"
            textSize={20}
            margin={10}
          />
        </Slide>
        <Slide bgColor="secondary">
          <Heading size={4} caps textColor="primary" margin={10}>
            Other functionality
          </Heading>
          <Text textColor="primary" margin={10}>
            Mutations - for changing data
          </Text>
          <CodePane
            source={`mutation {
  addPlayer(name: "New Player", teamId: 2) {
    id
    name
    team {
      name
    }
  }
}
`}
            lang="javascript"
            textSize={20}
            margin={10}
          />
        </Slide>
        <Slide bgColor="secondary">
          <Heading size={4} caps textColor="primary" margin={10}>
            Other functionality
          </Heading>
          <Text textColor="primary" margin={10}>
            Subscriptions - for live updating data
          </Text>
          <CodePane
            source={`subscription {
    newPlayers {
      id
      name
      team {
        name
      }
    }
  }
`}
            lang="javascript"
            textSize={20}
            margin={10}
          />
        </Slide>
        <Slide bgColor="secondary">
          <Heading size={4} caps textColor="primary" margin={10}>
            Concerns
          </Heading>
          <List textColor="primary">
            <ListItem>
              The biggest concern with a naive implementation is unoptimized
              database queries
            </ListItem>
            <ListItem>
              Dataloader - a Facebook utility for batching and performing
              queries
            </ListItem>
          </List>
        </Slide>
        <Slide bgColor="secondary">
          <Heading size={4} caps textColor="primary" margin={10}>
            Wrapping up
          </Heading>
          <List textColor="primary">
            <ListItem>GraphQL improves the developer experience</ListItem>
            <ListItem>
              Moves the power to the client, allowing the client to query for
              the data it requires
            </ListItem>
            <ListItem>
              Apollo gives us automatic caching and a nice state management
              layer, with more features coming out frequently
            </ListItem>
            <ListItem>
              You can download these slides, along with the working components
              and server from:{" "}
              <a
                href="https://github.com/nickpedersen/graphql-presentation"
                style={{ color: "#03A9FC" }}
              >
                https://github.com/nickpedersen/graphql-presentation
              </a>
            </ListItem>
          </List>
        </Slide>
      </Deck>
    );
  }
}

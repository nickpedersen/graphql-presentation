import { makeExecutableSchema } from "graphql-tools";
import data from "./data.json";

const typeDefs = `
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
`;

const resolvers = {
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

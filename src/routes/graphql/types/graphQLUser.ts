import { GraphQLInt, GraphQLObjectType, GraphQLString } from 'graphql';

export const GraphQLUser = new GraphQLObjectType({
  name: 'User',
  fields: {
    balance: {
      type: GraphQLInt,
    },
    id: {
      type: GraphQLString,
    },
    name: {
      type: GraphQLString,
    },
  },
});

import { GraphQLFloat, GraphQLInt, GraphQLObjectType, GraphQLString } from 'graphql';

export const GraphQLUser = new GraphQLObjectType({
  name: 'User',
  fields: {
    balance: {
      type: GraphQLFloat,
    },
    id: {
      type: GraphQLString,
    },
    name: {
      type: GraphQLString,
    },
  },
});

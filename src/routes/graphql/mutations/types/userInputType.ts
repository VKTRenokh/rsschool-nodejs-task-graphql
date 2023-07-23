import { GraphQLFloat, GraphQLInputObjectType, GraphQLInt, GraphQLString } from 'graphql';

export const userInputType = new GraphQLInputObjectType({
  name: 'CreateUserInput',
  fields: {
    balance: {
      type: GraphQLFloat,
    },
    name: {
      type: GraphQLString,
    },
  },
});

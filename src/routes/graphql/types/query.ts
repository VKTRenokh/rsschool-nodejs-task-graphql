import { GraphQLBoolean, GraphQLInt, GraphQLObjectType, GraphQLString } from 'graphql';

export const profile = new GraphQLObjectType({
  name: 'Profile',
  fields: {
    isMale: {
      type: GraphQLBoolean,
    },
    id: {
      type: GraphQLString,
    },
    userId: {
      type: GraphQLString,
    },
    yearOfBirth: {
      type: GraphQLInt,
    },
  },
});

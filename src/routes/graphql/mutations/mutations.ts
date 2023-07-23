import { GraphQLObjectType, GraphQLString } from 'graphql';

export const mutation = new GraphQLObjectType({
  name: 'rootMutation',
  fields: () => ({
    addUser: {
      type: GraphQLString, // rmemove this
    },
  }),
});

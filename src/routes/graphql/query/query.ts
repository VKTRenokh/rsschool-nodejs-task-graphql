import { GraphQLList, GraphQLObjectType } from 'graphql';
import { GraphQLProfile } from '../types/graphQLprofile.js';
import { GraphQLUser } from '../types/graphQLUser.js';

export const query = new GraphQLObjectType({
  name: 'root',
  fields: {
    profiles: {
      type: new GraphQLList(GraphQLProfile),
    },
    users: {
      type: new GraphQLList(GraphQLUser),
    },
  },
});

import { Profile } from '@prisma/client';
import { GraphQLBoolean, GraphQLInt, GraphQLObjectType, GraphQLString } from 'graphql';

export const GraphQLProfile = new GraphQLObjectType({
  name: 'profile',
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
    memberType: {
      type: GraphQLString,
      resolve: (profile: Profile) => {
        return profile.memberTypeId || null;
      },
    },
  },
});

import { MemberType } from '@prisma/client';
import { GraphQLFloat, GraphQLInt, GraphQLObjectType, GraphQLString } from 'graphql';
import { GraphQLMemberEnum } from './graphQLMemberEnum.js';

export const GraphQLMemberType = new GraphQLObjectType({
  name: 'MembersTypes',
  fields: {
    id: {
      type: GraphQLMemberEnum,
    },
    discount: {
      type: GraphQLFloat,
    },
    postsLimitPerMonth: {
      type: GraphQLInt,
    },
  },
});

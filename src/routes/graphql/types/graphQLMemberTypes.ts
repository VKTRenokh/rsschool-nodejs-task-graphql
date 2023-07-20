import { MemberType } from '@prisma/client';
import { GraphQLInt, GraphQLObjectType, GraphQLString } from 'graphql';

export const GraphQLMemberTypes = new GraphQLObjectType({
  name: 'MembersTypes',
  fields: {
    id: {
      type: GraphQLString,
      resolve: (memberType: MemberType) => {
        return memberType.id;
      },
    },
    discount: {
      type: GraphQLInt,
    },
    postsLimitPerMonth: {
      type: GraphQLInt,
    },
  },
});

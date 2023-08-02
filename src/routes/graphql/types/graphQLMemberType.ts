import { GraphQLFloat, GraphQLInt, GraphQLObjectType } from 'graphql';
import { GraphQLMemberEnum } from './graphQLMemberEnum.js';

export const GraphQLMemberType = new GraphQLObjectType({
  name: 'MemberType',
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

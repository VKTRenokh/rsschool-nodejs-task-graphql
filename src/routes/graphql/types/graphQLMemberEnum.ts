import { GraphQLEnumType } from 'graphql';

export const GraphQLMemberEnum = new GraphQLEnumType({
  name: 'MemberTypeId',
  values: {
    basic: { value: 'basic' },
    buisness: { value: 'buisness' },
  },
});

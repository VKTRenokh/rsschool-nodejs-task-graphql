import { GraphQLEnumType } from 'graphql';

export const GraphQLMemberEnum = new GraphQLEnumType({
  name: 'MemberEnum',
  values: {
    basic: { value: 'basic' },
    buisness: { value: 'buisness' },
  },
});

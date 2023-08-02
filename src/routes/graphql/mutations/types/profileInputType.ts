import { GraphQLBoolean, GraphQLInputObjectType, GraphQLInt } from 'graphql';
import { UUIDType } from '../../types/uuid.js';
import { GraphQLMemberEnum } from '../../types/graphQLMemberEnum.js';

export const profileInputType = new GraphQLInputObjectType({
  name: 'CreateProfileInput',
  fields: {
    userId: {
      type: UUIDType,
    },
    memberTypeId: {
      type: GraphQLMemberEnum,
    },
    isMale: {
      type: GraphQLBoolean,
    },
    yearOfBirth: {
      type: GraphQLInt,
    },
  },
});

import { GraphQLBoolean, GraphQLInt, GraphQLObjectType } from 'graphql';
import { UUIDType } from './uuid.js';
import { PrismaClient } from '@prisma/client';
import { GraphQLMemberType } from './graphQLMemberType.js';
import { GraphQLMemberEnum } from './graphQLMemberEnum.js';

const prisma = new PrismaClient();

export const GraphQLProfile = new GraphQLObjectType({
  name: 'profile',
  fields: {
    isMale: {
      type: GraphQLBoolean,
    },
    id: {
      type: UUIDType,
    },
    userId: {
      type: UUIDType,
    },
    yearOfBirth: {
      type: GraphQLInt,
    },
    memberTypeId: {
      type: UUIDType,
    },
    memberType: {
      type: GraphQLMemberType,
      args: { memberTypeId: { type: GraphQLMemberEnum } },
      resolve: async (_, { memberTypeId }) => {
        return prisma.memberType.findFirst({
          where: {
            id: memberTypeId,
          },
        });
      },
    },
  },
});

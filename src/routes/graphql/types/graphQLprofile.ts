import { GraphQLBoolean, GraphQLInt, GraphQLObjectType, GraphQLString } from 'graphql';
import { UUIDType, isUUID } from './uuid.js';
import { PrismaClient } from '@prisma/client';
import { GraphQLMemberType } from './graphQLMemberType.js';

const prisma = new PrismaClient();

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
      type: GraphQLMemberType,
      args: { id: { type: UUIDType } },
      resolve: async (_, { id }) => {
        if (!isUUID(id)) {
          return null;
        }

        return prisma.memberType.findFirst({
          where: {
            id,
          },
        });
      },
    },
  },
});

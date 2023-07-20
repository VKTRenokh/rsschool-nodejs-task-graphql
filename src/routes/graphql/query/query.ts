import { GraphQLList, GraphQLObjectType } from 'graphql';
import { GraphQLProfile } from '../types/graphQLprofile.js';
import { PrismaClient } from '@prisma/client';
import { GraphQLUser } from '../types/graphQLUser.js';

const prisma = new PrismaClient();

export const query = new GraphQLObjectType({
  name: 'root',
  fields: {
    profiles: {
      type: new GraphQLList(GraphQLProfile),
      resolve: () => {
        return prisma.profile.findMany();
      },
    },
    users: {
      type: new GraphQLList(GraphQLUser),
      resolve: () => {
        return prisma.user.findMany();
      },
    },
  },
});
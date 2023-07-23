import {
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { GraphQLProfile } from './graphQLprofile.js';
import { PrismaClient } from '@prisma/client';
import { GraphQLPost } from './graphQLPost.js';
import { UUIDType, isUUID } from './uuid.js';

const prisma = new PrismaClient();

export const GraphQLUser = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    balance: {
      type: GraphQLFloat,
    },
    id: {
      type: UUIDType,
    },
    name: {
      type: GraphQLString,
    },
    profile: {
      type: GraphQLProfile,
      args: {
        id: {
          type: UUIDType,
        },
      },
      resolve: async ({ id }) => {
        if (!isUUID(id)) {
          return null;
        }

        return await prisma.profile.findFirst({
          where: {
            id,
          },
        });
      },
    },
    posts: {
      type: new GraphQLList(GraphQLPost),
      args: {
        id: {
          type: UUIDType,
        },
      },
      resolve: async ({ id }) => {
        if (!isUUID(id)) {
          return null;
        }

        return await prisma.post.findMany({
          where: {
            id,
          },
        });
      },
    },
    subscribedToUser: {
      type: new GraphQLList(GraphQLUser),
      args: {
        id: {
          type: UUIDType,
        },
      },
      resolve: async ({ id }) => {
        if (!isUUID(id)) {
          return null;
        }

        return prisma.user.findMany({
          where: {
            userSubscribedTo: {
              some: {
                authorId: id,
              },
            },
          },
        });
      },
    },
    userSubscribedTo: {
      type: new GraphQLList(new GraphQLNonNull(GraphQLUser)),
      args: {
        id: {
          type: UUIDType,
        },
      },
      resolve: async ({ id }) => {
        if (!isUUID(id)) {
          return null;
        }

        return await prisma.user.findMany({
          where: {
            subscribedToUser: {
              some: {
                authorId: id,
              },
            },
          },
        });
      },
    },
  }),
});

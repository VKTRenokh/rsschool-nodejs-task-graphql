import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { GraphQLPost } from '../types/graphQLPost.js';

import { PrismaClient } from '@prisma/client';
import { postInputType } from './types/postInputType.js';
import { userInputType } from './types/userInputType.js';
import { GraphQLUser } from '../types/graphQLUser.js';
import { GraphQLProfile } from '../types/graphQLprofile.js';
import { profileInputType } from './types/profileInputType.js';
import { UUIDType, isUUID } from '../types/uuid.js';
import { changeUserInput } from './types/changeUserInput.js';
import { changeProfileInput } from './types/changeProfileInput.js';
import { changePostInput } from './types/changePostInput.js';

const prisma = new PrismaClient();

export const mutation = new GraphQLObjectType({
  name: 'rootMutation',
  fields: {
    createPost: {
      type: GraphQLPost,
      args: {
        dto: {
          type: new GraphQLNonNull(postInputType),
        },
      },
      resolve: async (_, { dto }) => {
        console.log('createPost mutation resolve call');

        const created = await prisma.post.create({
          data: dto,
        });

        console.log('CREATED', created);

        return created;
      },
    },
    createUser: {
      type: GraphQLUser,
      args: { dto: { type: userInputType } },
      resolve: async (_, { dto }) => {
        return prisma.user.create({
          data: dto,
        });
      },
    },
    createProfile: {
      type: GraphQLProfile,
      args: { dto: { type: profileInputType } },
      resolve: async (_, { dto }) => {
        return await prisma.profile.create({
          data: dto,
        });
      },
    },
    deletePost: {
      type: UUIDType,
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: async (_, { id }) => {
        await prisma.post.delete({
          where: {
            id,
          },
        });

        return id;
      },
    },
    deleteUser: {
      type: UUIDType,
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: async (_, { id }) => {
        await prisma.user.delete({
          where: {
            id,
          },
        });

        return id;
      },
    },
    deleteProfile: {
      type: UUIDType,
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: async (_, { id }) => {
        await prisma.profile.delete({
          where: {
            id,
          },
        });

        return id;
      },
    },
    changeUser: {
      type: GraphQLUser,
      args: {
        id: {
          type: UUIDType,
        },
        dto: {
          type: changeUserInput,
        },
      },
      resolve: async (_, { id, dto }) => {
        return await prisma.user.update({
          where: {
            id: id,
          },
          data: dto,
        });
      },
    },
    changePost: {
      type: GraphQLPost,
      args: {
        id: {
          type: UUIDType,
        },
        dto: {
          type: changePostInput,
        },
      },
      resolve: async (_, { id, dto }) => {
        return prisma.post.update({
          where: {
            id,
          },
          data: dto,
        });
      },
    },
    changeProfile: {
      type: GraphQLProfile,
      args: {
        id: {
          type: UUIDType,
        },
        dto: {
          type: changeProfileInput,
        },
      },
      resolve: async (_, { id, dto }) => {
        return await prisma.profile.update({
          where: {
            id,
          },
          data: dto,
        });
      },
    },
    subscribeTo: {
      type: GraphQLUser,
      args: {
        userId: {
          type: new GraphQLNonNull(UUIDType),
        },
        authorId: {
          type: new GraphQLNonNull(UUIDType),
        },
      },
      resolve: async (_, { userId, authorId }) => {
        return await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            userSubscribedTo: {
              create: {
                authorId: authorId,
              },
            },
          },
        });
      },
    },
    unsubscribeFrom: {
      type: GraphQLString,
      args: {
        userId: {
          type: new GraphQLNonNull(UUIDType),
        },
        authorId: {
          type: new GraphQLNonNull(UUIDType),
        },
      },
      resolve: async (_, { userId, authorId }) => {
        await prisma.subscribersOnAuthors.delete({
          where: {
            subscriberId_authorId: {
              authorId,
              subscriberId: userId,
            },
          },
        });

        return 'deleted';
      },
    },
  },
});

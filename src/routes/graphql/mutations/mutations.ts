import { GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { GraphQLPost } from '../types/graphQLPost.js';

import { PrismaClient } from '@prisma/client';
import { postInputType } from './types/postInputType.js';
import { userInputType } from './types/userInputType.js';
import { GraphQLUser } from '../types/graphQLUser.js';
import { GraphQLProfile } from '../types/graphQLprofile.js';
import { profileInputType } from './types/profileInputType.js';

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
  },
});

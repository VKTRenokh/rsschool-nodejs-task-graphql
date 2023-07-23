import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { GraphQLProfile } from '../types/graphQLprofile.js';
import { PrismaClient } from '@prisma/client';
import { GraphQLUser } from '../types/graphQLUser.js';
import { GraphQLMemberType } from '../types/graphQLMemberType.js';
import { UUIDType, isUUID } from '../types/uuid.js';
import { GraphQLPost } from '../types/graphQLPost.js';
import { MemberTypeId } from '../../member-types/schemas.js';
import { GraphQLMemberEnum } from '../types/graphQLMemberEnum.js';

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
    memberTypes: {
      type: new GraphQLList(GraphQLMemberType),
      resolve: () => {
        return prisma.memberType.findMany();
      },
    },
    posts: {
      type: new GraphQLList(GraphQLPost),
      resolve: () => {
        return prisma.post.findMany();
      },
    },
    user: {
      type: GraphQLUser,
      args: {
        id: {
          type: new GraphQLNonNull(UUIDType),
        },
      },
      resolve: async (_, { id }: { id: string }) => {
        return await prisma.user.findFirst({
          where: {
            id: id,
          },
        });
      },
    },
    memberType: {
      type: GraphQLMemberType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLMemberEnum),
        },
      },
      resolve: async (_, { id }: { id: MemberTypeId }) => {
        if (!id) {
          return null;
        }

        return await prisma.memberType.findFirst({
          where: {
            id,
          },
        });
      },
    },
    post: {
      type: GraphQLPost,
      args: {
        id: {
          type: new GraphQLNonNull(UUIDType),
        },
      },
      resolve: async (_, { id }) => {
        if (!isUUID(id)) {
          return null;
        }

        return prisma.post.findFirst({
          where: {
            id: id,
          },
        });
      },
    },
    profile: {
      type: GraphQLProfile,
      args: {
        id: {
          type: new GraphQLNonNull(UUIDType),
        },
      },
      resolve: async (_, { id }) => {
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
  },
});

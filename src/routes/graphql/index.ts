import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  graphql,
} from 'graphql';
import { PrismaClient } from '@prisma/client';
import { profile } from '../../types/query.js';

const prisma = new PrismaClient();

const Resolvers = {
  Query: {
    profiles: () => {
      return prisma.profile.findMany();
    },
  },
};

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const query = new GraphQLObjectType({
        name: 'root',
        fields: {
          profiles: {
            type: new GraphQLList(profile),
          },
        },
      });

      const schema = new GraphQLSchema({
        query: query,
      });

      return await graphql({
        rootValue: Resolvers,
        source: req.body.query,
        schema: schema,
      });
    },
  });
};

export default plugin;

import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { GraphQLSchema, graphql } from 'graphql';
import { query } from './query/query.js';
import { PrismaClient } from '@prisma/client';

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

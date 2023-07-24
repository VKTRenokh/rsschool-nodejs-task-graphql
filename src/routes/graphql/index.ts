import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { GraphQLSchema, graphql, validate, parse } from 'graphql';
import { query } from './query/query.js';
import { mutation } from './mutations/mutations.js';
import depthLimit from 'graphql-depth-limit';

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
        query,
        mutation,
      });

      const errors = validate(schema, parse(req.body.query), [depthLimit(5)]);

      if (errors.length) {
        return {
          errors,
        };
      }

      const data = await graphql({
        schema,
        source: req.body.query,
        variableValues: req.body.variables,
        contextValue: {
          fastify,
        },
      });

      return data;
    },
  });
};

export default plugin;

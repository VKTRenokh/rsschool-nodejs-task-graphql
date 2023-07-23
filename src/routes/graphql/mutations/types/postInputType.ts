import { GraphQLInputObjectType, GraphQLString } from 'graphql';
import { UUIDType } from '../../types/uuid.js';

export const postInputType = new GraphQLInputObjectType({
  name: 'CreatePostInput',
  fields: {
    title: {
      type: GraphQLString,
    },
    content: {
      type: GraphQLString,
    },
    authorId: {
      type: UUIDType,
    },
  },
});

// export interface Posts {
//   id: string
//   title: string
//   content: string
//   authorId: string
// }

import { GraphQLObjectType } from 'graphql';
import { UUIDType } from './uuid.js';

export const GraphQLPost = new GraphQLObjectType({
  name: 'Posts',
  fields: {
    id: {
      type: UUIDType,
    },
    title: {
      type: UUIDType,
    },
    content: {
      type: UUIDType,
    },
    authorId: {
      type: UUIDType,
    },
  },
});

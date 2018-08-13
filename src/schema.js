import mongoose from 'mongoose';
import { composeWithMongoose } from 'graphql-compose-mongoose/node8';
import { schemaComposer } from 'graphql-compose';

import {
  UserQueries,
  UserMutations,
  GameQueries,
  GameMutations
} from './schemas';

schemaComposer.Query.addFields({
  ...UserQueries,
  ...GameQueries
});

schemaComposer.Mutation.addFields({
  ...UserMutations,
  ...GameMutations
});

const graphqlSchema = schemaComposer.buildSchema();
export default graphqlSchema;

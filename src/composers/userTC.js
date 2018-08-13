import { composeWithMongoose } from 'graphql-compose-mongoose/node8';
import { User } from '../models';

const customizationOptions = {
  description: "The user for playing blackjack",
  resolvers: {
    createOne: {
      record: {
        requiredFields: ['username'],
        removeFields: ['_id', 'lastOnline', 'handIds', 'createdAt', 'updatedAt']
      },
    }
  }
};
export const UserTC = composeWithMongoose(User, customizationOptions);
export default UserTC;

import { composeWithMongoose } from 'graphql-compose-mongoose/node8';
import { Hand } from '../models';

import {
  UserTC,
  CardTC
} from './index';

const customizationOptions = {};
export const HandTC = composeWithMongoose(Hand, customizationOptions);
export default HandTC;

// ======================= Fields ==============================
HandTC.addFields({
  score: {
    type: 'Int',
    resolve: async (hand, args, context) => {
      return await hand.score();
    },
  }
});

// ======================= Relations ==============================

HandTC.addRelation('player', {
  resolver: () => UserTC.getResolver('findById'),
  prepareArgs: {
    _id: (source) => source.userId,
  },
  projection: { userId: true },
});

HandTC.addRelation('cards', {
  resolver: () => CardTC.getResolver('findByIds'),
  prepareArgs: {
    _ids: (source) => source.cardIds,
  },
  projection: { cardIds: true },
});

import { composeWithMongoose } from 'graphql-compose-mongoose/node8';
import { Dealer } from '../models';

import { CardTC } from './index';

const customizationOptions = {};
export const DealerTC = composeWithMongoose(Dealer, customizationOptions);
export default DealerTC;

// ======================= Fields ==============================
DealerTC.addFields({
  score: {
    type: 'Int',
    args: {
      visibleOnly: {
        type: 'Boolean',
        defaultValue: true
      }
    },
    resolve: async (dealer, args, context) => {
      return await dealer.score({ visibleOnly: args.visibleOnly });
    },
  }
});

// ======================= Relations ==============================
DealerTC.addRelation('deck', {
  resolver: () => CardTC.getResolver('findByIds'),
  prepareArgs: {
    _ids: (source) => source.deckCardIds,
  },
  projection: { deckCardIds: true },
});

DealerTC.addRelation('cardsUp', {
  resolver: () => CardTC.getResolver('findByIds'),
  prepareArgs: {
    _ids: (source) => source.cardUpIds,
  },
  projection: { cardUpIds: true },
});

DealerTC.addRelation('cardsDown', {
  resolver: () => CardTC.getResolver('findByIds'),
  prepareArgs: {
    _ids: (source) => source.cardDownIds,
  },
  projection: { cardDownIds: true },
});

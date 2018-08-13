import { composeWithMongoose, GraphQLMongoID } from 'graphql-compose-mongoose/node8';
import _ from 'lodash';
import { Game } from '../models';

import { Hand, Dealer } from '../models';
import {
  UserTC,
  DealerTC,
  HandTC
} from './index';

const customizationOptions = {
  description: "The game holds the state for blackjack"
};
export const GameTC = composeWithMongoose(Game, customizationOptions);
export default GameTC;

// ======================= Relations ==============================

GameTC.addRelation('dealer', {
  resolver: () => DealerTC.getResolver('findById'),
  prepareArgs: {
    _id: (source) => source.dealerId,
  },
  projection: { dealerId: true },
});


GameTC.addRelation('hands', {
  resolver: () => HandTC.getResolver('findByIds'),
  prepareArgs: {
    _ids: (source) => source.handIds,
  },
  projection: { handIds: true },
});

// ======================= Resolvers ==============================

GameTC.addResolver({
  name: "new",
  args: { userId: GraphQLMongoID },
  type: GameTC,
  resolve: async ({ source, args }) => {

    // ---- Initialize the new game
    // Create a empty hand for the user
    const hand = new Hand({
      userId: args.userId
    })

    // Create a new game and add the hand
    const game = new Game({
      status: 'started',
      handIds: [hand._id]
    });

    hand.gameId = game._id;

    await hand.save();
    await game.save();
    // ----

    // Draw two cards for the dealer
    const dealer = await Dealer.findOne({_id: game.dealerId});

    dealer.draw({
      count: 1,
      visible: true
    });
    dealer.draw({
      count: 1,
      visible: false
    });

    // Draw two cards for each player
    const hands = await Hand.find({_id: {$in: game.handIds}});
    const draws = _.map(hands, hand => {
      return dealer.deal({
        handId: hand._id,
        count: 2
      });
    });

    await Promise.all(draws);
    await dealer.save();

    // game.checkState();

    return game;
  },
})

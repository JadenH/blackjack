import { GameTC } from '../composers';

export const GameQueries = {
  gameById: GameTC.getResolver('findById'),
  // gameByIds: GameTC.getResolver('findByIds'),
  // gameOne: GameTC.getResolver('findOne'),
  // gameMany: GameTC.getResolver('findMany'),
  // gameCount: GameTC.getResolver('count'),
  // gameConnection: GameTC.getResolver('connection'),
  // gamePagination: GameTC.getResolver('pagination'),
}

export const GameMutations = {
  gameCreate: GameTC.getResolver('new'),
  // gameUpdateById: GameTC.getResolver('updateById'),
  // gameUpdateOne: GameTC.getResolver('updateOne'),
  // gameUpdateMany: GameTC.getResolver('updateMany'),
  // gameRemoveById: GameTC.getResolver('removeById'),
  // gameRemoveOne: GameTC.getResolver('removeOne'),
  // gameRemoveMany: GameTC.getResolver('removeMany'),
}

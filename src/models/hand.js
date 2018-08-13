const mongoose = require('mongoose');
import _ from 'lodash';

import { User } from './user';
import { Card } from './card';

const Types = mongoose.Schema.Types;
const HandSchema = new mongoose.Schema({
  userId: {
    type: Types.ObjectId,
    ref: 'User',
    index: true,
    required: true,
    description: "The user the hand belongs to"
  },
  gameId: {
    type: Types.ObjectId,
    ref: 'Game',
    index: true,
    required: true,
    description: "The game that the hand is used in"
  },
  cardIds: {
    type: [{type: Types.ObjectId, ref: 'Card'}],
    description: "The cards in the hand."
  }
}, { timestamps: true });

HandSchema.methods.score = async function ()
{
  let cards = await Card.find({ _id: { $in: this.cardIds }});
  let score = _.sum(_.map(cards, card => card.score()));

  // Add 1 for each ace
  let aceCount = _.filter(cards, {rank: 'ACE'}).length;

  while (aceCount > 0 && (score + 10) <= process.env.TARGET_SCORE)
  {
    score += 10;
    aceCount--;
  }
  return score;
}

HandSchema.pre('save', async function(next) {
  if(!this.isNew) return next();
  // Add the hand to the hands of the user
  await User.update({_id: this.userId}, { $addToSet: { handIds: this._id  } });
  return next();
});

export const Hand = mongoose.model('Hand', HandSchema);
export default Hand;

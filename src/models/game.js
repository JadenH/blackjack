const mongoose = require('mongoose');

import { Dealer } from './dealer';
import { User } from './user';

const Types = mongoose.Schema.Types;
const GameSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ['STARTED', 'RUNNING', 'COMPLETED', 'CANCELED'],
    uppercase: true,
    index: true,
    required: true,
    description: "The current status of the game"
  },
  handIds: {
    type: [{type: Types.ObjectId, ref: 'Hand'}],
    description: "The player hands that are in the game"
  },
  dealerId: {
    type: Types.ObjectId,
    description: "The dealer for the game"
  }
}, { timestamps: true });

GameSchema.index({"createdAt": 1});

// TODO: This is unfinished -- hit the timelimit for the code test!
GameSchema.methods.checkState = async function ()
{
  let dealer = Dealer.findOne({ _id: this.dealerId });

  // Calculate the dealer score
  let dealerScore = dealer.score();

  // Get the score for each players' hand
  let hands = await Hand.find({ _id: { $in: this.handIds }});
  let playerCardValues = {};
  _.forEach(hands, async hand => {
    let score = await hand.score();
    playerCardValues[hand.userId] = score;
  });

  if (dealerCardValue == 21)
  {

  }
}

GameSchema.pre('save', async function(next)
{
  if (!this.isNew) return next();
  // Create a dealer if the game is new
  const dealer = await Dealer.create({
    gameId: this._id
  });
  this.dealerId = dealer._id;

  // Ensure the hands gameId are set to this game
  await User.updateMany({_id: { $in: this.handIds }}, { gameId: this._id });
  return next();
})

export const Game = mongoose.model('Game', GameSchema);
export default Game;

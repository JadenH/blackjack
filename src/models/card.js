const mongoose = require('mongoose');
import _ from 'lodash';

export const SUITS = ['HEARTS', 'SPADES', 'DIAMONDS', 'CLUBS'];
export const RANKS = ['ACE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE', 'TEN', 'JACK', 'QUEEN', 'KING'];

const Types = mongoose.Schema.Types;
const CardSchema = new mongoose.Schema({
  suit: {
    type: String,
    enum: SUITS,
    required: true,
    uppercase: true,
    description: "The suit of this card"
  },
  rank: {
    type: String,
    enum: RANKS,
    required: true,
    uppercase: true,
    description: "The rank of this card"
  },
});

CardSchema.methods.score = function ()
{
  // Value is the index + 1 of the RANKS array
  return _.indexOf(RANKS, this.rank) + 1;
}

export const Card = mongoose.model('Card', CardSchema);
export default Card;

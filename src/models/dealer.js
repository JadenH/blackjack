const mongoose = require('mongoose');
const _ = require('lodash');

import { Card, RANKS, SUITS } from './card';
import { Hand } from './hand';

const Types = mongoose.Schema.Types;
const DealerSchema = new mongoose.Schema({
  gameId: {
    type: Types.ObjectId,
    required: true,
    description: "The game this dealer belongs to"
  },
  deckCardIds: {
    type: [{type: Types.ObjectId, ref: 'Card'}],
    description: "The cards in the game deck"
  },
  cardUpIds: {
    type: [{type: Types.ObjectId, ref: 'Card'}],
    description: "The dealer cards that are face up"
  },
  cardDownIds: {
    type: [{type: Types.ObjectId, ref: 'Card'}],
    description: "The dealer cards that are face down"
  },
});

DealerSchema.methods.score = async function({ visibleOnly })
{
  let cards = visibleOnly ? this.cardUpIds : [...this.cardUpIds, ...this.cardDownIds];
  let dealerCards = await Card.find({ _id: { $in: cards }});
  let score = _.sum(_.map(dealerCards, card => card.score()));

  // Add 1 for each ace
  let aceCount = _.filter(dealerCards, {rank: 'ACE'}).length;

  while (aceCount > 0 && (score + 10) <= process.env.TARGET_SCORE)
  {
    score += 10;
    aceCount--;
  }
  return score;
}

// Creates an array of promises to create a deck of 52 cards in the database
const createDeck = () => {
  let cards = [];
  _.forEach(SUITS, suit => {
    _.forEach(RANKS, rank => {
      let promise = new Promise((resolve, reject) => {
        let card = new Card({
          suit,
          rank,
        });
        card.save(err => {
          if (err) reject(err);
          resolve(card);
        });
      })
      cards.push(promise);
    });
  })
  return cards;
}

// Generates process.env.NUM_DECKS decls of a 52 card deck
DealerSchema.methods.generateDeck = async function()
{
  let decks = _.times(process.env.NUM_DECKS, createDeck);
  let cardIds = await Promise.all(_.flatten(decks));
  return cardIds;
};

DealerSchema.methods.draw = function({count, visible})
{
  // Draw cards at random
  let cards = _.sampleSize(this.deckCardIds, count);

  // Remove the card from the deck
  this.deckCardIds = _.difference(this.deckCardIds, cards)

  // Add the card to the dealer cards up/down
  if (visible)
  {
    this.cardUpIds.push(cards);
  }
  else
  {
    this.cardDownIds.push(cards);
  }
}

DealerSchema.methods.deal = async function ({ handId, count })
{
  // Draw cards at random
  let cards = _.sampleSize(this.deckCardIds, count);

  // Remove the card from the deck
  this.deckCardIds = _.difference(this.deckCardIds, cards)

  await Hand.update({ _id: handId }, { $addToSet: { cardIds: cards } })
}

DealerSchema.pre('save', async function(next)
{
  if (!this.isNew) return next();
  this.deckCardIds = await this.generateDeck();
  return next();
})

export const Dealer = mongoose.model('Dealer', DealerSchema);
export default Dealer;

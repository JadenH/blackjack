import { composeWithMongoose } from 'graphql-compose-mongoose/node8';
import { Card } from '../models';

const customizationOptions = {
  description: "A card has a suit and a rank"
};
export const CardTC = composeWithMongoose(Card, customizationOptions);
export default CardTC;

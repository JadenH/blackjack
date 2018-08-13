const mongoose = require('mongoose');

const Types = mongoose.Schema.Types;
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    description: "The name that is publically displayed",
    index: true
  },
  lastOnline: {
    type: Date,
    description: "The date the user was last seen online"
  },
  handIds: {
    type: [{type: Types.ObjectId, ref: 'Hand'}],
    description: "The user hands across all games"
  },
  wins: {
    type: Number,
    default: 0,
    description: "Total wins of the player"
  },
  loss: {
    type: Number,
    default: 0,
    description: "Total losses of the player"
  }
}, { timestamps: true });

UserSchema.pre('save', async function(next)
{
  return next();
})

export const User = mongoose.model('User', UserSchema);
export default User;

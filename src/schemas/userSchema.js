import { UserTC } from '../composers';

export const UserQueries = {
  userById: UserTC.getResolver('findById'),
  userByIds: UserTC.getResolver('findByIds'),
  userOne: UserTC.getResolver('findOne'),
  userMany: UserTC.getResolver('findMany'),
  userCount: UserTC.getResolver('count'),
  userConnection: UserTC.getResolver('connection'),
  userPagination: UserTC.getResolver('pagination'),
}

export const UserMutations = {
  userCreate: UserTC.getResolver('createOne'),
  // userUpdateById: UserTC.getResolver('updateById'),
  // userUpdateOne: UserTC.getResolver('updateOne'),
  // userUpdateMany: UserTC.getResolver('updateMany'),
  // userRemoveById: UserTC.getResolver('removeById'),
  // userRemoveOne: UserTC.getResolver('removeOne'),
  // userRemoveMany: UserTC.getResolver('removeMany'),
}

import { HandTC } from '../composers';

export const UserQueries = {
  userById: HandTC.getResolver('findById'),
  userByIds: HandTC.getResolver('findByIds'),
  userOne: HandTC.getResolver('findOne'),
  userMany: HandTC.getResolver('findMany'),
  userCount: HandTC.getResolver('count'),
  userConnection: HandTC.getResolver('connection'),
  userPagination: HandTC.getResolver('pagination'),
}

export const UserMutations = {
  userCreate: HandTC.getResolver('createOne'),
  userUpdateById: HandTC.getResolver('updateById'),
  userUpdateOne: HandTC.getResolver('updateOne'),
  userUpdateMany: HandTC.getResolver('updateMany'),
  userRemoveById: HandTC.getResolver('removeById'),
  userRemoveOne: HandTC.getResolver('removeOne'),
  userRemoveMany: HandTC.getResolver('removeMany'),
}

import merge from "lodash.merge";

import RootSchema from "./schema";
import RootResolvers from "./resolvers";
import User from "./user";

export default {
  typeDefs: [RootSchema, User.schema],
  resolvers: merge(RootResolvers, User.resolvers),
};

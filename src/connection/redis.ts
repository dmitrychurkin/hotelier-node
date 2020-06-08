import { RedisCache } from "apollo-server-cache-redis";
import globalConfig from "../config";

export default class {
  static readonly establish = () => new RedisCache(globalConfig.redis);
}

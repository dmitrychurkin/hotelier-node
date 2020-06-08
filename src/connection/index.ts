import Database from "./db";
import Cache from "./redis";

export default () => Promise.all([Cache.establish(), Database.establish()]);

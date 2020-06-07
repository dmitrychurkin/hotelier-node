import Database from "./db";

export default () => Promise.all([Database.establish()]);

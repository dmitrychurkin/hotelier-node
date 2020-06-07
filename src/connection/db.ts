import mongoose from "mongoose";
import globalConfig from "../config";

const { URI, options } = globalConfig.database;

export default class {
  static readonly establish = () => mongoose.connect(URI, options);
}

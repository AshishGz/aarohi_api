import { v4 as uuidv4 } from "uuid";
import _ from "lodash";

export const uuid = () => {
  return uuidv4();
};

export const isEmpty = (data) => {
  return _.isEmpty(data);
}
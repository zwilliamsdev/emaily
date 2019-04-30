import { FETCH_USER } from "../actions/types";

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_USER:
      // if payload (user model) is false or empty string set to false
      return action.payload || false;
    default:
      return state;
  }
}

import axios from "axios";
import { FETCH_USER } from "./types";

// Action creator
export const fetchUser = () => async dispatch => {
  // Set resolved ajax object to res (response)
  const res = await axios.get("/api/current_user");
  // Send the action FETCH_USER with res.data as payload
  // res.data contains just user profile without other extraneous info
  dispatch({ type: FETCH_USER, payload: res.data });
};

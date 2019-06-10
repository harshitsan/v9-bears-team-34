import { EXAMPLE_ACTION } from "../actions/types";

const initialState = {
  placeholder: "Placeholder"
};

export default function(state = initialState, action) {
  switch (action.type) {
    case EXAMPLE_ACTION: {
      return { ...state };
    }
    default:
      return state;
  }
}

let initialState = {
  city: "Bangalore",
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "updateCurrentCity":
      return {
        ...state,
        city: action.payload.city,
      };
    case "getCurrentCity":
      return state;
    default:
      return state;
  }
}

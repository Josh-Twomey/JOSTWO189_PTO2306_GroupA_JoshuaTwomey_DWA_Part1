
export const reducer = (state, action) => {
  switch (action.type) {
    case "Increase":
      return { ...state, count: state.count + 1 };
    case "Decrease":
      return { ...state, count: state.count - 1 };
    case "Reset":
      return { ...state, count: 0 };
    default:
      return state;
  }
};



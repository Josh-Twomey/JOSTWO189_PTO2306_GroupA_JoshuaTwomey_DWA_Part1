import { increase, decrease, reset } from "./models/actions.js";
import { getState, dispatch } from "./models/store.js";

console.log(getState())


dispatch(increase());
dispatch(increase());
console.log(getState());
dispatch(decrease());
console.log(getState());
dispatch(reset());
console.log(getState());
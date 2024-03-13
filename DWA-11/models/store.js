import { reducer } from "./reducer.js";

const baseState = {
  count: 0,
};

let subscribers = [];
const states = [baseState];

export const getState = () => {
  return Object.freeze({ ...states[0] });
};

export const dispatch = (action) => {
  const prev = getState();
  const next = reducer(prev, action);
  subscribers.forEach((item) => item(prev,next));
  states.unshift(next);
};

export const subscribe = (subscription) => {
  subscribers.push(subscription);
  const handler = (item) => item !== subscription
  const unsubscribe = () => {
    const newSubscribers = subscribers.filter(handler);
    subscribers = newSubscribers
  }
  return unsubscribe
};


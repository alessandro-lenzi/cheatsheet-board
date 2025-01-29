export const boxes = [
  {
    id: '1',
    left: 556,
    top: 338,
    width: 554,
    height: 442,
    title: 'What are the core principles of Redux?',
    initialContent: `- Single source of truth: The state of your whole application is stored in an object tree within a single store. The single state tree makes it easier to keep track of changes over time and debug or inspect the application.
- State is read-only: The only way to change the state is to emit an action, an object describing what happened. This ensures that neither the views nor the network callbacks will ever write directly to the state.
- Changes are made with pure functions: To specify how the state tree is transformed by actions, you write reducers. Reducers are just pure functions that take the previous state and an action as parameters, and return the next state.
`,
    color: 'blue',
  },
  {
    id: '2',
    left: 557,
    top: 31,
    width: 515,
    height: 289,
    title: 'Using a store',
    initialContent: `// Dispatches an action; this changes the state
store.dispatch({ type: 'INCREMENT' })
store.dispatch({ type: 'DECREMENT' })

// Gets the current state
store.getState()

// Listens for changes
store.subscribe(() => { ... })`,
    color: 'blue',
  },
  {
    id: '3',
    left: 23,
    top: 30,
    width: 513,
    height: 580,
    title: 'Redux: Creating a store',
    initialContent: `// A store is made from a reducer function,
// which takes the current state, and returns
// a new state depending on the action it was
// given.

import { createStore } from 'redux'

// Reducer
function counter (state = { value: 0 }, action) {
  switch (action.type) {
  case 'INCREMENT':
    return { value: state.value + 1 }
  case 'DECREMENT':
    return { value: state.value - 1 }
  default:
    return state
  }
}

let store = createStore(counter, { value: 0 })`,
    color: 'blue',
  },
];

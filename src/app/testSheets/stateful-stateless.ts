export const boxes = [
  {
    id: '4q2VolejRejNmGQB',
    left: 32,
    top: 29,
    width: 1061,
    height: 307,
    title: 'What are Stateful Components?',
    initialContent:
      'Stateful components, also known as class components (traditionally), are those that manage their own state. In React, "state" refers to an object that determines how a component renders and behaves. Stateful components are responsible for keeping track of changing data that affects the render output of the component.\n\nCharacteristics of Stateful Components:\n\n- They can hold and manage local state.\n- They have lifecycle methods (like componentDidMount, componentDidUpdate, etc.).\n- Usually more complex than stateless components.',
  },
  {
    id: 'O3GWpmbk5ezJn4KR',
    left: 33,
    top: 353,
    width: 1059,
    height: 418,
    title: 'What are Stateless Components?',
    initialContent:
      'Stateless components, also referred to as functional components, do not hold or manage local state. They simply accept data via props and render UI elements. With the introduction of Hooks in React 16.8, functional components have become more powerful, allowing them to use state and other React features without being class-based.\n\nCharacteristics of Stateless Components:\n\n- Do not have their own state (although, with Hooks, this is less clear-cut).\n- They are usually simpler and used for presenting static UI elements.\n- Easier to test and maintain due to their simplicity.\n\nThe Evolution with Hooks:\nWith the advent of Hooks, the line between stateful and stateless components has blurred. Functional components can now use useState, useEffect, and other hooks to manage state and side effects, traditionally the domain of class components.',
  },
];

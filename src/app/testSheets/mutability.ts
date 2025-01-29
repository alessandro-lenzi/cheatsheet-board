export const boxes = [
  {
    left: 515,
    top: 21,
    width: 590,
    height: 350,
    title: 'Immutability',
    initialContent: `// We need to find the index
const index = users.findIndex((u) => u.id === 2)

// Here's the immutable part:
// 1. Make a copy of the original
// 2. Make changes to the copy
// 3. Replace the original with the copy
const newArray = [
	...users.slice(0, index),
	...users.slice(index + 1)
];`,
    color: 'blue',
  },
  {
    left: 515,
    top: 400,
    width: 590,
    height: 350,
    title: 'Mutability',
    initialContent: `const users = [
  { id: 1, name: 'michael' },
  { id: 2, name: 'brad' }, // <-- let's remove
  { id: 3, name: 'ryan' },
]
// find brad's index
const index = users.findIndex((u) => u.id === 2)

// Mutation: Remove from an array using splice
users.splice(index, 1)
// Now the users array just has michael and ryan in it.
`,
    color: 'blue',
  },
  {
    left: 17,
    top: 21,
    width: 479,
    height: 620,
    title: 'What does it mean to be immutable?',
    initialContent: `When we say we want to do immutability, this does not mean that our data never changes. In fact quote the opposite. All application data needs to change over time, but doing immutability is just the technique to which we decide to change it.

Instead of mutating the array, we what if we replace the original array with a new one that has the changes we want. In other words, we:

- Make a copy of the original
- Make changes to the copy
- Replace the original with the copy

In general you can decide to use mutability or immutability, but React requires state to be immutable. In other words, we don't mutate state if we want to change it, instead we make a copy of it and replace the old state with the new copy - that's immutability.
`,
    color: 'blue',
  },
];

export const reactBoxes = [
  {
    left: 30,
    top: 31,
    width: 338,
    height: 301,
    title: 'JSX Basics',
    initialContent:
      "// Example JSX code\nconst helloWorld = () => {\n  return <div>Hello World!</div>;\n};\n\nReactDOM.render(helloWorld(), document.getElementById('root'));",
    color: 'blue',
  },
  {
    left: 424,
    top: 32,
    width: 509,
    height: 364,
    title: 'State and Props',
    initialContent:
      '// Example state code\nconst [count, setCount] = useState(0);\n\nreturn (\n  <div>\n    <p>Count: {count}</p>\n    <button onClick={() => setCount(count + 1)}>Increment</button>\n  </div>\n);',
    color: 'blue',
  },
  {
    left: 30,
    top: 362,
    width: 362,
    height: 333,
    title: 'Event Handling',
    initialContent:
      "// Example event handling code\nconst handleClick = () => {\n  console.log('Button clicked!')\n};\n\nreturn (\n  <div>\n    <button onClick={handleClick}>Click me!</button>\n  </div>\n);",
    color: 'blue',
  },
  {
    left: 424,
    top: 431,
    width: 449,
    height: 285,
    title: 'Lifecycle Methods',
    initialContent:
      "// Example lifecycle method code\ncomponentDidMount() {\n  console.log('Component mounted!')\n}\n\nrender() {\n  return <div>Component rendered!</div>\n};",
    color: 'blue',
  },
];

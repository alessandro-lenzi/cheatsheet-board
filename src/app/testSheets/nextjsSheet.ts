export const nextBoxes = [
  {
    left: 30,
    top: 31,
    width: 338,
    height: 246,
    title: 'Server-Side Rendering (SSR)',
    initialContent:
      '// Enable SSR for a page\nexport async function getServerSideProps() {\n  return {\n    props: {\n      data: ...\n    }\n  };\n}',
    color: 'blue',
  },
  {
    left: 424,
    top: 32,
    width: 439,
    height: 283,
    title: 'Static Site Generation (SSG)',
    initialContent:
      '// Enable SSG for a page\nexport async function getServerSideProps() {\n  return {\n    props: {\n      data: ...\n    }\n  };\n}\next export',
    color: 'blue',
  },
  {
    left: 30,
    top: 322,
    width: 364,
    height: 266,
    title: 'API Routes',
    initialContent:
      '// Define an API route\nexport async function handler(req, res) {\n  // Handle the request and response\n}',
    color: 'blue',
  },
  {
    left: 424,
    top: 421,
    width: 449,
    height: 251,
    title: 'Internationalization (i18n)',
    initialContent:
      '// Enable i18n for a page\nexport function getServerSideProps() {\n  return {\n    props: {\n      lang: ...\n    }\n  };\n}',
    color: 'blue',
  },
];

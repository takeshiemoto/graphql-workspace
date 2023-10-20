// relay.config.js
module.exports = {
  src: './src',
  language: 'typescript', // "javascript" | "typescript" | "flow"
  schema: 'schema.graphql',
  eagerEsModules: true,
  excludes: ['**/node_modules/**', '**/__mocks__/**', '**/__generated__/**'],
};

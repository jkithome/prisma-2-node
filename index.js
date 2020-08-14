const { PrismaClient } = require('@prisma/client');
const { GraphQLServer } = require('graphql-yoga')
const { makeExecutableSchema } = require('@graphql-tools/schema');

const typeDefs = `
  type Query {
    hello(name: String): String!
  }
`

const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name || 'World'}`,
  },
}


const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const prisma = new PrismaClient()

const server = new GraphQLServer({
  schema,
  context: {
    prisma,
  }
})

const options = {
  port: 8000,
  endpoint: '/graphql',
  subscriptions: '/subscriptions',
  playground: '/playground',
}
server.start(options, ({ port }) =>
  console.log(
    `Server started, listening on port ${port} for incoming requests.`,
  ),
)
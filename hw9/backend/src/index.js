import { GraphQLServer, PubSub } from 'graphql-yoga';
import db from './db';
import Message from '../resolvers/Message';
import Mutation from '../resolvers/Mutation';
import ChatBox from '../resolvers/ChatBox';
import Query from '../resolvers/Query';
import Subscription from '../resolvers/Subscription';
import mongo from './mongo';

const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers: {
    Mutation,
    Message,
    ChatBox,
    Query,
    Subscription
  },
  context: {
    db,
    pubsub
  }
});

mongo();

server.start({ port: process.env.PORT | 5000 }, () => {
  console.log(`The server is up on port ${process.env.PORT | 5000}!`);
});
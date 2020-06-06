import { gql } from 'apollo-server-fastify';

export default gql`
  extend type Query {
    user: User
  }

  type User {
    name: String
    age: Int
  }
`;

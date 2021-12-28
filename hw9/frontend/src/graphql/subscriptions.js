import { gql } from '@apollo/client';

export const MESSAGE_SUBSCRIPTION = gql`
    subscription message($from: String! $to: String!) {
        message(from: $from to: $to) {
            mutation
            data {
                sender {
                    name
                }
                body
            }
        }
    }
`;

export const USERS_SUBSCRIPTION = gql`
    subscription {
        user {
            mutation
            data {
                name
            }
        }
    }
`;
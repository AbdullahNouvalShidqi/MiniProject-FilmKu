import { gql } from "@apollo/client";

export const GetUserByEmailPassword = gql`
  query GetUserByEmailPassword($email: String!, $password: String!) {
    movieDatabase_user(where: {email: {_eq: $email}, _and: {password: {_eq: $password}}}) {
      id
      username
      email
    }
  }
`;

export const GetFavoriteMoviesByUserId = gql`
  query GetFavoriteMoviesByUserId($userId: Int!) {
    movieDatabase_favorite_movies(where: {userId: {_eq: $userId}}) {
      id
      userId
      movieId
      myRating
      myReview
      title
      overview
      poster_path
      status
      type
      vote_average
    }
  }
`;

export const GetUserByEmail = gql`
  query GetUserByEmail($email: String!) {
    movieDatabase_user(where: {email: {_eq: $email}}) {
      id
    }
  }
`;
import { gql } from "@apollo/client";

export const SignUp = gql`
    mutation SignUp($email: String!, $username: String!, $password: String!) {
        insert_movieDatabase_user(objects: {email: $email, username: $username, password: $password}) {
            returning {
                id
                username
                email
            }
        }
    }
`;

export const AddFavoriteMovie = gql`
    mutation AddFavoriteMovie($movieId: Int!, $userId: Int!, $myRating: Int!, $myReview: String!, $title: String!, $overview: String!, $poster_path: String!, $status: String!, $type: String!, $vote_average: String!) {
        insert_movieDatabase_favorite_movies(objects: {movieId: $movieId, userId: $userId, myRating: $myRating, myReview: $myReview, title: $title, overview: $overview, poster_path: $poster_path, status: $status, type: $type, vote_average: $vote_average}) {
            affected_rows
        }
    }
`;

export const UpdateFavoriteMoviesById = gql`
    mutation UpdateFavoriteMovieById($id: Int!, $myRating: Int!, $myReview: String!, $status: String!) {
        update_movieDatabase_favorite_movies(where: {id: {_eq: $id}}, _set: {myRating: $myRating, myReview: $myReview, status: $status}) {
            affected_rows
        }
    }
`;

export const DeleteFavoriteMovieById = gql`
    mutation DeleteFavoriteMovieById($id: Int!) {
    delete_movieDatabase_favorite_movies(where: {id: {_eq: $id}}) {
        affected_rows
    }
}
`;
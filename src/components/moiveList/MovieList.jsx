import { useEffect } from 'react';
import MovieCard from '../movieCard/MovieCard';
import axiosInstance from '../../config/axiosInstance'
import './MovieList.css';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { genres } from '../../redux/reducer/genreSlice';

const MovieList = (props) => {
    const { name, request, forSimilar, type } = props
    const [movieCards, setMovieCards] = useState([]);
    const currentSelectedGenres = useSelector(genres);

    useEffect(() =>{
        axiosInstance.get(`${request}${forSimilar ? '' : `&with_genres=${currentSelectedGenres}`}`)
        .then(response => {
            setMovieCards(() => {
                return response.data.results.map((movie) => {
                    return <MovieCard key={movie.id} movieData={movie} type={type}/>
                })
            })
        });
    },[request, forSimilar, currentSelectedGenres, type])

    return(
        <>
        {movieCards.length === 0 ? <></> :
            <div className="movielist-body">
                <div className="costum-title-container">
                    {name}
                </div>
                <div className="costum-container">
                    {movieCards}
                </div>
            </div>
            }
        </>
    )
}

export default MovieList;
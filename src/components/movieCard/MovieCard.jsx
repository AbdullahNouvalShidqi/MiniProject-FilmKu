import { useNavigate } from 'react-router-dom';
import MovieCardStarIcon from '../../assets/svg/movieCard_svgs/MovieCardStarIcon';
import './MovieCard.css'

const MovieCard = (props) => {
    const { movieData, type} = props;
    const navigate = useNavigate();
    
    const movieCardOnClick = (id) => {
        navigate(`/detail/${id}/${type}`);
    }

    return(
        <div className="costum-card" onClick={() => {movieCardOnClick(movieData.id);}}>
            <div className="rating">
                <MovieCardStarIcon />
                {movieData.vote_average === 0 ? '-.-' : movieData.vote_average}
            </div>
            {movieData.poster_path === null ? 
                <div className="no-image-found">
                    <div className='no-image-title'>Oops...</div>
                    <div className='no-image-subtitle'>No Image Found</div>
                </div> : 
                <img src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`} width={100} alt="" />}
            <div className="card-detail">
                <div className='title'>{type === 'Movie' ? movieData.title : movieData.name}</div>
                <div className='year'>{type === 'Movie' ? `${movieData.release_date?.substr(0,4) ?? ''}` : `${movieData.first_air_date?.substr(0,4) ?? ''}`}</div>
            </div>
        </div>
    );
}

export default MovieCard;
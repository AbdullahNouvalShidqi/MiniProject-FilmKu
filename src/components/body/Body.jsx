import { useSelector } from 'react-redux';
import { currentContent } from '../../redux/reducer/sidebarSlice';
import Genres from '../genres/Genres';
import MovieList from '../moiveList/MovieList';
import './Body.css'

const Body = () => {
    const currentContentValue = useSelector(currentContent);

    return(
        <div className='home-costum-body'>
            <Genres />
            <MovieList 
                name={`Popular ${currentContentValue}s`}
                request={`/discover/${currentContentValue.toLowerCase()}?language=en-US&include_adult=false&sort_by=popularity.desc`}
                type={currentContentValue}
            />
            <MovieList 
                name={`Top ${currentContentValue}s`}
                request={`/discover/${currentContentValue.toLowerCase()}?language=en-US&include_adult=false&sort_by=vote_count.desc`}
                type={currentContentValue}
            />
            <MovieList 
                name={`Upcoming ${currentContentValue}s`}
                request={`/discover/${currentContentValue.toLowerCase()}?language=en-US&include_adult=false&${currentContentValue === 'Movie' ? 'primary_release_year=2023': 'first_air_date_year=2023'}`}
                type={currentContentValue}
            />
        </div>
    );
}

export default Body;
import { useSelector } from 'react-redux';
import { currentContent } from '../../redux/reducer/sidebarSlice';
import GenreButton from './GenreButton';
import { movieGenreData, tvGenreData } from './genreData';
import './Genres.css'

const Genres = () => {
    const currentContentValue = useSelector(currentContent);

    return(
    <div className="costum-genres-buttons">
        {currentContentValue === 'Movie' ? 
        movieGenreData.genres.map((genre) => {
            return <GenreButton key={genre.id} name={genre.name} id={genre.id}/>
        }): 
        tvGenreData.genres.map((genre) => {
            return <GenreButton key={genre.id} name={genre.name} id={genre.id}/>
        })}
    </div>
    );
}

export default Genres;
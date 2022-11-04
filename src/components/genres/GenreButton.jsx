import { useDispatch, useSelector } from "react-redux";
import { addGenre, genres, removeGenre } from "../../redux/reducer/genreSlice";

const GenreButton = (props) => {
    const {id, name} = props;
    const currentSelectedGenres = useSelector(genres);
    const dispatch = useDispatch();

    const genreButtonOnClick = () => {
        if(!currentSelectedGenres.includes(id)){
            if(currentSelectedGenres.length >= 3){
                alert('The max numbers of selecting genres is 3 genres');
                return;
            }
            dispatch(addGenre(id));
        } else {
            dispatch(removeGenre(id));
        }
    }

    return(
        <div className={currentSelectedGenres.includes(id) ? "costum-genre-button selected" : "costum-genre-button"} onClick={genreButtonOnClick}>
            {name}
        </div>
    );
}

export default GenreButton;
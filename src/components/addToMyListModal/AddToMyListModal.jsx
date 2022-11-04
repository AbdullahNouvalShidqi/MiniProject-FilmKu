import { useLazyQuery, useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddFavoriteMovie, UpdateFavoriteMoviesById } from '../../graphql/mutations';
import { GetFavoriteMoviesByUserId } from '../../graphql/queries';
import { currentContent } from '../../redux/reducer/sidebarSlice';
import { getUserData, setUserList } from '../../redux/reducer/userSlice';
import './AddToMyListModal.css'

const fromBaseData = {
    id: '',
    userId: '',
    movieId: '',
    status: 'Plan to Watch',
    title: '',
    overview: '',
    poster_path: '',
    myRating: 0,
    myReview: '',
    type: '',
    vote_average: ''
}

const rating = [
    0,1,2,3,4,5,6,7,8,9,10
]

const AddToMyListModal = (props) => {
    const {exitOnClick, userListData, movieData, forUser, type} = props;
    const [formData, setFormData] = useState(fromBaseData);
    const [prevData, setPrevData] = useState(fromBaseData);
    const [addToFavorite, {loading}] = useMutation(AddFavoriteMovie);
    const [updateFavorite, {loading: updateLoading}] = useMutation(UpdateFavoriteMoviesById);
    const [getFavoriteMoviesByUserId, {loading: getListLoading}] = useLazyQuery(GetFavoriteMoviesByUserId);
    const dispatch = useDispatch();
    const currentContentValue = useSelector(currentContent);
    const userData = useSelector(getUserData)

    useEffect(() => {
        if(!forUser){
            setFormData(prev => ({
                ...prev,
                userId: userData.id,
                movieId: movieData.id,
                title: currentContentValue === 'Movie' ? movieData.title : movieData.name,
                overview: movieData.overview,
                poster_path: movieData.poster_path ?? '',
                type: type,
                vote_average: movieData.vote_average.toString() ?? '',
            }))
        }
        if(userListData !== undefined){
            setFormData({...userListData});
            setPrevData({...userListData});
        }
    }, [userListData, forUser, setFormData, userData, movieData, currentContentValue, type]);

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value, 
        });
    }

    const addToMyListOnClick = async () => {
        await addToFavorite({variables: formData});
        await getFavoriteMoviesByUserId({variables: {
            userId: userData.id
        }}).then((data) => {
            dispatch(setUserList(data.data.movieDatabase_favorite_movies));
            alert('Data added succesfuly');
            exitOnClick();
        })
    }

    const updateMyListOnClick = async () => {
        if(JSON.stringify(prevData) === JSON.stringify(formData)){
            alert('No data was change, please change your data to update your list');
            return;
        }
        await updateFavorite({variables:{
            id: formData.id,
            myRating: formData.myRating,
            myReview: formData.myReview,
            status: formData.status
        }});
        await getFavoriteMoviesByUserId({variables: {
            userId: userData.id
        }}).then((data) => {
            dispatch(setUserList(data.data.movieDatabase_favorite_movies));
            alert('Data updated succesfuly');
            exitOnClick();
        })
    }

    return(
        <div className="add-list-container">
            <div className="add-list-column">
                <div className="exit-button" onClick={exitOnClick}>
                    X
                </div>
                <div className="add-list-title">
                    {userListData !== undefined ? "Update Mylist" : "Add to My List"}
                </div>
                <div className="add-list-status-rating-container">    
                    <label htmlFor="status">
                        Status
                        <select name="status" id="status" onChange={onChange} value={formData.status}>
                            <option value="Plan to Watch">Plan to Watch</option>
                            <option value="Watching">Watching</option>
                            <option value="Finished">Finished</option>
                            <option value="Dropped">Dropped</option>
                        </select>
                    </label>
                    <label className={formData.status === 'Plan to Watch' ? 'hidden' : ''} htmlFor="myRating">
                        Your Rating
                        <select name="myRating" id="myRating" onChange={onChange} value={formData.myRating}>
                            {rating.map((data, i) => <option key={i} value={data} >{data}</option>)}
                        </select>
                    </label>
                </div>
                <label className={formData.status === 'Plan to Watch' || formData.status === 'Watching' ? 'hidden' : ''} htmlFor="myReview">
                    My Review
                </label>
                <textarea className={formData.status === 'Plan to Watch' || formData.status === 'Watching' ? 'hidden' : ''} onChange={onChange} name="myReview" id="myReview" value={formData.myReview ?? ''}/>
            </div>
            <div className="add-list-costum-button-container">
                <div className="add-list-costum-button" onClick={userListData !== undefined ? updateMyListOnClick : addToMyListOnClick}>
                    {loading || getListLoading || updateLoading ? 'Loading, please wait...' : 
                    <>{userListData !== undefined ? 'Update Mylist' : "Add to Mylist"}</>}
                </div>
            </div>
        </div>
    )
}

export default AddToMyListModal;
import { useLazyQuery, useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import UserMainIcon from '../../assets/svg/userBody_svgs/UserMainIcon';
import { DeleteFavoriteMovieById } from '../../graphql/mutations';
import { GetFavoriteMoviesByUserId } from '../../graphql/queries';
import { getUserData, getUserList, getUserState, setUserList } from '../../redux/reducer/userSlice';
import AddToMyListModal from '../addToMyListModal/AddToMyListModal';
import DeleteModal from '../deleteModal/DeleteModal';
import UserMovieCard from '../userMovieCard/UserMovieCard';
import UserStatusButton from '../userStatusButton/UserStatusButton';
import './UserBody.css'

const uesrListStatus = [
    {
        name: 'Plan to Watch'
    },
    {
        name: 'Watching'
    },
    {
        name: 'Finished'
    },
    {
        name: 'Dropped'
    },
]

const UserBody = () => {
    const [currentStatus, setCurrentStatus] = useState(uesrListStatus[0].name);
    const userData = useSelector(getUserData);
    const userList = useSelector(getUserList);
    const [filteredUserList, setFilteredUserList] = useState([]);
    const [modal, setModal] = useState(<></>);
    const [type, setType] = useState('Movie');
    const isLoggedIn = useSelector(getUserState);
    const [deleteFavoriteMovieById, {loading}] = useMutation(DeleteFavoriteMovieById);
    const [getFavoriteMoviesByUserId, {loading: getListLoading}] = useLazyQuery(GetFavoriteMoviesByUserId);
    const [deleteModal, setDeleteModal] = useState(<></>);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    

    useEffect(() => {
        if(!isLoggedIn){
            navigate('/');
        }
        const newData = userList.filter((data) => data.status === currentStatus && data.type === type);
        setFilteredUserList(newData);
    },[isLoggedIn, navigate, currentStatus, setFilteredUserList, userList, type])

    const statusOnClick = (statusName) => {
        setCurrentStatus(statusName);
    }

    const myReviewOnClick = (movieData) => {
        setModal(
            <div className="modal-costum-container">
                <AddToMyListModal exitOnClick={closeAddToListModalOnClick} userListData={movieData} forUser={true}/>
            </div>
        );
    }

    const closeAddToListModalOnClick = () => {
        setModal(<></>);
    }

    const onChange = (e) => {
        if(e.target.value === type)return;
        setType(e.target.value);
    }

    const deleteData = async (id) => {
        await deleteFavoriteMovieById({
            variables: {
                id: id
            }
        })
        await getFavoriteMoviesByUserId({variables: {
            userId: userData.id
        }}).then((data) => {
            dispatch(setUserList(data.data.movieDatabase_favorite_movies));
            alert('Data deleted succesfuly');
        })
        setDeleteModal(<></>);
    }

    const cancelOnClick = () => {
        setDeleteModal(<></>);
    }

    const deleteButtonOnClick = (movieData) => {
        setDeleteModal(
            <div className="modal-costum-container">
                <DeleteModal 
                    movieData={movieData} 
                    deleteOnClick={() => 
                    {deleteData(movieData.id)}} 
                    cancelOnClick={() => {cancelOnClick()}} 
                    loading={loading || getListLoading} 
                />
            </div>
        );
    }

    return(
        <>
            <div className="user-data-container">
                <UserMainIcon/>
                <div className="user-main-data-column">
                    <div className="user-username">
                        {userData.username}
                    </div>
                    <div className="user-total-movies">
                        Total Movies/TvS List: {userList.length}
                    </div>
                </div>
            </div>
            <div className="user-movie-list-container">
                <div className="user-costum-title-container">
                    My {type} List
                </div>
                <div className="user-row-status-type">
                    <div className="user-status-buttons-container">
                        {uesrListStatus.map((status, i) =>
                            <UserStatusButton 
                                key={i} 
                                status={status.name} 
                                currentStatus={currentStatus} 
                                statusOnClick={statusOnClick}
                            />
                        )}
                    </div>
                    <div className="user-type-select">
                        <select name="type" id="type" onChange={onChange} value={type}>
                            <option value="Movie">Movie</option>
                            <option value="Tv">Tv</option>
                        </select>
                    </div>
                </div>
                {filteredUserList.length === 0 ? 
                <div className='user-no-list'>
                    There is no {type} have added yet to {currentStatus}
                </div> :
                <div className="user-list-cards-column">
                    {filteredUserList.map((data, i) => 
                        <UserMovieCard 
                            key={i} 
                            movieData={data} 
                            status={currentStatus} 
                            myReviewOnClick={myReviewOnClick} 
                            deleteButtonOnClick={deleteButtonOnClick} 
                            type={type} 
                        />)
                    }
                </div>
                }
                {modal}
                {deleteModal}
            </div>
        </>
    );
}

export default UserBody;
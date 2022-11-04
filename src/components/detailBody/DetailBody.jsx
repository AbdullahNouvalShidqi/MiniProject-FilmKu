import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../config/axiosInstance';
import {  getUserList, getUserState } from '../../redux/reducer/userSlice';
import AddToMyListModal from '../addToMyListModal/AddToMyListModal';
import MovieList from '../moiveList/MovieList';
import TrailerModal from '../trailerModal/TrailerModal';
import './DetailBody.css'

const DetailBody = () => {
    const { id, type } = useParams();
    const [detail, setDetail] = useState({});
    const [showTrailerModal, setShowTrailerModal] = useState(false);
    const [showAddToListModal, setShowAddToListModal] = useState(false);
    const [videosData, setVideosData] = useState([]);
    const [userListData, setUserListData] = useState(undefined  );
    const userList = useSelector(getUserList);
    const isLoggenIn = useSelector(getUserState);
    const navigate = useNavigate();

    const watchTrailerOnClick = () => {
        setShowTrailerModal(prev => !prev);
    }

    const watchTrailerModalOuterBodyOnClick = () => {
        setShowTrailerModal(prev => !prev);
    }

    const addToListOnClick = () => {
        if(!isLoggenIn){
            alert('You need to log in or signup first');
            navigate('/signUp');
            return;
        }
        setShowAddToListModal(true);
    }

    const closeAddToListModalOnClick = () => {
        setShowAddToListModal(false);
    }

    useEffect(() =>  {
        axiosInstance.get(`/${type.toLowerCase()}/${id}`)
        .then(response => setDetail(response.data))
        .then(() => {
            axiosInstance.get(`${type.toLowerCase()}/${id}/videos?language=en-US`)
            .then(response => setVideosData(() => {
                const filteredData = response.data.results.filter((data) => data.type === 'Trailer' && data.site === 'YouTube');
                return filteredData
            }));
        });
        if(userList.length !== 0){
            const index = userList.findIndex((data) =>  parseInt(data.movieId) === parseInt(id));
            if(index !== -1){
                const data = userList[index];
                setUserListData(data);
            } else{
                setUserListData(undefined);
            }
        }
    },[type, id, userList])

    return(
        <>
            <div className="detail-costum-container" style={{backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) ), url(https://image.tmdb.org/t/p/original${detail.backdrop_path})`}}>
                <img src={`https://image.tmdb.org/t/p/w500${detail.poster_path}`} alt="" />
                <div className="detail-data-button">
                    <div className="detail-data-container">
                        <div className="detail-title">
                            {type === 'Movie' ? detail.title : detail.name}
                        </div>
                        <div className="detail-overview">
                            Overview: {detail.overview === '' ? 'No overview yet to be found' : <br/>}
                            {detail.overview}
                        </div>
                        <div className="detail-release-date">
                            Release date: {type === 'Movie' ? detail.release_date : detail.first_air_date}
                        </div>
                        <div className="detail-vote-rating">
                            Vote Rating: {detail.vote_average === 0 ? "Not rated" : detail.vote_average}
                        </div>
                    </div>
                    <div className="detail-buttons-container">
                        <div className={userListData !== undefined ? 'detail-button added' : "detail-button"} onClick={addToListOnClick}>
                            {userListData !== undefined ? userListData.status : 'Add to My List'}
                        </div>
                        <div className="detail-button" onClick={watchTrailerOnClick}>
                            Watch Trailer
                        </div>
                    </div>
                </div>
            </div>
            <div className="detail-list-container"> 
                <MovieList 
                    name={`Similar ${type}s`}
                    request={`/${type.toLowerCase()}/${id}/similar`}
                    forSimilar={true}
                    type={type}
                />
            </div>
            {showTrailerModal ? <div className="modal-costum-container" onClick={watchTrailerModalOuterBodyOnClick}><TrailerModal videosData={videosData} /></div> : <></>}
            {showAddToListModal ? <div className="modal-costum-container"><AddToMyListModal exitOnClick={closeAddToListModalOnClick} userListData={userListData} movieData={detail} type={type}/></div> : <></>}
        </>
    )
}

export default DetailBody;
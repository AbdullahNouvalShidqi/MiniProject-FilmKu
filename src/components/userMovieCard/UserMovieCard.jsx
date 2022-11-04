import { useNavigate } from 'react-router-dom';
import './UserMovieCard.css'

const UserMovieCard = (props) => {
    const { movieData, status, myReviewOnClick, deleteButtonOnClick, type } = props;

    const navigate = useNavigate();

    const movieCardOnClick = (id) => {
        navigate(`/detail/${id}/${type}`);
    }

    return(
        <div className="user-card-costum-container">
            <div className="user-list-poster-detail" >
                <img src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`} alt="" />
                <div className="user-vote-average">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.5152 5.28193L10.0185 4.59758L8.00833 0.330127C7.95343 0.213287 7.8631 0.118702 7.75153 0.0612089C7.4717 -0.0834504 7.13166 0.037099 6.99174 0.330127L4.9816 4.59758L0.484887 5.28193C0.360913 5.30047 0.247566 5.36167 0.160784 5.45441C0.0558699 5.56733 -0.00194268 5.71924 4.9848e-05 5.87678C0.00204238 6.03431 0.063677 6.18457 0.17141 6.29454L3.42484 9.61614L2.6562 14.3064C2.63818 14.4156 2.64971 14.5278 2.68948 14.6304C2.72926 14.733 2.79569 14.8218 2.88125 14.8869C2.9668 14.952 3.06805 14.9906 3.17353 14.9985C3.279 15.0064 3.38446 14.9831 3.47797 14.9314L7.50004 12.717L11.5221 14.9314C11.6319 14.9926 11.7594 15.013 11.8816 14.9908C12.1898 14.9352 12.397 14.6291 12.3439 14.3064L11.5752 9.61614L14.8287 6.29454C14.9172 6.20367 14.9757 6.08497 14.9934 5.95515C15.0412 5.63059 14.8251 5.33015 14.5152 5.28193Z" fill="#F8C100"/>
                    </svg>
                    {movieData.vote_average === '0' ? '-.-' : movieData.vote_average}
                </div>
                <div className="user-list-detail">
                    <div className="user-list-title">
                        {movieData.title}
                    </div>
                    <div className="user-list-overview">
                        Overview: <br/>
                        {movieData.overview}
                    </div>
                    <div className="user-more-detail-button" onClick={() => {movieCardOnClick(movieData.movieId)}}>
                        More Detail
                    </div>
                </div>
            </div>
            <div className="user-buttons-rating-column">
                <div className="user-card-buttons">
                    <div className="user-costum-button" onClick={() => {myReviewOnClick(movieData)}}>
                        {status === 'Plan to Watch' ? "Update Status" : "My Review"}
                    </div>
                    <div className="user-costum-delete-button" onClick={() => {deleteButtonOnClick(movieData)}}>
                        Delete
                    </div>
                </div>
                {status === 'Plan to Watch' || movieData.myRating === '' ? 
                <></> : 
                <div className="user-rating-container">
                    <div className="user-your-rating-title">
                        Your Rating
                    </div>
                    <div className="user-logo-rating-row">
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M29.0304 10.5639L20.037 9.19515L16.0167 0.660254C15.9069 0.426573 15.7262 0.237403 15.5031 0.122418C14.9434 -0.166901 14.2633 0.0741981 13.9835 0.660254L9.96319 9.19515L0.969774 10.5639C0.721827 10.6009 0.495132 10.7233 0.321568 10.9088C0.11174 11.1347 -0.00388537 11.4385 9.9696e-05 11.7536C0.00408476 12.0686 0.127354 12.3691 0.342821 12.5891L6.84968 19.2323L5.3124 28.6129C5.27635 28.8311 5.29941 29.0555 5.37896 29.2607C5.45852 29.4659 5.59138 29.6436 5.76249 29.7738C5.9336 29.9039 6.13611 29.9812 6.34705 29.997C6.55799 30.0128 6.76893 29.9663 6.95594 29.8629L15.0001 25.4341L23.0442 29.8629C23.2638 29.9853 23.5188 30.0261 23.7633 29.9816C24.3796 29.8703 24.794 29.2583 24.6877 28.6129L23.1505 19.2323L29.6573 12.5891C29.8344 12.4073 29.9513 12.1699 29.9867 11.9103C30.0824 11.2612 29.6502 10.6603 29.0304 10.5639Z" fill="#F8C100"/>
                    </svg>
                        <div className="user-rating-number">
                            {movieData.myRating}
                        </div>
                    </div>   
                </div>
                }
            </div>
        </div>
    );
}

export default UserMovieCard;
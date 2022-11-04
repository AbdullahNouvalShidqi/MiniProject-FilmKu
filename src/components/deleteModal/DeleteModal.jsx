import { useEffect, useState } from 'react';
import './DeleteModal.css'

const DeleteModal = (props) => {
    const {movieData, deleteOnClick, cancelOnClick, loading} = props;
    const [isLoading, setisLoading] = useState(false);

    useEffect(() => {
        setisLoading(() => loading)
    }, [loading, setisLoading])

    return(
        <div className="delete-modal-container">
            <div className="delete-modal-title-column">
                <div className="delete-modal-title">
                    You sure you want to delete {movieData.title} from your list?
                </div>
                <div className="delete-modal-subtitle">
                    Deleting your data means you need to find the movie again to get it into your list.
                </div>
                {isLoading ? 
                    <div className="delete-modal-loading">
                        Loading please wait...
                    </div> 
                    :
                    <></>
                }
            </div>
            <div className="delete-modal-buttons-row">
                <div className="delete-modal-button" onClick={deleteOnClick}>
                    Delete
                </div>
                <div className="delete-modal-cancel-button" onClick={cancelOnClick}>
                    Cancel
                </div>
            </div>
        </div>
    );
}

export default DeleteModal;
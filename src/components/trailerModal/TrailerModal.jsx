import './TrailerModal.css'

const TrailerModal = (props) => {
    const { videosData } = props;

    return(
        <>
            {videosData.length === 0 ? 
            <div className="trailer-no-videos-found">
                <div className="trailer-no-videos-title">
                    Opps
                </div>
                <div className="trailer-no-videos-subtitle">
                    There is no trailer video found on the database.
                </div>
            </div> : 
            <iframe 
                src={`https://www.youtube.com/embed/${videosData[0]?.key}`} 
                frameBorder="0" 
                title="youtube-frame" 
                width={727} 
                height={409} 
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />}
        </>
    )
    

}

export default TrailerModal;
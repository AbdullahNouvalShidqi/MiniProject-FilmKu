import { useDispatch, useSelector } from 'react-redux';
import { clearGenre } from '../../redux/reducer/genreSlice';
import { currentContent, updateContent } from '../../redux/reducer/sidebarSlice';
import './Sidebar.css'

const Sidebar = (props) => {
    const {showSidebar, sideBarButtonOnClick} = props;
    const currentContentValue = useSelector(currentContent);
    const dispatch = useDispatch();

    const sidebarTileOnClick = (contentName) => {
        if(contentName === currentContentValue)return;
        dispatch(clearGenre());
        dispatch(updateContent(contentName));
        sideBarButtonOnClick();
    }

    return(
        <div className={showSidebar ? "costum-sidebar" : "costum-sidebar hidden"} style={{height:`${document.body.scrollHeight - 60}px`}}>
            <div className={currentContentValue === 'Movie' ? "costum-sidebar-item selected" : 'costum-sidebar-item'} onClick={() => sidebarTileOnClick('Movie')}>
                Movies
            </div>
            <div className={currentContentValue === 'Tv' ? "costum-sidebar-item selected" : 'costum-sidebar-item'} onClick={() => sidebarTileOnClick('Tv')}>
                Series
            </div>
        </div>
    );
}

export default Sidebar;
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import NavbarBurgerIcon from '../../assets/svg/navbar_svgs/NavbarBurgerIcon';
import NavbarMainIcon from '../../assets/svg/navbar_svgs/NavbarMainIcon';
import NavbarUserIcon from '../../assets/svg/navbar_svgs/NavbarUserIcon';
import { getUserData, getUserState, logOut } from '../../redux/reducer/userSlice';
import './Navbar.css'

const Navbar = (props) => {
    const { sideBarButtonOnClick, navbarForDetail, navbarForUser } = props;
    const navigate = useNavigate();
    const isLoggedIn = useSelector(getUserState);
    const userData = useSelector(getUserData);
    const dispatch = useDispatch();

    const seeProfileOnClick = () => {
        navigate('/user')
    }

    const logOutOnClick = () => {
        dispatch(logOut());
    }

    const signUpButtonOnClick = () => {
        navigate('/signUp')
    }

    const loginButtonOnClick = () => {
        navigate('/login')
    }

    const mainLogoOnClick = () => {
        navigate('/');
    }

    return(
        <div className='costum-navbar'>
            <div className="burger-title">
                {navbarForDetail || navbarForUser ? <></> : <NavbarBurgerIcon sideBarButtonOnClick={sideBarButtonOnClick} />}

                <div className='costum-logo-title' onClick={mainLogoOnClick}>                    
                    <NavbarMainIcon/>
                    Filmku
                </div>
            </div>
            {isLoggedIn ? 
                <div className="navbar-username-logo-row">
                    <div className="navbar-greeting-user">
                        Hello, {userData.username}
                    </div>
                    <div className="navbar-dropdown">
                        <NavbarUserIcon/>
                        <div className="navbar-dropdown-content">
                            <div className='navbar-dropdown-item' onClick={seeProfileOnClick}>See Profile</div>
                            <div className='navbar-dropdown-item' onClick={logOutOnClick}>Log out</div>
                        </div>
                    </div>
                    
                </div>
                : 
                <div className="login-signup-row">
                    <div className="costum-button" onClick={signUpButtonOnClick}>
                        Signup
                    </div>
                    <div className="costum-button" onClick={loginButtonOnClick}>
                        Login
                    </div>
                </div>
            }
        </div>
    );
}

export default Navbar;
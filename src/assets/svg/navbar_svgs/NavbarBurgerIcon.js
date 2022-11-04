const NavbarBurgerIcon = (props) => {
    const { sideBarButtonOnClick } = props;
    
    return(
        <svg className='burger' width="34" height="24" viewBox="0 0 34 24" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={sideBarButtonOnClick}>
            <rect width="34" height="6" rx="3" fill="#D9D9D9"/>
            <rect y="9" width="34" height="6" rx="3" fill="#D9D9D9"/>
            <rect y="18" width="34" height="6" rx="3" fill="#D9D9D9"/>
        </svg>
    );
}

export default NavbarBurgerIcon;
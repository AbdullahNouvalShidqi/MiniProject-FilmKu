import Navbar from "../components/navbar/Navbar";
import UserBody from "../components/userBody/UserBody";

const User = () => {
    return(
        <>
            <Navbar navbarForUser={true}/>
            <UserBody/>
        </>
    )
}

export default User;
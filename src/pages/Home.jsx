import { useState } from "react";
import Body from "../components/body/Body";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";

const Home = () => {
    const [showSidebar, setShowSidebar] = useState(false);
    const sideBarButtonOnClick = () => {
        setShowSidebar(!showSidebar);
    }

    return(
      <>
        <Navbar sideBarButtonOnClick={sideBarButtonOnClick} />
        <Sidebar showSidebar={showSidebar} sideBarButtonOnClick={sideBarButtonOnClick} />
        <Body />
        <Footer/>
      </>
    );
}

export default Home;
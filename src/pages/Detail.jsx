import { useParams } from "react-router-dom";
import DetailBody from "../components/detailBody/DetailBody";
import Navbar from "../components/navbar/Navbar";

const Detail = () => {
    const { id } = useParams();

    return(
        <>
            <Navbar navbarForDetail={true}/>
            <DetailBody id={id}/>
        </>
    )
}

export default Detail;
import { useParams } from "react-router-dom";
import { IRouteId } from "../../types/IRouteId";

const ContactTypeDetails = () => {
    // get the router params from hook
    const {id} = useParams() as IRouteId; 

    return (
        <div>ContactTypeDetails Id: {id}</div>
    );
}

export default ContactTypeDetails;
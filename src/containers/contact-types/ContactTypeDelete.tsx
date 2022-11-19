import { useParams } from "react-router-dom";
import { IRouteId } from "../../types/IRouteId";

const ContactTypeDelete = () => {
    const {id} = useParams() as IRouteId; 
    
    return (
        <div>ContactTypeDelete {id}</div>
    );
}

export default ContactTypeDelete;
import { useParams } from "react-router-dom";
import { IRouteId } from "../../types/IRouteId";

const ContactTypeEdit = () => {
    const {id} = useParams() as IRouteId; 
    return (
        <div>ContactTypeEdit {id}</div>
    );
}

export default ContactTypeEdit;
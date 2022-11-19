import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { IContactType } from "../../dto/IContactType";
import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";

const RowDisplay = (props: { contactType: IContactType }) => (
    <tr>
        <td>
            {props.contactType.contactTypeValue}
        </td>
        <td>
            {props.contactType.contactCount}
        </td>
        <td>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {/* <Link to={'/ContactTypes/' + props.contactType.id}>Details</Link> */}
        </td>
    </tr>
);

const ContactTypeIndex = () => {
    const [contactTypes, setContactTypes] = useState([] as IContactType[]);

    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });

    const loadData = async () => {
        let result = await BaseService.getAll<IContactType>('/contacttypes');

        if (result.ok && result.data) {
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
            setContactTypes(result.data);
        } else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: result.statusCode });
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <>
            <h1>ContactTypes</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>
                            ContactType
                        </th>
                        <th>
                            Count
                        </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {contactTypes.map(contactType =>
                        <RowDisplay contactType={contactType} key={contactType.id} />)
                    }
                </tbody>
            </table>
            <Loader {...pageStatus} />
        </>
    );
}

export default ContactTypeIndex;
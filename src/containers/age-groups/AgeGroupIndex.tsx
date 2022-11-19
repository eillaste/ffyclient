import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { IAgeGroup } from "../../dto/IAgeGroup";
import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";
// import UniversalModal from "../../components/UniversalModal";
import AgeGroupModal from "../../components/AgeGroupModal";
import { AppContext } from "../../context/AppContext";



const RowDisplay = (props: { agegroup: IAgeGroup, drillBits: any }) => {


    return (
    <tr>
        <td>
            {props.agegroup.range}
        </td>

        <td>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {/* <Link to={'/agegroups/' + props.agegroup.id}>Details</Link> */}
        </td>
<AgeGroupModal agegroup={props.agegroup} refreshList={props.drillBits}/>
      
    </tr>)
};

const AgeGroupIndex = () => {
    const appState = useContext(AppContext);
    const credentials = appState.jwt;
    
    const [agegroups, setAgeGroups] = useState([] as IAgeGroup[]);

    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });

    const loadData = async () => {
        let result = await BaseService.getAll<IAgeGroup>('/AgeGroups', credentials!);
        // let entityListItems = await BaseService.getAll<IEntity>('/Entities');
        console.log(result)
        if (result.ok && result.data) {
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
            setAgeGroups(result.data);
        } else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: result.statusCode });
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <>
            <h1>AgeGroups</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>
                        AgeGroup
                        </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {agegroups.map(agegroup =>
                        <RowDisplay agegroup={agegroup} key={agegroup.id} drillBits={loadData}/>)
                    }
                </tbody>
            </table>
            <Loader {...pageStatus} />
        </>
    );
}

export default AgeGroupIndex;


  
  //render(<Example />);
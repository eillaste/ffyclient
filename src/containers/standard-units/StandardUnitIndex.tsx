import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { IStandardUnit } from "../../dto/IStandardUnit";
import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";
import UniversalModal from "../../components/UniversalModal";


const RowDisplay = (props: { standardUnit: IStandardUnit, drillBits: any }) => {


    return (
    <tr>
        <td>
            {props.standardUnit.title}
        </td>
        <td>
            {props.standardUnit.symbol}
        </td>
        <td>
            {/* <Link to={'/standardunits/' + props.standardUnit.id}>Details</Link> */}
        </td>
<UniversalModal standardUnit={props.standardUnit} refreshList={props.drillBits}/>
      
    </tr>)
};

const StandardUnitIndex = () => {
    
    
    const [standardUnits, setStandardUnits] = useState([] as IStandardUnit[]);

    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });

    const loadData = async () => {
        let result = await BaseService.getAll<IStandardUnit>('/StandardUnits');
        // let entityListItems = await BaseService.getAll<IEntity>('/Entities');

        if (result.ok && result.data) {
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
            setStandardUnits(result.data);
        } else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: result.statusCode });
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <>
            <h1>Standar dUnits</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>
                            Standard Unit
                        </th>
                        <th>
                            Symbol
                        </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {standardUnits.map(standardUnit =>
                        <RowDisplay standardUnit={standardUnit} key={standardUnit.id} drillBits={loadData}/>)
                    }
                </tbody>
            </table>
            <Loader {...pageStatus} />
        </>
    );
}

export default StandardUnitIndex;


  
  //render(<Example />);
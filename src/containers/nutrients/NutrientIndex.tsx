import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { INutrient } from "../../dto/INutrient";
import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";
// import UniversalModal from "../../components/UniversalModal";
import NutrientModal from "../../components/NutrientModal";
import { AppContext } from "../../context/AppContext";
import { IStandardUnit } from "../../dto/IStandardUnit";
import { IFetchResponse } from "../../types/IFetchResponse";



const RowDisplay = (props: { nutrient: INutrient, drillBits: any, standardUnits: IStandardUnit[] }) => {


    return (
    <tr>
        <td>
            {props.nutrient.title}
        </td>
        <td>
            {props.nutrient.standardUnitTitle}
        </td>
        <td>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  {/* <Link to={'/nutrients/' + props.nutrient.id}>Details</Link> */}
        </td>
<NutrientModal nutrient={props.nutrient} refreshList={props.drillBits} standardUnits={props.standardUnits}/>
      {/* needs extra props */}
    </tr>)
};

const NutrientIndex = () => {
    const appState = useContext(AppContext);
    const credentials = appState.jwt;
    
    const [nutrients, setNutrients] = useState([] as INutrient[]);
    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });
    const [standardUnits, setStandardUnits] = useState([] as IStandardUnit[])

const getAllStandardUnits = async () => {
  try {
    let standardUnits: IFetchResponse<IStandardUnit[]> = await BaseService.getAll<IStandardUnit>('/StandardUnits/', credentials!)
    return standardUnits.data;
  } catch (error) {
    console.log(error)
  }
}

      const getStandardUnitTitle = async (element: INutrient) =>{
        let standardUnit: IStandardUnit = await (await BaseService.get<IStandardUnit>('/StandardUnits/' + element.standardUnitId, credentials!)).data!;

      return standardUnit.title;
    }

    const loadData = async () => {
        let result = await BaseService.getAll<INutrient>('/Nutrients', credentials!);
        let units = await getAllStandardUnits();
        console.log("INSIDE LOAD DATA")
        console.log(units)
        setStandardUnits(units!);
        if (result.ok && result.data) {
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
            let data: INutrient[] = await Promise.all(result.data.map(async (element) => {
              try {
              let standardUnitTitle = await getStandardUnitTitle(element);
              return {id: element.id, standardUnitId: element.standardUnitId, title: element.title, standardUnitTitle: standardUnitTitle}; 
              } catch(err) {
                 throw err;
              }
          }));
            setNutrients(data);
        } else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: result.statusCode });
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <>
            <h1>Nutrients</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>
                            Nutrient
                        </th>
                        <th>
                          Standard Unit
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {nutrients.map(nutrient =>
                        <RowDisplay nutrient={nutrient} key={nutrient.id} drillBits={loadData} standardUnits={standardUnits}/>)
                    }
                </tbody>
            </table>
            <Loader {...pageStatus} />
        </>
    );
}

export default NutrientIndex;


  
  //render(<Example />);
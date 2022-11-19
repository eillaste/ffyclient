import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { ICategory } from "../../dto/ICategory";
import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";
// import UniversalModal from "../../components/UniversalModal";
import CategoryModal from "../../components/CategoryModal";
import { AppContext } from "../../context/AppContext";



const RowDisplay = (props: { category: ICategory, drillBits: any }) => {


    return (
    <tr>
        <td>
            {props.category.title}
        </td>

        <td>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{/* <Link to={'/categories/' + props.category.id}>Details</Link> */}
        </td>
<CategoryModal category={props.category} refreshList={props.drillBits}/>
      
    </tr>)
};

const CategoryIndex = () => {
    const appState = useContext(AppContext);
    const credentials = appState.jwt;
    
    const [categories, setCategories] = useState([] as ICategory[]);

    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });

    const loadData = async () => {
        let result = await BaseService.getAll<ICategory>('/Categories', credentials!);
        // let entityListItems = await BaseService.getAll<IEntity>('/Entities');
        console.log(result)
        if (result.ok && result.data) {
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
            setCategories(result.data);
        } else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: result.statusCode });
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <>
            <h1>Categories</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>
                            Category
                        </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map(category =>
                        <RowDisplay category={category} key={category.id} drillBits={loadData}/>)
                    }
                </tbody>
            </table>
            <Loader {...pageStatus} />
        </>
    );
}

export default CategoryIndex;


  
  //render(<Example />);
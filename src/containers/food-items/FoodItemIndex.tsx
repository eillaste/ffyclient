import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { IFoodItem } from "../../dto/IFoodItem";
import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";
// import UniversalModal from "../../components/UniversalModal";
import FoodItemModal from "../../components/FoodItemModal";
import { AppContext } from "../../context/AppContext";
import { IStandardUnit } from "../../dto/IStandardUnit";
import { IFetchResponse } from "../../types/IFetchResponse";
import { ICategory } from "../../dto/ICategory";



const RowDisplay = (props: { foodItem: IFoodItem, drillBits: any, standardUnits: IStandardUnit[], categories: ICategory[] }) => {


    return (
    <tr>
        <td>
            {props.foodItem.title}
        </td>
        <td>
            {props.foodItem.standardUnitTitle}
        </td>
        <td>
            {props.foodItem.categoryTitle}
        </td>
        <td>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {/* <Link to={'/fooditems/' + props.foodItem.id}>Details</Link> */}
        </td>
<FoodItemModal foodItem={props.foodItem} refreshList={props.drillBits} standardUnits={props.standardUnits} categories={props.categories}/>
      {/* needs extra props */}
    </tr>)
};

const FoodItemIndex = () => {
    const appState = useContext(AppContext);
    const credentials = appState.jwt;
    const userId = appState.userId;
    console.log("USER ID")
    console.log(userId, credentials)
    
    const [foodItems, setFoodItems] = useState([] as IFoodItem[]);
    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });
    const [standardUnits, setStandardUnits] = useState([] as IStandardUnit[])
    const [categories, setCategories] = useState([] as ICategory[])

const getAllStandardUnits = async () => {
  try {
    let standardUnits: IFetchResponse<IStandardUnit[]> = await BaseService.getAll<IStandardUnit>('/StandardUnits/', credentials!)
    return standardUnits.data;
  } catch (error) {
    console.log(error)
  }
}

const getAllCategories = async () => {
  try {
    let categories: IFetchResponse<ICategory[]> = await BaseService.getAll<ICategory>('/Categories/', credentials!)
    return categories.data;
  } catch (error) {
    console.log(error)
  }
}

      const getStandardUnitTitle = async (element: IFoodItem) =>{
        let standardUnit: IStandardUnit = await (await BaseService.get<IStandardUnit>('/StandardUnits/' + element.standardUnitId, credentials!)).data!;
      return standardUnit.title;
    }

    const getCategoryTitle = async (element: IFoodItem) =>{
      let category: ICategory = await (await BaseService.get<ICategory>('/Categories/' + element.categoryId, credentials!)).data!;
    return category.title;
  }

    const loadData = async () => {
        let result = await BaseService.getAll<IFoodItem>('/FoodItems', credentials!);
        let units = await getAllStandardUnits();
        let categories = await getAllCategories();
        console.log("INSIDE LOAD DATA")
        console.log(units)
        console.log(categories)
        setStandardUnits(units!);
        setCategories(categories!);
        if (result.ok && result.data) {
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
            let data: IFoodItem[] = await Promise.all(result.data.map(async (element) => {
              try {
              let standardUnitTitle = await getStandardUnitTitle(element);
              let categoryTitle = await getCategoryTitle(element);
              return {id: element.id, title: element.title, standardUnitId: element.standardUnitId,  standardUnitTitle: standardUnitTitle, categoryId: element.categoryId,  categoryTitle: categoryTitle}; 
              } catch(err) {
                 throw err;
              }
          }));
            setFoodItems(data);
        } else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: result.statusCode });
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <>
            <h1>Food Items</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>
                            Title
                        </th>
                        <th>
                          Standard Unit
                        </th>
                        <th>
                          Category
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {foodItems.map(fooditem =>
                        <RowDisplay foodItem={fooditem} key={fooditem.id} drillBits={loadData} standardUnits={standardUnits} categories={categories}/>)
                    }
                </tbody>
            </table>
            <Loader {...pageStatus} />
        </>
    );
}

export default FoodItemIndex;


  
  //render(<Example />);
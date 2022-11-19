import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { INutrientInFoodItem } from "../../dto/INutrientInFoodItem";
import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";
// import UniversalModal from "../../components/UniversalModal";
import NutrientInFoodItemModal from "../../components/NutrientInFoodItemModal";
import { AppContext } from "../../context/AppContext";
import { IStandardUnit } from "../../dto/IStandardUnit";
import { IFetchResponse } from "../../types/IFetchResponse";
import { ICategory } from "../../dto/ICategory";
import { INutrient } from "../../dto/INutrient";
import { IFoodItem } from "../../dto/IFoodItem";



const RowDisplay = (props: { nutrientInFoodItem: INutrientInFoodItem, drillBits: any, nutrients: INutrient[], foodItems: IFoodItem[] }) => {


    return (
    <tr>
        <td>
            {props.nutrientInFoodItem.nutrientTitle}
        </td>
        <td>
            {props.nutrientInFoodItem.foodItemTitle}
        </td>
        <td>
            {props.nutrientInFoodItem.quantity}
        </td>
        <td>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   {/* <Link to={'/nutrientinfooditem/' + props.nutrientInFoodItem.id}>Details</Link> */}
        </td>
<NutrientInFoodItemModal nutrientInFoodItem={props.nutrientInFoodItem} refreshList={props.drillBits} nutrients={props.nutrients} foodItems={props.foodItems}/>
      {/* needs extra props */}
    </tr>)
};

const NutrientInFoodItemIndex = () => {
    const appState = useContext(AppContext);
    const credentials = appState.jwt;
    
    const [nutrientInFoodItems, setNutrientInFoodItem] = useState([] as INutrientInFoodItem[]);
    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });
    const [nutrients, setNutrients] = useState([] as INutrient[])
    const [foodItems, setFoodItems] = useState([] as IFoodItem[])

const getAllNutrients = async () => {
  try {
    let nutrients: IFetchResponse<INutrient[]> = await BaseService.getAll<INutrient>('/Nutrients/', credentials!)
    return nutrients.data;
  } catch (error) {
    console.log(error)
  }
}

const getAllFoodItems = async () => {
  try {
    let foodItems: IFetchResponse<IFoodItem[]> = await BaseService.getAll<IFoodItem>('/FoodItems/', credentials!)
    return foodItems.data;
  } catch (error) {
    console.log(error)
  }
}

      const getNutrientTitle = async (element: INutrientInFoodItem) =>{
        let nutrient: INutrient = await (await BaseService.get<INutrient>('/Nutrients/' + element.nutrientId, credentials!)).data!;
      return nutrient.title;
    }

    const getFoodItemTitle = async (element: INutrientInFoodItem) =>{
      let foodItem: IFoodItem = await (await BaseService.get<IFoodItem>('/FoodItems/' + element.foodItemId, credentials!)).data!;
    return foodItem.title;
  }

    const loadData = async () => {
        let result = await BaseService.getAll<INutrientInFoodItem>('/NutrientInFoodItem', credentials!);
        let nutrients = await getAllNutrients();
        let foodItems = await getAllFoodItems();
        console.log("INSIDE LOAD DATA")
        console.log(nutrients)
        console.log(foodItems)
        setNutrients(nutrients!);
        setFoodItems(foodItems!);
        if (result.ok && result.data) {
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
            let data: INutrientInFoodItem[] = await Promise.all(result.data.map(async (element) => {
              try {
              let nutrientTitle = await getNutrientTitle(element);
              let foodItemTitle = await getFoodItemTitle(element);
              return {id: element.id, nutrientId: element.nutrientId,  nutrientTitle: nutrientTitle, foodItemId: element.foodItemId,  foodItemTitle: foodItemTitle, quantity: element.quantity}; 
              } catch(err) {
                 throw err;
              }
          }));
            setNutrientInFoodItem(data);
        } else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: result.statusCode });
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <>
            <h1>Nutrient In Food Item</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>
                            Nutrient
                        </th>
                        <th>
                          Food Item
                        </th>
                        <th>
                          Quantity
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {nutrientInFoodItems.map(nutrientinfooditem =>
                        <RowDisplay nutrientInFoodItem={nutrientinfooditem} key={nutrientinfooditem.id} drillBits={loadData} nutrients={nutrients} foodItems={foodItems}/>)
                    }
                </tbody>
            </table>
            <Loader {...pageStatus} />
        </>
    );
}

export default NutrientInFoodItemIndex;


  
  //render(<Example />);
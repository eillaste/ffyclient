import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { INutrientInFoodItem } from "../../dto/INutrientInFoodItem";
import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";
// import UniversalModal from "../../components/UniversalModal";
import IngredientModal from "../../components/IngredientModal";
import { AppContext } from "../../context/AppContext";
import { IStandardUnit } from "../../dto/IStandardUnit";
import { IFetchResponse } from "../../types/IFetchResponse";
import { ICategory } from "../../dto/ICategory";
import { INutrient } from "../../dto/INutrient";
import { IFoodItem } from "../../dto/IFoodItem";
import { IIngredient } from "../../dto/IIngredient";
import { IRecipe } from "../../dto/IRecipe";

// export interface IIngredient{
//   id?: string;
//   appUserId: string;
//   foodItemId: string;
//   foodItemTitle?:string;
//   recipeId: string;
//   recipeDescription?: string;
//   quantity: number;
// }

const RowDisplay = (props: { ingredient: IIngredient, drillBits: any, recipes: IRecipe[], foodItems: IFoodItem[] }) => {


    return (
    <tr>
        <td>
            {props.ingredient.foodItemTitle}
        </td>
        <td>
            {props.ingredient.recipeDescription}
        </td>
        <td>
            {props.ingredient.quantity}
        </td>
        <td>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </td>
<IngredientModal ingredient={props.ingredient} refreshList={props.drillBits} recipes={props.recipes} foodItems={props.foodItems}/>
      {/* needs extra props */}
    </tr>)
};

const IngredientIndex = () => {
    const appState = useContext(AppContext);
    const credentials = appState.jwt;
    
    const [ingredients, setIngredients] = useState([] as IIngredient[]);
    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });
    const [recipes, setRecipes] = useState([] as IRecipe[])
    const [foodItems, setFoodItems] = useState([] as IFoodItem[])
////////////////////////////////////// need appid?
const getAllRecipes = async () => {
  try {
    let recipes: IFetchResponse<IRecipe[]> = await BaseService.getAll<IRecipe>('/Recipes/', credentials!)
    return recipes.data;
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

      const getRecipeDescription = async (element: IIngredient) =>{
        let recipe: IRecipe = await (await BaseService.get<IRecipe>('/Recipes/' + element.recipeId, credentials!)).data!;
      return recipe.description;
    }

    const getFoodItemTitle = async (element: IIngredient) =>{
      let foodItem: IFoodItem = await (await BaseService.get<IFoodItem>('/FoodItems/' + element.foodItemId, credentials!)).data!;
    return foodItem.title;
  }

    const loadData = async () => {
        let result = await BaseService.getAll<IIngredient>('/Ingredients', credentials!);
        let recipes = await getAllRecipes();
        let foodItems = await getAllFoodItems();
        console.log("INSIDE LOAD DATA")
        console.log(recipes)
        console.log(foodItems)
        setRecipes(recipes!);
        setFoodItems(foodItems!);
        if (result.ok && result.data) {
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
            let data: IIngredient[] = await Promise.all(result.data.map(async (element) => {
              try {
              let recipeDescription = await getRecipeDescription(element);
              let foodItemTitle = await getFoodItemTitle(element);
              return {id: element.id, appUserId: element.appUserId, recipeId: element.recipeId, recipeDescription: recipeDescription, foodItemId: element.foodItemId,  foodItemTitle: foodItemTitle, quantity: element.quantity}; 
              } catch(err) {
                 throw err;
              }
          }));
            setIngredients(data);
        } else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: result.statusCode });
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <>
            <h1>Ingredients</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>
                            Recipe
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
                    {ingredients.map(ingredient => ingredient.appUserId === appState.userId ?
                        <RowDisplay ingredient={ingredient} key={ingredient.id} drillBits={loadData} recipes={recipes} foodItems={foodItems}/>
                        :
                        <></>)
                    }
                </tbody>
            </table>
            <Loader {...pageStatus} />
        </>
    );
}

export default IngredientIndex;


  
  //render(<Example />);
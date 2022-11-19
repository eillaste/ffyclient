import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { IRecipe } from "../../dto/IRecipe";
import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";
import { AppContext } from "../../context/AppContext";
import RecipeModal from "../../components/RecipeModal";
// import UniversalModal from "../../components/UniversalModal";


// {
//   "id": "e077b9e5-ae28-4ef0-0e8e-08d922c22c14",
//   "appUserId": "c1622982-16d0-4325-b31c-08d91b80f682",
//   "description": "test recipe",
//   "instructions": "daa",
//   "servings": 1,
//   "prepTime": {
//       "ticks": 0,
//       "days": 0,
//       "hours": 0,
//       "milliseconds": 0,
//       "minutes": 0,
//       "seconds": 0,
//       "totalDays": 0,
//       "totalHours": 0,
//       "totalMilliseconds": 0,
//       "totalMinutes": 0,
//       "totalSeconds": 0
//   },
//   "restaurantRecipe": true,
//   "image": "http.lol"
// }
//Description	Instructions	Servings	Preparation time	Restaurant dish	Image	

const RowDisplay = (props: { recipe: IRecipe, drillBits: any }) => {

    return (
    <tr>
        <td className="strongtext">
            {props.recipe.description}
        </td>
        <td>
            {props.recipe.instructions.substring(0, 350) + "..."}
        </td>
        <td>
            {props.recipe.servings}
        </td>
        {/* <td> */}
            {/* {props.recipe.prepTime} */}
        {/* </td> */}
        <td>
            {props.recipe.restaurantRecipe ? "yes" : "nope"}
        </td>
        <td>
        <img className="preview-img" src={props.recipe.image} ></img>
        </td>
        <td>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   {/* <Link to={'/recipes/' + props.recipe.id}>Details</Link> */}
        </td>
<RecipeModal recipe={props.recipe} refreshList={props.drillBits}/>
      
    </tr>)
};

const RecipeIndex = () => {
    
  const appState = useContext(AppContext);
  const credentials = appState.jwt;

     const [recipes, setRecipes] = useState([] as IRecipe[]);

    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });

    const loadData = async () => {
        let result = await BaseService.getAll<IRecipe>('/Recipes', credentials!);
        // let entityListItems = await BaseService.getAll<IEntity>('/Entities');

        if (result.ok && result.data) {
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
            setRecipes(result.data);
        } else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: result.statusCode });
        }
    }

    useEffect(() => {
        loadData();
    }, []);
    //Description	Instructions	Servings	Preparation time	Restaurant dish	Image	
    return (
        <>
            <h1>Recipes</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>
                            Description
                        </th>
                        <th>
                            Instructions
                        </th>
                        <th>
                            Servings
                        </th>
                        {/* <th>
                        Preparation time
                        </th> */}
                        <th>
                        Restaurant dish
                        </th>
                        <th>
                        Image
                        </th>
                        <th>

                        </th>
                    </tr>
                </thead>
                <tbody>
                    {recipes.map(recipe =>
                        <RowDisplay recipe={recipe} key={recipe.id} drillBits={loadData}/>)
                    }
                </tbody>
            </table>
            <Loader {...pageStatus} />
        </>
    );
}

export default RecipeIndex;
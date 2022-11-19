
import React, { useEffect, useContext, useState, BaseSyntheticEvent } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { NavLink } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { INutrientInFoodItem } from "../dto/INutrientInFoodItem";
import { useHistory } from "react-router-dom";
import { BaseService } from "../services/base-service";
import { IStandardUnit } from "../dto/IStandardUnit";
import { ICategory } from "../dto/ICategory";
import { INutrient } from "../dto/INutrient";
import { IFoodItem } from "../dto/IFoodItem";
import { IIngredient } from "../dto/IIngredient";
import { IRecipe } from "../dto/IRecipe";

const IngredientModal = (props: { ingredient: IIngredient, refreshList: any, recipes: IRecipe[], foodItems: IFoodItem[]}) => {

const [show, setShow] = useState(false);
const handleClose = () => {setShow(false); setMode("detail"); history.push("/Ingredients");};
const handleShow = () => {setShow(true); console.log(props)}

const [mode, setMode] = useState("detail");
const appState = useContext(AppContext);
const history = useHistory();
// console.log(appState.jwt)
const switchToEditMode = () => {setMode("edit"); console.log(mode)}

const switchToCreateMode = () => {setMode("create"); console.log(mode)}

const handleChange = (value: any) => { console.log(value); setFormData(value)}
const credentials = appState.jwt;

const changeView = (e: BaseSyntheticEvent) => {
  console.log("changing view")
  console.log(e.target.value);
  if(formData !== initialData){
    setFormData(initialData)
  }
  setMode(e.target.value)
  // {console.log('cunt')}; setMode(e.target.value)
}

const saveChanges = async () => {
  if(mode === "edit") {
    console.log('finished editing')
    setInitialData(formData);
    // service  put
    
    let result = await BaseService.put<IIngredient>(formData, '/Ingredients/' + formData.id, credentials! );
    console.log(result);
    props.refreshList();
    handleClose();
    //history.push("/StandardUnits");
  } else if (mode === "create"){
    console.log('resource created')
    console.log(createData)
    createData.appUserId = props.ingredient.appUserId;
    // service  create & maybe return data and repopulate fields. temporarily closing tho
    let result = await BaseService.create<IIngredient>(createData, '/Ingredients/', credentials! );
    setCreateData({ appUserId: "", recipeId: "", recipeDescription: "", foodItemId: "", foodItemTitle: "", quantity: 0 });
    props.refreshList();
    handleClose();
  } else if ( mode === "delete") {
    console.log('resource deleted')
    setInitialData(formData);
    // service  delete
    let result = await BaseService.delete<IIngredient>(formData.id!, '/Ingredients/' + formData.id, credentials! );
    props.refreshList();
    handleClose();
  }
  setMode("detail")
}
const [initialData, setInitialData] = useState({ id: props.ingredient.id, appUserId: props.ingredient.appUserId , recipeId: props.ingredient.recipeId, recipeDescription: props.ingredient.recipeDescription, foodItemId: props.ingredient.foodItemId, foodItemTitle: props.ingredient.foodItemTitle, quantity: props.ingredient.quantity });
const [formData, setFormData] = useState({ id: props.ingredient.id, appUserId: props.ingredient.appUserId , recipeId: props.ingredient.recipeId, recipeDescription: props.ingredient.recipeDescription, foodItemId: props.ingredient.foodItemId, foodItemTitle: props.ingredient.foodItemTitle, quantity: props.ingredient.quantity });
const [createData, setCreateData] = useState({ appUserId: props.ingredient.appUserId, recipeId: props.recipes[0].id!, recipeDescription: props.recipes[0].description!, foodItemId: props.foodItems[0].id!, foodItemTitle: props.foodItems[0].title!, quantity: 0 });

// let nutrientInFoodItemTitle = props.foodItem.title;
// let foodItemId = props.foodItem.id;
// let foodItemStandardUnitId= props.foodItem.standardUnitId;
// let foodItemStandardUnitTitle = props.foodItem.standardUnitTitle;
// let foodItemCategoryId= props.foodItem.categoryId;
// let foodItemCategoryTitle = props.foodItem.categoryTitle;

return (
  <>
    <Button variant="primary" onClick={handleShow}>
      Modify
    </Button>

    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
<Modal.Title>Ingredient</Modal.Title>
      </Modal.Header>
      {/* <Modal.Body>
        I will not close if you click outside me. Don't even try to press
        escape key.
      </Modal.Body> */}
      <Modal.Footer>

        {/* <Button variant="primary">Understood</Button> */}
        <Button variant="primary" value="create" onClick={(e)=>changeView(e)}>
      create
    </Button>
        <Button variant="primary" value="edit" onClick={(e)=>changeView(e)}>
      edit
    </Button>
    <Button variant="primary" value="delete" onClick={(e)=>changeView(e)}>
      delete
    </Button>
    <Button variant="primary" value="detail" onClick={(e)=>changeView(e)}>
      detail
    </Button>
    <Button variant="secondary" value="close" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>

      <div>


                                    {/* detail */}
{/* formdata.fooditemtitle */}

      {mode === "detail" ? 
      <>
<h1>Details</h1>

<div>
    <h4>Ingredient</h4>
    <hr />
    <dl className="row">
        {/* <dd className = "col-sm-10">
            
        </dd> */}
        <dt className = "col-sm-2">
            Food item
        </dt>
        <dd className = "col-sm-10">
            {formData.foodItemTitle}
        </dd>
        <dt className = "col-sm-2">
            Recipe
        </dt>
        <dd className = "col-sm-10">
            {formData.recipeDescription}
        </dd>
        <dt className = "col-sm-2">
            Quantity
        </dt>
        <dd className = "col-sm-10">
            {formData.quantity}
        </dd>
    </dl>
</div>
      </>
:
<></>

                            }


                                    {/* edit */}
      {mode === "edit" ?
    <>
    <h1>edit</h1>
    <h4>Nutrient in Food Item {props.ingredient.id})</h4>
<hr />
<div className="row">
    <div className="col-md-4">

            {/* <div className="form-group">
                <label className="control-label" htmlFor="FoodItem_Title">Title</label>
                <input value={formData.title} className="form-control"  onChange={(e) => setFormData({ ...formData, title: e.target.value })} type="text" />
            </div> */}
{/* SELECTBOX */}
<div className="form-group">
                <label className="control-label" htmlFor="NutrientInFoodItem_FoodItemId">Food item</label>
                <select className="form-control" onChange={(e) => setFormData({ ...formData, foodItemId: e.target.value })} data-val="true" data-val-required="The Food item Id field is required." id="NutrientInFoodItem_FoodItemId" name="NutrientInFoodItem.FoodItemId">
                  {
                  props.foodItems.map(fooditem => 
                    <option value={fooditem.id}>{fooditem.title}</option>
                    )  
                  }
                </select>
            </div>
{/* SELECTBOX END */}

{/* SELECTBOX */}
            <div className="form-group">
                <label className="control-label" htmlFor="NutrientInFoodItem_NutrientId">Recipe</label>
                <select className="form-control" onChange={(e) => setFormData({ ...formData, recipeId: e.target.value })} data-val="true" data-val-required="The Nutrient Id field is required." id="NutrientInFoodItem_NutrientId" name="NutrientInFoodItem.NutrientId">
                  
                  {
                  props.recipes.map(recipe => 
                    <option value={recipe.id}>{recipe.description}</option>
                    )  
                  }
                </select>
            </div>
{/* SELECTBOX END */}



{/* NUMBERBOX */}
            <div className="form-group">
                <label className="control-label" htmlFor="NutrientInFoodItem_Quantity">Quantity</label>
                <input className="form-control" type="text" data-val="true" data-val-number="The field Quantity must be a number." data-val-required="The Quantity field is required." id="NutrientInFoodItem_Quantity" name="NutrientInFoodItem.Quantity" value={formData.quantity} onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })} />
                <span className="text-danger field-validation-valid" data-valmsg-for="NutrientInFoodItem.Quantity" data-valmsg-replace="true"></span>
            </div>
{/* NUMBERBOX END */}

           <div className="form-group">
                <input type="submit" value="Save" className="btn btn-primary" onClick={()=>saveChanges()}/>
            </div>
</div>
</div>
    </>
    :
    <></>
}




                                    {/* create */}
{mode === "create" ?
<>
    <h1>create</h1>



    <h4>Nutrient in Food Item</h4>
<hr />
<div className="row">
    <div className="col-md-4">
            {/* <div className="form-group">
                <label className="control-label" htmlFor="FoodItem_Title">Title</label>
                <input value={createData.title} onChange={(e) => {console.log(e.target.value); setCreateData({ ...createData, title: e.target.value })}} className="form-control" type="text" />
            </div> */}
{/* SELECTBOX */}
<div className="form-group">
                <label className="control-label" htmlFor="NutrientInFoodItem_FoodItemId">Food item</label>
                <select className="form-control" onChange={(e) => setCreateData({ ...createData, foodItemId: e.target.value })} data-val="true" data-val-required="The Food item Id field is required." id="NutrientInFoodItem_FoodItemId" name="NutrientInFoodItem.FoodItemId">
                                                
                {
                  props.foodItems.map(fooditem => 
                    <option value={fooditem.id}>{fooditem.title}</option>
                    )  
                  }

                </select>
            </div>
{/* SELECTBOX END */}

{/* SELECTBOX */}
            <div className="form-group">
            <label className="control-label" htmlFor="NutrientInFoodItem_NutrientId">Recipe</label>
                <select className="form-control" onChange={(e) => setCreateData({ ...createData, recipeId: e.target.value })} data-val="true" data-val-required="The Nutrient Id field is required." id="NutrientInFoodItem_NutrientId" name="NutrientInFoodItem.NutrientId">
                                                
                {
                  props.recipes.map(recipe => 
                    <option value={recipe.id}>{recipe.description}</option>
                    )  
                  }

                </select>
            </div>
{/* SELECTBOX END */}



{/* NUMBERBOX */}
<div className="form-group">
                <label className="control-label" htmlFor="NutrientInFoodItem_Quantity">Quantity</label>
                <input className="form-control" type="text" data-val="true" data-val-number="The field Quantity must be a number." data-val-required="The Quantity field is required." id="NutrientInFoodItem_Quantity" name="NutrientInFoodItem.Quantity" value={createData.quantity} onChange={(e) => setCreateData({ ...createData, quantity: parseInt(e.target.value) })} />
                <span className="text-danger field-validation-valid" data-valmsg-for="NutrientInFoodItem.Quantity" data-valmsg-replace="true"></span>
            </div>
{/* NUMBERBOX END */}

  </div>
</div>

    <div className="form-group">
                <input type="submit" value="Create" className="btn btn-primary" onClick={()=>saveChanges()}/>
            </div>
    </>
    :
    <></>
}




                                    {/* delete */}
{mode === "delete" ?
    <>
  <h1>Delete</h1>

<h3>Are you sure you want to delete this??</h3>
<div>
    <h4>Ingredient</h4>
    <hr />
    <dl className="row">
        <dt className = "col-sm-2">
            Food item
        </dt>
        <dd className = "col-sm-10">
            {formData.foodItemTitle}
        </dd>
        <dt className = "col-sm-2">
            Recipe
        </dt>
        <dd className = "col-sm-10">
            {formData.recipeDescription}
        </dd>
        <dt className = "col-sm-2">
            Quantity
        </dt>
        <dd className = "col-sm-10">
            {formData.quantity}
        </dd>
    </dl>
        
</div>
  

    <div className="form-group">
                <input type="submit" value="Delete" className="btn btn-danger" onClick={()=>saveChanges()}/>
            </div></>
    :
    <></>
}

    





    </div>
    </Modal>
  </>
);
}

export default IngredientModal;
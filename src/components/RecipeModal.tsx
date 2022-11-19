
import React, { useEffect, useContext, useState, BaseSyntheticEvent } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { NavLink } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { IRecipe } from "../dto/IRecipe";
import { useHistory } from "react-router-dom";
import { BaseService } from "../services/base-service";

const RecipeModal = (props: { recipe: IRecipe, refreshList: any}) => {

const [show, setShow] = useState(false);
const handleClose = () => {setShow(false); setMode("detail"); history.push("/Recipes");};
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
  console.log("chaging view")
  console.log(e.target.value);
  if(formData !== initialData){
    setFormData(initialData)
  }
  setMode(e.target.value)
  // {console.log('cunt')}; setMode(e.target.value)
}

const registerMeal = async () => {
    // /api/v{version}/Recipes/registermeal/{id}
    let result = await BaseService.registerMeal("https://localhost:5001/api/v.1/Recipes/registermeal/" + formData.id, credentials!)
    console.log('meal registered')
    handleClose();
}

const saveChanges = async () => {
  if(mode === "edit") {
    console.log('finished editing')
    setInitialData(formData);
    // service  put
    
    let result = await BaseService.put<IRecipe>(formData, '/Recipes/' + formData.id, credentials! );
    console.log(result);
    props.refreshList();
    handleClose();
    //history.push("/StandardUnits");
  } else if (mode === "create"){
    console.log('resource created')
    console.log(createData)
    createData.appUserId = appState.userId;
    // service  create & maybe return data and repopulate fields. temporarily closing tho
    let result = await BaseService.create<IRecipe>(createData, '/Recipes/', credentials! );
    setCreateData({ description: "", appUserId: "", instructions: "", servings: 0, restaurantRecipe: true, image: ""  });
    props.refreshList();
    handleClose();
  } else if ( mode === "delete") {
    console.log('resource deleted')
    setInitialData(formData);
    // service  delete
    let result = await BaseService.delete<IRecipe>(formData.id!, '/Recipes/' + formData.id, credentials! );
    props.refreshList();
    handleClose();
  }
  setMode("detail")
}

// id?: string;
// appUserId: string;
// description: string;
// instructions: string;
// servings: number;
// prepTime?: any;
// restaurantRecipe: boolean;
// image: string;
const [initialData, setInitialData] = useState({ prepTime: {}, appUserId: props.recipe.appUserId, id: props.recipe.id, description: props.recipe.description, instructions: props.recipe.instructions, servings: props.recipe.servings, restaurantRecipe: props.recipe.restaurantRecipe, image: props.recipe.image });
const [formData, setFormData] = useState({ prepTime: {}, appUserId: props.recipe.appUserId, id: props.recipe.id, description: props.recipe.description, instructions: props.recipe.instructions, servings: props.recipe.servings, restaurantRecipe: props.recipe.restaurantRecipe, image: props.recipe.image });
// missing appuserid
const [createData, setCreateData] = useState({ description: props.recipe.description, appUserId: "", instructions: props.recipe.instructions, servings: props.recipe.servings, restaurantRecipe: props.recipe.restaurantRecipe, image: props.recipe.image });

// let categoryTitle = props.category.title;

return (
  <>
    <Button variant="primary" onClick={handleShow}>
      {appState.role === "company" ? "Modify" : "Details"}
    </Button>

    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
<Modal.Title>{formData.description}</Modal.Title>
      </Modal.Header>
      {/* <Modal.Body>
        I will not close if you click outside me. Don't even try to press
        escape key.
      </Modal.Body> */}
      <Modal.Footer>
      {appState.role === "company"?
        <>
            <>
            <Button variant="primary" value="create" onClick={(e)=>changeView(e)}>
                create
            </Button>
            {appState.userId === formData.appUserId ?
                <>
                <Button variant="primary" value="edit" onClick={(e)=>changeView(e)}>
                edit
                </Button>
                <Button variant="primary" value="delete" onClick={(e)=>changeView(e)}>
                delete
                </Button>
                </>
             :
             <></>
             }
                <Button variant="primary" value="detail" onClick={(e)=>changeView(e)}>
                detail
                </Button>
            </>
        </>
      :
        <Button variant="primary" value="detail" onClick={()=>registerMeal()}>
        register
        </Button>
      }
        <Button variant="secondary" value="close" onClick={handleClose}>
            Close
        </Button>
      </Modal.Footer>

      <div>


                                    {/* detail */}


      {mode === "detail" ? 
      <>
<h1></h1>

<div>
    <h4>Details</h4>
    <hr />
    <dl className="row">
        {/* <dd className = "col-sm-10">
            
        </dd> */}
        <dt className = "col-sm-2">
            Description
        </dt>
        <dd className = "col-sm-10">
            {formData.description}
        </dd>
        <dt className = "col-sm-2">
            Instructions
        </dt>
        <dd className = "col-sm-10">
        {formData.instructions}
        </dd>
        <dt className = "col-sm-2">
            Servings
        </dt>
        <dd className = "col-sm-10">
        {formData.servings}
        </dd>
        {/* <dt class = "col-sm-2">
            Preparation time
        </dt>
        <dd class = "col-sm-10">
            00:30:00
        </dd> */}
        <dt className = "col-sm-2">
            Restaurant dish
        </dt>
        <dd className = "col-sm-10">
        {formData.restaurantRecipe ? "yes" : "no"}
        </dd>
        <dt className = "col-sm-2">
            Image
        </dt>
        <dd className = "col-sm-10">
            <img src={formData.image} ></img>
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
<h4>Edit</h4>
<hr />
<div className="row">
    <div className="col-md-6">
        {/* <form action="/Recipes/Edit/0abfe651-dede-4d14-1b36-08d91c72ec16" method="post"> */}
            
            <div className="form-group">
                <label className="control-label" htmlFor="Recipe_Description">Description</label>
                <input className="form-control" type="text" onChange={(e) => setFormData({ ...formData, description: e.target.value })}  data-val="true" data-val-maxlength="The field Description must be a string or array type with a maximum length of &#x27;256&#x27;." data-val-maxlength-max="256" data-val-required="The Description field is required." id="Recipe_Description"  name="Recipe.Description" value={formData.description} />
                <span className="text-danger field-validation-valid" data-valmsg-for="Recipe.Description" data-valmsg-replace="true"></span>
            </div>
            <div className="form-group">
                <label className="control-label" htmlFor="Recipe_Instructions">Instructions</label>
                <textarea rows={13} className="form-control"  onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}   value={formData.instructions} />
                <span className="text-danger field-validation-valid" data-valmsg-for="Recipe.Instructions" data-valmsg-replace="true"></span>
            </div>
            <div className="form-group">
                <label className="control-label" htmlFor="Recipe_Servings">Servings</label>
                <input className="form-control" type="number" onChange={(e) => setFormData({ ...formData, servings: parseInt(e.target.value) })}  data-val="true" data-val-required="The Servings field is required." id="Recipe_Servings" name="Recipe.Servings" value={formData.servings} />
                <span className="text-danger field-validation-valid" data-valmsg-for="Recipe.Servings" data-valmsg-replace="true"></span>
            </div>
            {/* <div class="form-group">
                <label class="control-label" for="Recipe_PrepTime">Preparation time</label>
                <input class="form-control" type="text" data-val="true" data-val-required="The Preparation time field is required." id="Recipe_PrepTime" name="Recipe.PrepTime" value="00:30:00" />
                <span class="text-danger field-validation-valid" data-valmsg-for="Recipe.PrepTime" data-valmsg-replace="true"></span>
            </div> */}
            <div className="form-group form-check">
                <label className="form-check-label">
                    <input className="form-check-input" type="checkbox" onChange={(e) => setFormData({ ...formData, restaurantRecipe: e.target.checked })}  data-val="true" data-val-required="The Restaurant dish field is required." id="Recipe_RestaurantRecipe" name="Recipe.RestaurantRecipe"  /> Restaurant dish
                </label>
            </div>
            <div className="form-group">
                <label className="control-label" htmlFor="Recipe_Image">Image</label>
                <input className="form-control" type="text" onChange={(e) => setFormData({ ...formData, image: e.target.value })}  data-val="true" data-val-required="The Image field is required." id="Recipe_Image" name="Recipe.Image" value={formData.image} />
                <span className="text-danger field-validation-valid" data-valmsg-for="Recipe.Image" data-valmsg-replace="true"></span>
            </div>
            {/* <input type="hidden" data-val="true" data-val-required="The Id field is required." id="Recipe_Id" name="Recipe.Id" value={formData.image} /> */}
            <div className="form-group">
                <input type="submit" value="Save" className="btn btn-primary" onClick={()=>saveChanges()}/>
            </div>
        {/* <input name="__RequestVerificationToken" type="hidden" value="CfDJ8GlC6yR6uQVDtRsGkfh43m53clio8XsgN_tQPlOmFUYmkK1DUtw7CXBEbi0pDxcEI6iHvUskY_yL7z5elQCwspIz8eWFmVh7-yruHCy-KgWnBNLhyRfB7I2jofV5aRDiaNfyMGAAE9-_dtuod__n01xbUDDHb67sSQ6-8hNdQ99NfjbQsQ8a70A7BRh8Kj-6hQ" /><input name="Recipe.RestaurantRecipe" type="hidden" value="false" /> */}
    </div>
</div>



    {/* <h1>edit</h1>
    <h4>Category {props.category.id})</h4>
<hr />
<div className="row">
    <div className="col-md-4">

            <div className="form-group">
                <label className="control-label" htmlFor="Category_Title">Title</label>
                <input value={formData.title} className="form-control"  onChange={(e) => setFormData({ ...formData, title: e.target.value })} type="text" />
            </div>

           <div className="form-group">
                <input type="submit" value="Save" className="btn btn-primary" onClick={()=>saveChanges()}/>
            </div>
</div>
</div> */}
    </>
    :
    <></>
}




                                    {/* create */}
{mode === "create" ?
<>
<h4>Create</h4>
<hr />
<div className="row">
    <div className="col-md-6">
        {/* <form action="/Recipes/Edit/0abfe651-dede-4d14-1b36-08d91c72ec16" method="post"> */}
            
            <div className="form-group">
                <label className="control-label" htmlFor="Recipe_Description">Description</label>
                <input className="form-control" type="text" onChange={(e) => setCreateData({ ...createData, description: e.target.value })} data-val="true" data-val-maxlength="The field Description must be a string or array type with a maximum length of &#x27;256&#x27;." data-val-maxlength-max="256" data-val-required="The Description field is required." id="Recipe_Description"  name="Recipe.Description" value={createData.description} />
                <span className="text-danger field-validation-valid" data-valmsg-for="Recipe.Description" data-valmsg-replace="true"></span>
            </div>
            <div className="form-group">
                <label className="control-label" htmlFor="Recipe_Instructions">Instructions</label>
                <textarea rows={13} className="form-control"  onChange={(e) => setCreateData({ ...createData, instructions: e.target.value })}  value={createData.instructions} />
                <span className="text-danger field-validation-valid" data-valmsg-for="Recipe.Instructions" data-valmsg-replace="true"></span>
            </div>
            <div className="form-group">
                <label className="control-label" htmlFor="Recipe_Servings">Servings</label>
                <input className="form-control" type="number" onChange={(e) => setCreateData({ ...createData, servings: parseInt(e.target.value) })} data-val="true" data-val-required="The Servings field is required." id="Recipe_Servings" name="Recipe.Servings" value={createData.servings} />
                <span className="text-danger field-validation-valid" data-valmsg-for="Recipe.Servings" data-valmsg-replace="true"></span>
            </div>
            {/* <div class="form-group">
                <label class="control-label" for="Recipe_PrepTime">Preparation time</label>
                <input class="form-control" type="text" data-val="true" data-val-required="The Preparation time field is required." id="Recipe_PrepTime" name="Recipe.PrepTime" value="00:30:00" />
                <span class="text-danger field-validation-valid" data-valmsg-for="Recipe.PrepTime" data-valmsg-replace="true"></span>
            </div> */}
            <div className="form-group form-check">
                <label className="form-check-label">
                    <input className="form-check-input" type="checkbox"  onChange={(e) => setCreateData({ ...createData, restaurantRecipe: e.target.checked })} data-val="true" data-val-required="The Restaurant dish field is required." id="Recipe_RestaurantRecipe" name="Recipe.RestaurantRecipe"  /> Restaurant dish
                </label>
            </div>
            <div className="form-group">
                <label className="control-label" htmlFor="Recipe_Image">Image</label>
                <input className="form-control" type="text" onChange={(e) => setCreateData({ ...createData, image: e.target.value })} data-val="true" data-val-required="The Image field is required." id="Recipe_Image" name="Recipe.Image" value={createData.image} />
                <span className="text-danger field-validation-valid" data-valmsg-for="Recipe.Image" data-valmsg-replace="true"></span>
            </div>
            {/* <input type="hidden" data-val="true" data-val-required="The Id field is required." id="Recipe_Id" name="Recipe.Id" value={formData.image} /> */}
            <div className="form-group">
                <input type="submit" value="Save" className="btn btn-primary" onClick={()=>saveChanges()}/>
            </div>
        {/* <input name="__RequestVerificationToken" type="hidden" value="CfDJ8GlC6yR6uQVDtRsGkfh43m53clio8XsgN_tQPlOmFUYmkK1DUtw7CXBEbi0pDxcEI6iHvUskY_yL7z5elQCwspIz8eWFmVh7-yruHCy-KgWnBNLhyRfB7I2jofV5aRDiaNfyMGAAE9-_dtuod__n01xbUDDHb67sSQ6-8hNdQ99NfjbQsQ8a70A7BRh8Kj-6hQ" /><input name="Recipe.RestaurantRecipe" type="hidden" value="false" /> */}
    </div>
</div>

    {/* <h1>create</h1>



    <h4>Category</h4>
<hr />
<div className="row">
    <div className="col-md-4">
            <div className="form-group">
                <label className="control-label" htmlFor="Category_Title">Title</label>
                <input value={createData.title} onChange={(e) => setCreateData({ ...createData, title: e.target.value })} className="form-control" type="text" />
            </div>

  </div>
</div>

    <div className="form-group">
                <input type="submit" value="Create" className="btn btn-primary" onClick={()=>saveChanges()}/>
            </div> */}
    </>
    :
    <></>
}




                                    {/* delete */}
{mode === "delete" ?
    <>
    {/* <h1>Delete</h1> */}

<h4>Are you sure you want to delete this??</h4>
<div>
    {/* <h4>Delete</h4> */}
    <hr />
    <dl className="row">
        <dt className = "col-sm-2">
            Description
        </dt>
        <dd className = "col-sm-10">
            {formData.description}
        </dd>
        <dt className = "col-sm-2">
            Instructions
        </dt>
        <dd className = "col-sm-10">
        {formData.instructions}
        </dd>
        <dt className = "col-sm-2">
            Servings
        </dt>
        <dd className = "col-sm-10">
        {formData.servings}
        </dd>
        {/* <dt class = "col-sm-2">
            Preparation time
        </dt>
        <dd class = "col-sm-10">
            00:00:00
        </dd> */}
        <dt className = "col-sm-2">
            Restaurant dish
        </dt>
        <dd className = "col-sm-10">
        {formData.restaurantRecipe ? "yes" : "no"}
        </dd>
        <dt className = "col-sm-2">
            Image
        </dt>
        <dd className = "col-sm-10">
        {formData.image}
        </dd>
    </dl>
    
    <div className="form-group">
                <input type="submit" value="Delete" className="btn btn-danger" onClick={()=>saveChanges()}/>
            </div>
</div>

    {/* <h1>delete</h1>

    <div>

<h3>Are you sure you want to delete this?</h3>
<div>
    <h4>Category</h4>
    <hr />
    <dl className="row">
        <dt className = "col-sm-2">
            Title
        </dt>
        <dd className = "col-sm-10">
        {formData.title}
        </dd>

    </dl>
        
</div>
  </div>

    <div className="form-group">
                <input type="submit" value="Delete" className="btn btn-danger" onClick={()=>saveChanges()}/>
            </div> */}
    </>
    :
    <></>
}

    





    </div>
    </Modal>
  </>
);
}

export default RecipeModal;
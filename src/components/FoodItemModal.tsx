
import React, { useEffect, useContext, useState, BaseSyntheticEvent } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { NavLink } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { IFoodItem } from "../dto/IFoodItem";
import { useHistory } from "react-router-dom";
import { BaseService } from "../services/base-service";
import { IStandardUnit } from "../dto/IStandardUnit";
import { ICategory } from "../dto/ICategory";

const FoodItemModal = (props: { foodItem: IFoodItem, refreshList: any, standardUnits: IStandardUnit[], categories: ICategory[]}) => {

const [show, setShow] = useState(false);
const handleClose = () => {setShow(false); setMode("detail"); history.push("/FoodItems");};
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

const saveChanges = async () => {
  if(mode === "edit") {
    console.log('finished editing')
    setInitialData(formData);
    // service  put
    
    let result = await BaseService.put<IFoodItem>(formData, '/FoodItems/' + formData.id, credentials! );
    console.log(result);
    props.refreshList();
    handleClose();
    //history.push("/StandardUnits");
  } else if (mode === "create"){
    console.log('resource created')
    console.log(createData)
    // service  create & maybe return data and repopulate fields. temporarily closing tho
    let result = await BaseService.create<IFoodItem>(createData, '/FoodItems/', credentials! );
    setCreateData({ title: "", standardUnitId: "", standardUnitTitle: "", categoryId: "", categoryTitle: "" });
    props.refreshList();
    handleClose();
  } else if ( mode === "delete") {
    console.log('resource deleted')
    setInitialData(formData);
    // service  delete
    let result = await BaseService.delete<IFoodItem>(formData.id!, '/FoodItems/' + formData.id, credentials! );
    props.refreshList();
    handleClose();
  }
  setMode("detail")
}
const [initialData, setInitialData] = useState({ id: props.foodItem.id, title: props.foodItem.title, standardUnitId: props.foodItem.standardUnitId, standardUnitTitle: props.foodItem.standardUnitTitle, categoryId: props.foodItem.categoryId, categoryTitle: props.foodItem.categoryTitle });
const [formData, setFormData] = useState({ id: props.foodItem.id, title: props.foodItem.title, standardUnitId: props.foodItem.standardUnitId, standardUnitTitle: props.foodItem.standardUnitTitle, categoryId: props.foodItem.categoryId, categoryTitle: props.foodItem.categoryTitle });
const [createData, setCreateData] = useState({ title: "", standardUnitId: props.standardUnits[0].id!, standardUnitTitle: props.standardUnits[0].title!, categoryId: props.categories[0].id!, categoryTitle: props.categories[0].title! });

let foodItemTitle = props.foodItem.title;
let foodItemId = props.foodItem.id;
let foodItemStandardUnitId= props.foodItem.standardUnitId;
let foodItemStandardUnitTitle = props.foodItem.standardUnitTitle;
let foodItemCategoryId= props.foodItem.categoryId;
let foodItemCategoryTitle = props.foodItem.categoryTitle;

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
<Modal.Title>Food Item</Modal.Title>
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


      {mode === "detail" ? 
      <>
      <h1>detail</h1>
      <div>
    <h4>Food Item</h4>
    <hr />
    <dl className="row">
      <dt className = "col-sm-2">
        Id
      </dt>
      <dd className = "col-sm-10">
        {formData.id}
      </dd>
        <dt className = "col-sm-2">
          Title
        </dt>
        <dd className = "col-sm-10">
            {formData.title}
        </dd>
        <dt className = "col-sm-2">
          Standard Unit
        </dt>
        <dd className = "col-sm-10">
            {formData.standardUnitTitle}
        </dd>
        <dt className = "col-sm-2">
          Category
        </dt>
        <dd className = "col-sm-10">
            {formData.categoryTitle}
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
    <h4>Food Item {props.foodItem.id})</h4>
<hr />
<div className="row">
    <div className="col-md-4">

            <div className="form-group">
                <label className="control-label" htmlFor="FoodItem_Title">Title</label>
                <input value={formData.title} className="form-control"  onChange={(e) => setFormData({ ...formData, title: e.target.value })} type="text" />
            </div>
{/* SELECTBOX */}
            <div className="form-group">
                <label className="control-label" htmlFor="FoodItem_StandardUnitId">StandardUnitId</label>
                <select className="form-control" onChange={(e) => setFormData({ ...formData, standardUnitId: e.target.value })} data-val="true" data-val-required="The StandardUnitId field is required." id="FoodItem_StandardUnitId" name="FoodItem.StandardUnitId">
                  
                  {
                  props.standardUnits.map(unit => 
                    <option value={unit.id}>{unit.title}</option>
                    )  
                  }
                </select>
            </div>
{/* SELECTBOX END */}

{/* SELECTBOX */}
<div className="form-group">
                <label className="control-label" htmlFor="FoodItem_CategoryId">CategoryId</label>
                <select className="form-control" onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })} data-val="true" data-val-required="The CategoryId field is required." id="FoodItem_CategoryId" name="FoodItem.CategoryId">
                  {
                  props.categories.map(category => 
                    <option value={category.id}>{category.title}</option>
                    )  
                  }
                </select>
            </div>
{/* SELECTBOX END */}

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



    <h4>FoodItem</h4>
<hr />
<div className="row">
    <div className="col-md-4">
            <div className="form-group">
                <label className="control-label" htmlFor="FoodItem_Title">Title</label>
                <input value={createData.title} onChange={(e) => {console.log(e.target.value); setCreateData({ ...createData, title: e.target.value })}} className="form-control" type="text" />
            </div>
{/* SELECTBOX */}
            <div className="form-group">
                <label className="control-label" htmlFor="FoodItem_StandardUnitId">StandardUnitId</label>
                <select className="form-control" onChange={(e) => {console.log(e.target.value);setCreateData({ ...createData, standardUnitId: e.target.value })}} data-val="true" data-val-required="The StandardUnitId field is required." id="FoodItem_StandardUnitId" name="FoodItem.StandardUnitId">
                  
                  {
                  props.standardUnits.map(unit => 
                    <option value={unit.id}>{unit.title}</option>
                    )  
                  }

                </select>
            </div>
{/* SELECTBOX END */}

{/* SELECTBOX */}
<div className="form-group">
                <label className="control-label" htmlFor="FoodItem_CategoryId">CategoryId</label>
                <select className="form-control" onChange={(e) => {console.log(e.target.value); setCreateData({ ...createData, categoryId: e.target.value })}} data-val="true" data-val-required="The CategoryId field is required." id="FoodItem_CategoryId" name="FoodItem.CategoryId">
                  
                  {
                  props.categories.map(category => 
                    <option value={category.id}>{category.title}</option>
                    )  
                  }

                </select>
            </div>
{/* SELECTBOX END */}

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
    <h1>delete</h1>

    <div>

    <h3>Are you sure you want to delete this?</h3>
<div>
    <h4>Food item</h4>
    <hr />
    <dl className="row">
        <dt className = "col-sm-2">
            Title
        </dt>
        <dd className = "col-sm-10">
            {formData.title}
        </dd>
        <dt className = "col-sm-2">
            Standard Unit
        </dt>
        <dd className = "col-sm-10">
            {formData.standardUnitTitle}
        </dd>
        <dt className = "col-sm-2">
            Category
        </dt>
        <dd className = "col-sm-10">
            {formData.categoryTitle}
        </dd>
    </dl>
        
</div>
  </div>

    <div className="form-group">
                <input type="submit" value="Delete" className="btn btn-danger" onClick={()=>saveChanges()}/>
            </div>
    </>
    :
    <></>
}

    





    </div>
    </Modal>
  </>
);
}

export default FoodItemModal;
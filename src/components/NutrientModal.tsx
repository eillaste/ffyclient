
import React, { useEffect, useContext, useState, BaseSyntheticEvent } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { NavLink } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { INutrient } from "../dto/INutrient";
import { useHistory } from "react-router-dom";
import { BaseService } from "../services/base-service";
import { IStandardUnit } from "../dto/IStandardUnit";

const NutrientModal = (props: { nutrient: INutrient, refreshList: any, standardUnits: IStandardUnit[]}) => {

const [show, setShow] = useState(false);
const handleClose = () => {setShow(false); setMode("detail"); history.push("/Nutrients");};
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
    
    let result = await BaseService.put<INutrient>(formData, '/Nutrients/' + formData.id, credentials! );
    console.log(result);
    props.refreshList();
    handleClose();
    //history.push("/StandardUnits");
  } else if (mode === "create"){
    console.log('resource created')
    console.log(createData)
    // service  create & maybe return data and repopulate fields. temporarily closing tho
    let result = await BaseService.create<INutrient>(createData, '/Nutrients/', credentials! );
    setCreateData({ title: "", standardUnitId: "", standardUnitTitle: "" });
    props.refreshList();
    handleClose();
  } else if ( mode === "delete") {
    console.log('resource deleted')
    setInitialData(formData);
    // service  delete
    let result = await BaseService.delete<INutrient>(formData.id!, '/Nutrients/' + formData.id, credentials! );
    props.refreshList();
    handleClose();
  }
  setMode("detail")
}
const [initialData, setInitialData] = useState({ id: props.nutrient.id, title: props.nutrient.title, standardUnitId: props.nutrient.standardUnitId, standardUnitTitle: props.nutrient.standardUnitTitle });
const [formData, setFormData] = useState({ id: props.nutrient.id, title: props.nutrient.title, standardUnitId: props.nutrient.standardUnitId, standardUnitTitle: props.nutrient.standardUnitTitle });
const [createData, setCreateData] = useState({ title: "", standardUnitId: "", standardUnitTitle: "" });

let nutrientTitle = props.nutrient.title;
let nutrientId = props.nutrient.id;
let nutrientStandardUnitId= props.nutrient.standardUnitId;
let nutrientStandardUnitTitle = props.nutrient.standardUnitTitle;

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
<Modal.Title>Nutrient</Modal.Title>
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
    <h4>Nutrient</h4>
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
    <h4>Nutrient {props.nutrient.id})</h4>
<hr />
<div className="row">
    <div className="col-md-4">

            <div className="form-group">
                <label className="control-label" htmlFor="Nutrient_Title">Title</label>
                <input value={formData.title} className="form-control"  onChange={(e) => setFormData({ ...formData, title: e.target.value })} type="text" />
            </div>
{/* SELECTBOX */}
            <div className="form-group">
                <label className="control-label" htmlFor="Nutrient_StandardUnitId">StandardUnitId</label>
                <select className="form-control" onChange={(e) => setFormData({ ...formData, standardUnitId: e.target.value })} data-val="true" data-val-required="The StandardUnitId field is required." id="Nutrient_StandardUnitId" name="Nutrient.StandardUnitId"><option value="72bc02bb-9505-4a15-8c81-08d9146f170d">milligram</option>
                  
                  {
                  props.standardUnits.map(unit => 
                    <option value={unit.id}>{unit.title}</option>
                    )  
                  }
{/* SELECTBOX END */}
                </select>
            </div>

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



    <h4>Nutrient</h4>
<hr />
<div className="row">
    <div className="col-md-4">
            <div className="form-group">
                <label className="control-label" htmlFor="Nutrient_Title">Title</label>
                <input value={createData.title} onChange={(e) => setCreateData({ ...createData, title: e.target.value })} className="form-control" type="text" />
            </div>
{/* SELECTBOX */}
            <div className="form-group">
                <label className="control-label" htmlFor="Nutrient_StandardUnitId">StandardUnitId</label>
                <select className="form-control" onChange={(e) => setCreateData({ ...createData, standardUnitId: e.target.value })} data-val="true" data-val-required="The StandardUnitId field is required." id="Nutrient_StandardUnitId" name="Nutrient.StandardUnitId"><option value="72bc02bb-9505-4a15-8c81-08d9146f170d">milligram</option>
                  
                  {
                  props.standardUnits.map(unit => 
                    <option value={unit.id}>{unit.title}</option>
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
    <h4>Nutrient</h4>
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

export default NutrientModal;
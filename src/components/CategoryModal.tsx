
import React, { useEffect, useContext, useState, BaseSyntheticEvent } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { NavLink } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { ICategory } from "../dto/ICategory";
import { useHistory } from "react-router-dom";
import { BaseService } from "../services/base-service";

const CategoryModal = (props: { category: ICategory, refreshList: any}) => {

const [show, setShow] = useState(false);
const handleClose = () => {setShow(false); setMode("detail"); history.push("/Categories");};
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
    
    let result = await BaseService.put<ICategory>(formData, '/Categories/' + formData.id, credentials! );
    console.log(result);
    props.refreshList();
    handleClose();
    //history.push("/StandardUnits");
  } else if (mode === "create"){
    console.log('resource created')
    console.log(createData)
    // service  create & maybe return data and repopulate fields. temporarily closing tho
    let result = await BaseService.create<ICategory>(createData, '/Categories/', credentials! );
    setCreateData({ title: "" });
    props.refreshList();
    handleClose();
  } else if ( mode === "delete") {
    console.log('resource deleted')
    setInitialData(formData);
    // service  delete
    let result = await BaseService.delete<ICategory>(formData.id!, '/Categories/' + formData.id, credentials! );
    props.refreshList();
    handleClose();
  }
  setMode("detail")
}
const [initialData, setInitialData] = useState({ id: props.category.id, title: props.category.title });
const [formData, setFormData] = useState({ id: props.category.id, title: props.category.title });
const [createData, setCreateData] = useState({ title: "" });

let categoryTitle = props.category.title;

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
<Modal.Title>Category</Modal.Title>
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
    <h4>Category</h4>
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
</div>
    </>
    :
    <></>
}




                                    {/* create */}
{mode === "create" ?
<>
    <h1>create</h1>



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

export default CategoryModal;
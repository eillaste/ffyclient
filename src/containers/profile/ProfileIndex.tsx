import { useState, useEffect, useContext } from "react";
import { BaseService } from "../../services/base-service";
import { AppContext } from "../../context/AppContext";
import { IAppUser } from "../../dto/IAppUser";
import { IAppUserPut } from "../../dto/IAppUserPut";
import { useHistory } from "react-router-dom";

const ProfileIndex = () => {
  const appState = useContext(AppContext);
  const appUserId = appState.userId;
  const credentials = appState.jwt;
  const [gender, setGender] = useState(0)
  const [date, setDate] = useState("")

  const history = useHistory();
  const handleRedirect = () => {    history.push("/");};
  // const [appUser, setappUser] = useState(initialState)

  const getAppUser = async () => {


    let appUser: IAppUser = await (await BaseService.get<IAppUser>('/appuser/' + appUserId, credentials!)).data!;
    console.log(appUser)
    setGender(appUser.gender)
    setDate(appUser.born)
  }

  // {
  //   "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  //   "born": "2021-05-30T18:59:24.711Z",
  //   "gender": 0
  // }
useEffect(() => {
  console.log("mounted")
  getAppUser();
  return () => {
  }
}, [])

  const SaveClicked = async (e: Event) => {

    console.log(gender, date)
    const formData:IAppUserPut = {"id": appUserId, "born": date, "gender": gender} 
    let result = await BaseService.put<IAppUserPut>(formData, '/appuser/' + appUserId, credentials! );
    console.log(result);
    handleRedirect();
  }

  return (
    <>
      <h1>Edit</h1>

<h4>Specify your age and gender</h4>
<hr />
<div className="row">
    <div className="col-md-4">
        {/* <form action="/AppUsers/Edit/6d0eb75a-27ea-44a1-d0a1-08d916cd5901" method="post"> */}
            
            <div className="form-group">
                <label className="control-label" htmlFor="Born">Born</label>
                <input className="form-control" onChange={e => {console.log(e.target.value); setDate(e.target.value)}} type="datetime-local" data-val="true" data-val-required="The Born field is required." id="AppUser_Born" name="AppUser.Born" value={date} />
                <span className="text-danger field-validation-valid" data-valmsg-for="AppUser.Born" data-valmsg-replace="true"></span>
            </div>
            <div className="form-group">
                <label className="control-label" htmlFor="AppUser_Gender">Gender</label>
                <select className="form-control" onChange={e => {console.log(e.target.value); setGender(parseInt(e.target.value))}} id="Gender" name="Gender">
                  {gender === 1 ?
                  <>
                  <option value={1} >Female</option>
                  <option value={0} >Male</option>
                  </>
                   :
                   <>
                   <option value={0} >Male</option>
                   <option value={1} >Female</option>
                   </>
                   }

</select>
                <span className="text-danger field-validation-valid" data-valmsg-for="AppUser.Gender" data-valmsg-replace="true"></span>
            </div>
            <div className="form-group">
                <input type="submit" onClick={(e) => SaveClicked(e.nativeEvent)} value="Save" className="btn btn-primary" />
            </div>
        {/* <input name="__RequestVerificationToken" type="hidden" value="CfDJ8GlC6yR6uQVDtRsGkfh43m5IxlxAD87oBOuV_RCsBHwc8luh0ATnLybbSVvKp0z-sXc6v2f-Qod-xzrz4XpK-G51bpcCSEzJ499jV1L4YT2LAN-03-08bB2AS9TmKBezgS6zyXlYEXyf7MUK55WOCs_Tux7-xOhBI68KBT5FiBrzXQDf57hi27r0BwVDtepLAQ" /></form> */}
    </div>
</div>
      </>
  );
}

export default ProfileIndex;
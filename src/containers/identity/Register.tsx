import { IdentityService } from "../../services/identity-service";
import { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import jwtDecode from "jwt-decode";
import { Redirect } from "react-router-dom";

export interface IRole {
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": string;
}

const Register = () => {
  const appState = useContext(AppContext);

  const [registerData, setRegisterData] = useState({ email: '', password: '', confirmpassword: '', accountType: 'customer' });
  const [alertMessage, setAlertMessage] = useState('');

const registerClicked = async (e: Event) => {
  console.log(registerData)
  if (registerData.email === '' || registerData.password === '' || registerData.password !== registerData.confirmpassword) {
    setAlertMessage('Empty email or pawwsord!');
};        setAlertMessage('');

  let response = await IdentityService.Register(registerData.email,registerData.password,registerData.accountType);
  if (!response.ok) {
    setAlertMessage(response.messages![0]);
    console.log("failed login")
} else {
    setAlertMessage('');
    const decoded: IRole = jwtDecode(response.data!.token);
    console.log("DECODED TOKEN")
    console.log(decoded)
    appState.setAuthInfo(response.data!.token, response.data!.firstname, response.data!.lastname, decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"], decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]);
    console.log(response.data)
    // console.log(appState.jwt)

    // console.log(decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"])
}
}

return (
  <>
  { appState.jwt !== null ? <Redirect to="/" /> : null}
  <h1>Register</h1>

<div className="row">
    <div className="col-md-4">
            <h4>Create a new account</h4>
            <hr />
            <div className="form-group">
                <label htmlFor="Input_Email">Email</label>
                <input className="form-control" value={registerData.email} onChange={e => setRegisterData({ ...registerData, email: e.target.value })} type="email" />
                <span className="text-danger field-validation-valid"  data-valmsg-for="Input.Email" data-valmsg-replace="true"></span>
            </div>
            <div className="form-group">
                <label htmlFor="Input_Password">Password</label>
                <input className="form-control" onChange={e => setRegisterData({ ...registerData, password: e.target.value })} value={registerData.password} type="password" />
                <span className="text-danger field-validation-valid"  data-valmsg-for="Input.Password" data-valmsg-replace="true"></span>
            </div>
            <div className="form-group">
                <label htmlFor="Input_ConfirmPassword">Confirm password</label>
                <input className="form-control" onChange={e => setRegisterData({ ...registerData, confirmpassword: e.target.value })} value={registerData.confirmpassword} type="password" />
                <span className="text-danger field-validation-valid"  data-valmsg-for="Input.ConfirmPassword" data-valmsg-replace="true"></span>
            </div>
                        <div className="form-group">
                            <label className="control-label" htmlFor="Input_AccountType">Account type</label>
                            <select className="form-control" data-val="true" onChange={(e) => setRegisterData({ ...registerData, accountType: e.target.value })}>
                              <option value="admin">Admin</option>
                              <option value="company">Company</option>
                              <option value="customer">Customer</option>
                            </select>
                        </div>
            <button type="submit" onClick={(e) => registerClicked(e.nativeEvent)} className="btn btn-primary" >Register</button>
</div>
    <div className="col-md-6 col-md-offset-2">
        <section>
            <h4>Use another service to register</h4>
            <hr />
                    <div>
                        <p>
                        There are no external authentication services configured. See
                            <a href="https://go.microsoft.com/fwlink/?LinkID=532715">this article</a>
                            for details on setting up this ASP.NET application to support logging in via external services.
                        </p>
                    </div>
        </section>
    </div>
</div>
  </>
)
}

export default Register;
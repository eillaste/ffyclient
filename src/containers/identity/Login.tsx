import React, { useContext, useState } from "react";
import { Redirect } from "react-router";
import Alert, { EAlertClass } from "../../components/Alert";
import { AppContext } from "../../context/AppContext";
import { IdentityService } from "../../services/identity-service";
import jwtDecode from "jwt-decode";
import { ISupportedLanguage } from "../../types/ISupportedLanguage";
import { LangService } from "../../services/lang-service";

export interface IRole {
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": string;
  }

const Login = () => {
    const appState = useContext(AppContext);

    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [alertMessage, setAlertMessage] = useState('');


    const logInClicked = async (e: Event) => {
        e.preventDefault();
        if (loginData.email === '' || loginData.password === '') {
            setAlertMessage('Empty email or pawwsord!');
        };
        setAlertMessage('');
        let response = await IdentityService.Login('account/login', loginData);
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
            <h1>Log in</h1>
            <form onSubmit={(e) => logInClicked(e.nativeEvent)}>
                <div className="row">
                    <div className="col-md-6">
                        <section>
                            <hr />
                            <Alert show={alertMessage !== ''} message={alertMessage} alertClass={EAlertClass.Danger} />
                            <div className="form-group">
                                <label htmlFor="Input_Email">Email</label>
                                <input value={loginData.email} onChange={e => setLoginData({ ...loginData, email: e.target.value })} className="form-control" type="email" id="Input_Email" name="Input.Email" placeholder="user@example.com"  autoComplete="username" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="Input_Password">Password</label>
                                <input value={loginData.password} onChange={e => setLoginData({ ...loginData, password: e.target.value })} className="form-control" type="password" id="Input_Password" name="Input.Password" placeholder="Input your current password..." autoComplete="current-password" />
                            </div>
                            <div className="form-group">
                                <button onClick={(e) => logInClicked(e.nativeEvent)} type="submit" className="btn btn-primary">Log in</button>
                            </div>
                        </section>
                    </div>
                </div>
            </form>
        </>
    );
}

export default Login;
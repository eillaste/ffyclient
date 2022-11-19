import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { Redirect } from "react-router";
import { useHistory } from "react-router-dom";
import { ISupportedLanguage } from '../types/ISupportedLanguage';

const Header = () => {

    const appState = useContext(AppContext);
console.log("HEADER MOUNTED")
const history = useHistory();
const leaving = () => {
    history.push("/");
}

const [s, sets] = useState(appState);




    const changeLanguage = (language: ISupportedLanguage): any => {
    console.log(appState.currentLanguage)
    appState.currentLanguage = language;
    sets({ ...s, currentLanguage: language })
    console.log(appState.currentLanguage)
}


    return (
        <header>
            <nav className="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3 customheader">
                <div className="container">
                    <NavLink className="navbar-brand headertext" to="/">{ s.currentLanguage.name == "en" ? "Foodify" : "t o i d u s t a"}</NavLink>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target=".navbar-collapse" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
                        <ul className="navbar-nav flex-grow-1">
                        {appState.role !== "" && appState.role !=  "unauthorized" 
                        ?
                        <>
                            {appState.role === "admin" ? 
                            <>
                                <li className="nav-item">
                                    <NavLink className="nav-link text-dark" to="/StandardUnits">{ s.currentLanguage.name == "en" ? "Standard Units" : "Standardühikud"}</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link text-dark" to="/Categories">{ s.currentLanguage.name == "en" ? "Categories" : "Kategooriad"}</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link text-dark" to="/AgeGroups">{ s.currentLanguage.name == "en" ? "Age groups" : "Vanusegrupid"}</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link text-dark" to="/Nutrients">{ s.currentLanguage.name == "en" ? "Nutrients" : "Toitained"}</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link text-dark" to="/Fooditems">{ s.currentLanguage.name == "en" ? "Food items" : "Toiduained"}</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link text-dark" to="/NutrientInFoodItem">{ s.currentLanguage.name == "en" ? "Nutrient in food item" : "Toitained toiduaines"}</NavLink>
                                </li>
                            </>
                            // not admin --------------------------------------------------------------------------------------------------
                            :
                            <>
                                  {appState.role === "company" ?
                               <>
                                            <li className="nav-item">
                                                <NavLink className="nav-link text-dark" to="/recipes">{ s.currentLanguage.name == "en" ? "Recipes" : "Retseptid"}</NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink className="nav-link text-dark" to="/ingredients">{ s.currentLanguage.name == "en" ? "Ingredients" : "Koostisosad"}</NavLink>
                                            </li>
                               </>
                              :
                                <>
                                            
                                            <li className="nav-item">
                                                <NavLink className="nav-link text-dark" to="/profile">{ s.currentLanguage.name == "en" ? "Profile" : "Konto"}</NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink className="nav-link text-dark" to="/recipes">{ s.currentLanguage.name == "en" ? "Recipes" : "Retseptid"}</NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink className="nav-link text-dark" to="/stats">{ s.currentLanguage.name == "en" ? "Stats" : "Statistika"}</NavLink>
                                            </li>
                                            {/* <li className="nav-item">
                                                <NavLink className="nav-link text-dark" to="/profile">Profile</NavLink>
                                            </li> */}
                                </>
                            }                 
 
                                
                            </>
                            
                            } 
                        </>
                        // unauthorized---------------------------------------------------------------------------------------------------
                        :
                        
                            <div></div>
                        } 


                            {/* <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle text-dark" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Languages</a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <a className="dropdown-item text-dark" href="/Home/SetLanguage?culture=et&amp;returnUrl=%2F">eesti</a>
                                    <a className="dropdown-item text-dark" href="/Home/SetLanguage?culture=en-GB&amp;returnUrl=%2F">English (United Kingdom)</a>
                                </div>
                            </li> */}

                        </ul>

                        <ul className="navbar-nav">
                            {appState.jwt === null ?
                            <>
                                <li className="nav-item">
                            <NavLink className="nav-link text-dark" to="/identity/login">{ s.currentLanguage.name == "en" ? "Login" : "Logi sisse" }</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link text-dark" to="/identity/register">{ s.currentLanguage.name == "en" ? "Register" : "Registreeri"}</NavLink>
                                </li>
                                
                            </>
                                :
                                <>
                                    <li className="nav-item">
                                        <span className="nav-link text-dark">{ s.currentLanguage.name == "en" ? "Welcome" : "Tervist"}, { appState.role}!</span>
                                    </li>
                                    <li className="nav-item">
                                        <button onClick={() => {appState.setAuthInfo(null, '','','',''); leaving()}} className="btn btn-link nav-link text-dark" >{ s.currentLanguage.name == "en" ? "Log out" : "Välju"}</button>
                                    </li>
                                </>
                            }
                            <>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle text-dark" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                { s.currentLanguage.name == "en" ? "Languages" : "Keele valik"}
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown" >
                                {appState.supportedLanguages.map(lang => <a className="dropdown-item" href="#" onClick={() => {changeLanguage(lang)}}>{lang.nativeName}</a>)}
                                </div>
                            </li>
                            </>
                        </ul>

                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;
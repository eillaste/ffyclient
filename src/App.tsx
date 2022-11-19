import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import ContactTypeCreate from './containers/contact-types/ContactTypeCreate';
import ContactTypeDelete from './containers/contact-types/ContactTypeDelete';
import ContactTypeDetails from './containers/contact-types/ContactTypeDetails';
import ContactTypeEdit from './containers/contact-types/ContactTypeEdit';
import ContactTypeIndex from './containers/contact-types/ContactTypeIndex';
import HomeIndex from './containers/home/HomeIndex';
import Login from './containers/identity/Login';
import { LangService} from './services/lang-service';
import Register from './containers/identity/Register';
import Page404 from './containers/Page404';
import PageForm from './containers/PageForm';
import { AppContextProvider, initialAppState } from './context/AppContext';

import StandardUnitIndex from './containers/standard-units/StandardUnitIndex';
import StandardUnitDetails from './containers/standard-units/StandardUnitDetails';
import CategoryIndex from './containers/categories/CategoryIndex';
import AgeGroupIndex from './containers/age-groups/AgeGroupIndex';
import NutrientIndex from './containers/nutrients/NutrientIndex';
import FoodItemIndex from './containers/food-items/FoodItemIndex';
import NutrientInFoodItemIndex from './containers/nutrient-in-food-item/NutrientInFoodItemIndex';
import RecipeIndex from './containers/recipes/RecipeIndex';
import IngredientIndex from './containers/ingredients/IngredientIndex';
import StatsIndex from './containers/stats/StatsIndex';
import ProfileIndex from './containers/profile/ProfileIndex';
import { ISupportedLanguage } from './types/ISupportedLanguage';

function App() {
    const setAuthInfo = (jwt: string | null, firstName: string, lastName: string, role: string, userId: string): void => {
        // console.log('wtf', jwt)
        // console.log("idk", role)
        // console.log('uid', userId)
        
        setAppState({...appState, jwt, firstName, lastName, role, userId});
    }

    const getLang = async () => {
        LangService.getSupportedLanguages('https://localhost:5001/api/v1/lang/GetSupportedLanguages')
        .then(res => {
            console.log(res);
            if(res.statusCode == 200){
                setAppState({...appState, supportedLanguages: res.data as ISupportedLanguage[]})}
            }
            )
            console.log("DUDE");
    }

    useEffect(() => {
        getLang()
      }, [])

    const [appState, setAppState] = useState({...initialAppState, setAuthInfo });
    //console.log(appState.jwt)
    
    return (
        <>
            <AppContextProvider value={appState} >
                <Header />
                <div className="container">
                    <main role="main" className="pb-3">
                        {appState.role !== "unauthorized" ? // if authenticated
                         <>                       
                        <Switch>
                                {console.log(appState.role)}
                            <Route exact path="/" component={HomeIndex} />
                            <Route path="/form" component={PageForm} />
                            <Route path="/identity/login" component={Login} />
                            <Route path="/identity/register" component={Register} />
                            <Route path="/contacttypes/create" component={ContactTypeCreate} />
                            <Route path="/contacttypes/edit/:id" component={ContactTypeEdit} />
                            <Route path="/contacttypes/delete/:id" component={ContactTypeDelete} />
                            <Route path="/contacttypes/:id" component={ContactTypeDetails} />
                            <Route path="/contacttypes" component={ContactTypeIndex} />
                            <Route exact path="/standardunits" component={StandardUnitIndex} />
                            <Route exact path="/categories" component={CategoryIndex} />
                            <Route exact path="/agegroups" component={AgeGroupIndex} />
                            <Route exact path="/nutrients" component={NutrientIndex} />
                            <Route exact path="/fooditems" component={FoodItemIndex} />
                            <Route exact path="/nutrientinfooditem" component={NutrientInFoodItemIndex} />
                            <Route exact path="/recipes" component={RecipeIndex} />
                            <Route exact path="/ingredients" component={IngredientIndex} />
                            <Route path="/standardunits/:id" component={StandardUnitDetails} />
                            <Route exact path="/stats" component={StatsIndex} />
                            <Route exact path="/profile" component={ProfileIndex} />
                            <Route component={Page404} />
                        </Switch>
                        </>
                        : // if unauthenticated
                        <Switch>
                        {console.log(appState.role)}
                        <Route exact path="/" component={HomeIndex} />
                        <Route path="/form" component={PageForm} />
                        <Route path="/identity/login" component={Login} />
                        <Route path="/identity/register" component={Register} />
                        <Route component={Page404} />
                        </Switch>
                        }

                    </main>
                </div>
                <Footer />
            </AppContextProvider>
        </>
    );
}

export default App;

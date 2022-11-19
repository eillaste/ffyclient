import logo from '../../assets/img/nutrition.png';
import { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import { LangService } from '../../services/lang-service';
import { ISupportedLanguage } from '../../types/ISupportedLanguage';

const HomeIndex = () => {
    const appState = useContext(AppContext);
    
    const getLang = async () => {
        LangService.getSupportedLanguages('https://localhost:5001/api/v1/lang/GetSupportedLanguages')
        .then(res => {
            console.log(res);
            if(res.statusCode == 200){
                appState.supportedLanguages = res.data as ISupportedLanguage[];
            }
            }
            )
    }

    useEffect(() => {
        getLang();
    }, [])

    return (
        <>
        <div></div>
        <img src={appState.currentLanguage.name == "en" ? "https://trialda.com/foodify/nutrition3.png" : "https://trialda.com/foodify/nutrition4.png"} className="nutrition"/>
        </>
    );
}

export default HomeIndex;

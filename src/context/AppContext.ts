import React from 'react';
import { ISupportedLanguage } from '../types/ISupportedLanguage';

export interface IAppState {
	jwt: string | null;
	firstName: string;
	lastName: string;
	role: string;
	userId: string;
	supportedLanguages: ISupportedLanguage[];
	currentLanguage: ISupportedLanguage;
	setAuthInfo: (jwt: string | null, firstName: string, lastName: string, role: string, userId: string) => void;
}

export const initialAppState: IAppState = {
	jwt: null,
	firstName: '',
	lastName: '',
	role: 'unauthorized',
	userId: '',
	supportedLanguages: [],
	currentLanguage: { name: 'en', nativeName: 'english' },
	setAuthInfo: (jwt: string | null, firstName: string, lastName: string, role: string, userId: string): void => {}
};

export const AppContext = React.createContext<IAppState>(initialAppState);
export const AppContextProvider = AppContext.Provider;
export const AppContextConsumer = AppContext.Consumer;

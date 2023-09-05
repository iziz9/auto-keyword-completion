import { ReactNode, createContext, useContext, useState } from 'react';

interface ISearchContext {
	searchValue: string;
	// setSearchValue: React.Dispatch<React.SetStateAction<string>>;
	setSearchValueHandler: (searchValue: string) => void;
}

const searchContext = createContext<ISearchContext | null>(null);

export const useSearchContext = () => useContext(searchContext);

export const SearchValueProvider = ({ children }: { children: ReactNode }) => {
	const [searchValue, setSearchValue] = useState<string>('');

	const setSearchValueHandler = (text: string) => setSearchValue(text);

	return <searchContext.Provider value={{ searchValue, setSearchValueHandler }}>{children}</searchContext.Provider>;
};

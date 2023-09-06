import { ReactNode, createContext, useContext, useState } from 'react';

const searchContext = createContext<ISearchContext | null>(null);

export const useSearchContext = () => useContext(searchContext);

export const SearchValueProvider = ({ children }: { children: ReactNode }) => {
	const [searchValue, setSearchValue] = useState<string>('');

	const setSearchValueHandler = (query: string) => setSearchValue(query);

	return <searchContext.Provider value={{ searchValue, setSearchValueHandler }}>{children}</searchContext.Provider>;
};

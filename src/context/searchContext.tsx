import { ReactNode, createContext, useContext, useState } from 'react';

const searchContext = createContext<ISearchContext | null>(null);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useSearchContext: any = () => useContext(searchContext);

export const SearchValueProvider = ({ children }: { children: ReactNode }) => {
	const [searchValue, setSearchValue] = useState<string>('');

	const setSearchValueHandler = (query: string) => setSearchValue(query);

	return (
		<searchContext.Provider value={{ searchValue, setSearchValueHandler }}>{children}</searchContext.Provider>
	);
};

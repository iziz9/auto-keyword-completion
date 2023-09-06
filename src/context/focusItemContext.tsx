import { ReactNode, createContext, useContext, useState } from 'react';

const focusItemContext = createContext<IFocusItemContext | null>(null);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useFocusItemContext: any = () => useContext(focusItemContext);

export const ChangeFocusItemProvider = ({ children }: { children: ReactNode }) => {
	const [focusIndex, setFocusIndex] = useState<number>(-1);

	return (
		<focusItemContext.Provider value={{ focusIndex, setFocusIndex }}>{children}</focusItemContext.Provider>
	);
};

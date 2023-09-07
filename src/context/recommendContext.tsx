import { ReactNode, createContext, useContext, useState } from 'react';

const recommendContext = createContext<IUseSearchRequest | null>(null);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useRecommendContext: any = () => useContext(recommendContext);

export const RecommendProvider = ({ children }: { children: ReactNode }) => {
	const [recommendList, setRecommendList] = useState<IResponseItem[]>([]);

	return (
		<recommendContext.Provider value={{ recommendList, setRecommendList }}>
			{children}
		</recommendContext.Provider>
	);
};

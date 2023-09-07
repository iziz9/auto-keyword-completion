/// <reference types="vite/client" />

interface IResponseItem {
	sickCd: string;
	sickNm: string;
}

interface ISearchContext {
	searchValue?: string;
	setSearchValueHandler?: (searchValue: string) => void;
}

interface ICachingData {
	searchValue: string;
	recommendList: {
		data: IResponseItem[];
	};
}

interface IUseCache {
	searchValue: string;
	setRecommendList: React.Dispatch<React.SetStateAction<IResponseItem[] | undefined>>;
}

interface IRecommendItem {
	sickNm: string;
	focus: boolean;
}

interface IFocusItemContext {
	focusIndex: number;
	setFocusIndex: React.Dispatch<React.SetStateAction<number>>;
}

interface IUseArrowKeysDown {
	e: React.KeyboardEvent<HTMLInputElement>;
	searchValue: string;
	focusIndex: number;
	setFocusIndex: React.Dispatch<React.SetStateAction<number>>;
	setSearchValueHandler: (searchValue: string) => void;
}

interface IUseSearchRequest {
	recommendList: IResponseItem[];
	setRecommendList: React.Dispatch<React.SetStateAction<IResponseItem[]>>;
}

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

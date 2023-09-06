/// <reference types="vite/client" />

interface IResponseItem {
	sickCd: string;
	sickNm: string;
}
interface ISearchContext {
	searchValue?: string;
	setSearchValueHandler?: (searchValue: string) => void;
}

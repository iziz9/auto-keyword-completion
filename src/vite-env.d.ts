/// <reference types="vite/client" />

type responseType = {
	data: IResponseItem[];
};

interface IResponseItem {
	sickCd: string;
	sickNm: string;
}
